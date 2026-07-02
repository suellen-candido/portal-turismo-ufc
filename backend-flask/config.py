import os
from datetime import timedelta


class Config:
    # Chave interna do Flask (sessão de cookies internos, flash messages etc.)
    SECRET_KEY = os.environ.get('SECRET_KEY', 'troque-essa-chave-secreta')

    # Conexão com o banco. Por padrão usa SQLite (um arquivo local,
    # sem precisar de usuário/senha nem servidor rodando) — igual ao
    # exemplo do professor. Se quiser usar MySQL depois, defina a
    # variável de ambiente DATABASE_URL com sua string de conexão.
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'sqlite:///horizonte_turismo.db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Chave usada para assinar os tokens JWT
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'troque-essa-chave-jwt')

    # Tempo de validade do token de acesso
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)
