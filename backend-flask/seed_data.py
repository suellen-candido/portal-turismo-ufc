"""
Script para popular o banco com dados de exemplo.
Rode uma vez com: python3 seed_data.py
"""

from app import app
from models import db, Categoria, Produto

with app.app_context():

    if Categoria.query.count() > 0:
        print("Já existem categorias no banco. Nada foi inserido.")
    else:
        categorias = [
            Categoria(
                nome='Praias',
                descricao='Descubra as praias mais paradisíacas do Ceará, desde Jericoacoara até Canoa Quebrada.',
                imagem='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1440&h=900&fit=crop'
            ),
            Categoria(
                nome='Trilhas',
                descricao='Aventure-se pelas trilhas da Chapada do Araripe e Serra de Baturité.',
                imagem='https://images.unsplash.com/photo-1551632811-561732d1e306?w=1440&h=900&fit=crop'
            ),
            Categoria(
                nome='Museus',
                descricao='Conheça a história e cultura cearense nos museus de Fortaleza e região.',
                imagem='https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1440&h=900&fit=crop'
            ),
            Categoria(
                nome='Gastronomia',
                descricao='Saboreie a autêntica culinária cearense: tapioca, baião de dois e peixada.',
                imagem='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1440&h=900&fit=crop'
            ),
            Categoria(
                nome='Passeios Históricos',
                descricao='Explore o Centro Histórico de Fortaleza, igrejas coloniais e monumentos.',
                imagem='https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1440&h=900&fit=crop'
            ),
        ]
        db.session.add_all(categorias)
        db.session.commit()
        print(f"{len(categorias)} categorias inseridas.")

    if Produto.query.count() > 0:
        print("Já existem produtos no banco. Nada foi inserido.")
    else:
        praias = Categoria.query.filter_by(nome='Praias').first()
        trilhas = Categoria.query.filter_by(nome='Trilhas').first()
        museus = Categoria.query.filter_by(nome='Museus').first()

        produtos = [
            Produto(
                categoria_id=praias.id,
                nome='Jericoacoara',
                localizacao='Jijoca de Jericoacoara — CE',
                duracao='1 dia inteiro',
                roteiro='Saída de Fortaleza com transfer 4x4, visita à Duna do Pôr do Sol, Pedra Furada e Lagoa do Paraíso.',
                pontos_interesse='Duna do Pôr do Sol, Pedra Furada, Lagoa do Paraíso, Árvore da Preguiça',
                recomendacoes='Levar protetor solar, óculos de sol, chapéu e água. Melhor época: maio a novembro.',
                valor_estimado=350.00,
                imagem='https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=400&h=300&fit=crop',
                descricao_curta='A praia mais famosa do Ceará, com dunas, lagoas cristalinas e um pôr do sol inesquecível.',
                avaliacao=4.9,
                num_avaliacoes=1240
            ),
            Produto(
                categoria_id=praias.id,
                nome='Canoa Quebrada',
                localizacao='Aracati — CE',
                duracao='1 dia inteiro',
                roteiro='Passeio pelas falésias coloridas, passeio de jangada e visita às dunas de Canoa Quebrada.',
                pontos_interesse='Falésias, Broadway, Duna do Pôr do Sol, Praia de Canoa Quebrada',
                recomendacoes='Usar roupas leves e confortáveis. Não deixe de experimentar os frutos do mar locais.',
                valor_estimado=280.00,
                imagem='https://images.unsplash.com/photo-1520942702018-0865209d747d?w=400&h=300&fit=crop',
                descricao_curta='Falésias coloridas, dunas douradas e praias de águas mornas no litoral leste do Ceará.',
                avaliacao=4.8,
                num_avaliacoes=980
            ),
            Produto(
                categoria_id=trilhas.id,
                nome='Serra de Baturité',
                localizacao='Baturité — CE',
                duracao='1 dia',
                roteiro='Trilha pela serra, visita às cachoeiras e contemplação da Mata Atlântica.',
                pontos_interesse='Cachoeira do Riachão, Pico Alto, Parque Ecológico',
                recomendacoes='Levar tênis de trilha, água e lanches. Verificar clima antes de sair.',
                valor_estimado=180.00,
                imagem='https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
                descricao_curta='Trilhas pela serra com cachoeiras, clima ameno e rica biodiversidade.',
                avaliacao=4.8,
                num_avaliacoes=540
            ),
            Produto(
                categoria_id=museus.id,
                nome='Museu do Ceará',
                localizacao='Fortaleza — CE',
                duracao='2 horas',
                roteiro='Visita guiada pela história política e cultural do estado.',
                pontos_interesse='Salas temáticas, acervo colonial',
                recomendacoes='Chegue cedo para evitar filas.',
                valor_estimado=60.00,
                imagem='https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400&h=300&fit=crop',
                descricao_curta='História e cultura cearense em um só lugar.',
                avaliacao=4.5,
                num_avaliacoes=310
            ),
        ]
        db.session.add_all(produtos)
        db.session.commit()
        print(f"{len(produtos)} produtos inseridos.")
