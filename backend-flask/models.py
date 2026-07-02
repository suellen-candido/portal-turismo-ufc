from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class Categoria(db.Model):
    __tablename__ = 'categorias'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    imagem = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "imagem": self.imagem
        }


class Produto(db.Model):
    __tablename__ = 'produtos'

    id = db.Column(db.Integer, primary_key=True)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    nome = db.Column(db.String(150), nullable=False)
    localizacao = db.Column(db.String(150))
    duracao = db.Column(db.String(50))
    roteiro = db.Column(db.Text)
    pontos_interesse = db.Column(db.Text)
    recomendacoes = db.Column(db.Text)
    valor_estimado = db.Column(db.Numeric(10, 2), nullable=False)
    imagem = db.Column(db.String(255))
    descricao_curta = db.Column(db.String(255))
    avaliacao = db.Column(db.Numeric(2, 1), default=0)
    num_avaliacoes = db.Column(db.Integer, default=0)

    categoria = db.relationship('Categoria', backref='produtos')

    def to_dict(self, incluir_categoria=False):
        dados = {
            "id": self.id,
            "categoria_id": self.categoria_id,
            "nome": self.nome,
            "localizacao": self.localizacao,
            "duracao": self.duracao,
            "roteiro": self.roteiro,
            "pontos_interesse": self.pontos_interesse,
            "recomendacoes": self.recomendacoes,
            "valor_estimado": float(self.valor_estimado),
            "imagem": self.imagem,
            "descricao_curta": self.descricao_curta,
            "avaliacao": float(self.avaliacao) if self.avaliacao is not None else 0,
            "num_avaliacoes": self.num_avaliacoes
        }
        if incluir_categoria and self.categoria:
            dados["categoria_nome"] = self.categoria.nome
        return dados


class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    cpf = db.Column(db.String(20), nullable=False, unique=True)
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(150), nullable=False, unique=True)
    endereco = db.Column(db.String(255))
    cidade = db.Column(db.String(100))
    cidade_origem = db.Column(db.String(100))
    login = db.Column(db.String(100), nullable=False, unique=True)
    senha_hash = db.Column(db.String(255), nullable=False)
    data_visita = db.Column(db.Date)
    preferencias = db.Column(db.Text)

    def set_senha(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def verificar_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "login": self.login
        }


class CarrinhoItem(db.Model):
    __tablename__ = 'carrinho_itens'

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    quantidade = db.Column(db.Integer, default=1)

    produto = db.relationship('Produto')

    def to_dict(self):
        return {
            "id": self.id,
            "produto_id": self.produto_id,
            "quantidade": self.quantidade,
            "nome": self.produto.nome,
            "valor_estimado": float(self.produto.valor_estimado),
            "imagem": self.produto.imagem
        }
