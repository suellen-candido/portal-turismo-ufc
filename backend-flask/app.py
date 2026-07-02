from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from datetime import datetime
from config import Config
from models import db, Categoria, Produto, Usuario, CarrinhoItem

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()


# =====================================================
# Categorias — Endpoints 1 e 2 (GET, dinâmico do banco)
# =====================================================
@app.route('/api/categorias', methods=['GET'])
def listar_categorias():
    categorias = Categoria.query.order_by(Categoria.id).all()
    return jsonify([c.to_dict() for c in categorias]), 200


@app.route('/api/categorias/<int:id>', methods=['GET'])
def buscar_categoria(id):
    categoria = Categoria.query.get(id)
    if not categoria:
        return jsonify({"mensagem": "Categoria não encontrada."}), 404
    return jsonify(categoria.to_dict()), 200


# =====================================================
# Produtos — Endpoint 3 (filtra por categoria_id) e 5 (detalhes)
# =====================================================
@app.route('/api/produtos', methods=['GET'])
def listar_produtos():
    categoria_id = request.args.get('categoria_id')
    query = Produto.query
    if categoria_id:
        query = query.filter_by(categoria_id=categoria_id)
    produtos = query.all()
    return jsonify([p.to_dict() for p in produtos]), 200


@app.route('/api/produtos/<int:id>', methods=['GET'])
def buscar_produto(id):
    produto = Produto.query.get(id)
    if not produto:
        return jsonify({"mensagem": "Produto não encontrado."}), 404
    return jsonify(produto.to_dict(incluir_categoria=True)), 200


# =====================================================
# Usuários — Endpoint 6 (cadastro e login)
# =====================================================
@app.route('/api/usuarios/cadastro', methods=['POST'])
def cadastrar_usuario():
    dados = request.json or {}

    obrigatorios = ['nome', 'cpf', 'email', 'login', 'senha']
    for campo in obrigatorios:
        if not dados.get(campo):
            return jsonify({"mensagem": f"O campo {campo} é obrigatório."}), 400

    if dados.get('senha') != dados.get('confirmar_senha'):
        return jsonify({"mensagem": "As senhas não coincidem."}), 400

    existente = Usuario.query.filter(
        (Usuario.email == dados['email']) |
        (Usuario.cpf == dados['cpf']) |
        (Usuario.login == dados['login'])
    ).first()

    if existente:
        return jsonify({"mensagem": "E-mail, CPF ou login já cadastrados."}), 409

    # O formulário manda a data como texto (ex: "2026-08-15"); o banco
    # espera um objeto de data de verdade, então convertemos aqui.
    data_visita_texto = dados.get('data_visita')
    data_visita = None
    if data_visita_texto:
        try:
            data_visita = datetime.strptime(data_visita_texto, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"mensagem": "Data da visita em formato inválido."}), 400

    usuario = Usuario(
        nome=dados['nome'],
        cpf=dados['cpf'],
        telefone=dados.get('telefone'),
        email=dados['email'],
        endereco=dados.get('endereco'),
        cidade=dados.get('cidade'),
        cidade_origem=dados.get('cidade_origem'),
        login=dados['login'],
        data_visita=data_visita,
        preferencias=dados.get('preferencias')
    )
    usuario.set_senha(dados['senha'])

    db.session.add(usuario)
    db.session.commit()

    return jsonify({
        "mensagem": "Cadastro realizado com sucesso.",
        "usuario": usuario.to_dict()
    }), 201


@app.route('/api/usuarios/login', methods=['POST'])
def login():
    dados = request.json or {}
    identificador = dados.get('identificador')
    senha = dados.get('senha')

    if not identificador or not senha:
        return jsonify({"mensagem": "Informe e-mail/login e senha."}), 400

    usuario = Usuario.query.filter(
        (Usuario.email == identificador) | (Usuario.login == identificador)
    ).first()

    if not usuario or not usuario.verificar_senha(senha):
        return jsonify({"mensagem": "Credenciais inválidas."}), 401

    token = create_access_token(identity=str(usuario.id))

    return jsonify({
        "mensagem": "Login realizado com sucesso.",
        "access_token": token,
        "usuario": usuario.to_dict()
    }), 200


@app.route('/api/usuarios/me', methods=['GET'])
@jwt_required()
def usuario_logado():
    usuario = Usuario.query.get(get_jwt_identity())
    if not usuario:
        return jsonify({"mensagem": "Usuário não encontrado."}), 404
    return jsonify(usuario.to_dict()), 200


# =====================================================
# Carrinho — Endpoint 7 (rotas protegidas por JWT)
# =====================================================
@app.route('/api/carrinho', methods=['GET'])
@jwt_required()
def listar_carrinho():
    usuario_id = get_jwt_identity()
    itens = CarrinhoItem.query.filter_by(usuario_id=usuario_id).all()
    return jsonify([i.to_dict() for i in itens]), 200


@app.route('/api/carrinho', methods=['POST'])
@jwt_required()
def adicionar_carrinho():
    usuario_id = get_jwt_identity()
    dados = request.json or {}
    produto_id = dados.get('produto_id')

    if not produto_id:
        return jsonify({"mensagem": "Informe o produto_id."}), 400

    item = CarrinhoItem(
        usuario_id=usuario_id,
        produto_id=produto_id,
        quantidade=dados.get('quantidade', 1)
    )
    db.session.add(item)
    db.session.commit()

    return jsonify({"mensagem": "Passeio adicionado ao roteiro."}), 201


# =====================================================
# Rota de teste
# =====================================================
@app.route('/', methods=['GET'])
def index():
    return jsonify({"mensagem": "API Horizonte Turismo no ar 🌊"}), 200


if __name__ == '__main__':
    app.run(debug=True, port=3000)
