# Horizonte Turismo — Backend em Flask (Python)

Refeito seguindo o método da Aula 17 (Flask + Flask-SQLAlchemy +
Flask-JWT-Extended) em vez do Node/Express usado antes.

**Por padrão, o banco é SQLite** — um arquivo local (`horizonte_turismo.db`)
que é criado sozinho na pasta, sem precisar de senha nem de MySQL rodando.
É o mesmo tipo de banco usado no exemplo do professor. Se quiser usar o
MySQL depois, veja a seção "Usando MySQL em vez de SQLite" no fim deste
arquivo.

## Estrutura

```
horizonte-v3/
├── index.html / style.css / script.js
├── categoria.html / categoria.css / categoria.js
├── detalhes.html / detalhes.css / detalhes.js
├── login.html / login.css / login.js
├── cadastro.html / cadastro.css / cadastro.js
├── roteiro.html / roteiro.css / roteiro.js
└── backend-flask/
    ├── app.py            → endpoints da API
    ├── models.py         → tabelas (SQLAlchemy ORM)
    ├── config.py         → chaves e conexão com o banco
    ├── seed_data.py      → popula categorias/passeios de exemplo
    └── requirements.txt
```

## Como rodar

### Windows (PowerShell)

```powershell
cd backend-flask

# 1. Crie e ative o ambiente virtual
python -m venv .venv
.venv\Scripts\Activate.ps1
```

Se aparecer um erro de "a execução de scripts foi desabilitada" ao ativar,
rode isto uma vez nessa janela do PowerShell e tente ativar de novo:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
```

```powershell
# 2. Instale as dependências
pip install -r requirements.txt

# 3. Popule as categorias e passeios de exemplo (só precisa rodar uma vez;
#    isso já cria o arquivo horizonte_turismo.db sozinho)
python seed_data.py

# 4. Suba o servidor
python app.py
```

Você vai saber que ativou o ambiente virtual certo quando o início da
linha do PowerShell mostrar `(.venv)` antes do caminho da pasta.

### Linux / macOS

```bash
cd backend-flask

# 1. Crie e ative o ambiente virtual
python3 -m venv .venv
source .venv/bin/activate

# 2. Instale as dependências
pip install -r requirements.txt

# 3. Popule as categorias e passeios de exemplo (só precisa rodar uma vez)
python3 seed_data.py

# 4. Suba o servidor
python3 app.py
```

### Depois de subir o servidor (os dois sistemas)

O servidor sobe em `http://127.0.0.1:3000` (mudei a porta padrão do Flask
de 5000 para 3000 só para não precisar alterar as URLs no front-end).

Abra a raiz deste projeto com o Live Server do VS Code — igual antes.
Lembre-se: comandos de terminal (bash, PowerShell) e o Live Server são
coisas diferentes — o `backend-flask` roda num terminal, o front-end abre
no navegador via Live Server.

## O que mudou em relação à versão Node/Express

- **Autenticação voltou a ser JWT** (como no exemplo do professor), não
  mais sessão por cookie. O front-end guarda o token no `localStorage`
  (`login.js`) e manda no header `Authorization: Bearer <token>` em toda
  requisição que precisa de login (`detalhes.js`, `roteiro.js`).
- **Logout** agora é só apagar o token do `localStorage` — não existe mais
  uma sessão no servidor pra encerrar.
- Os **nomes dos endpoints continuam os mesmos** (`/api/categorias`,
  `/api/produtos`, `/api/usuarios/cadastro`, `/api/usuarios/login`,
  `/api/carrinho`), então nada mudou na "forma" da API, só na tecnologia
  por trás.

## Usando MySQL em vez de SQLite (opcional)

Se depois você quiser voltar a usar o MySQL, defina a variável de ambiente
`DATABASE_URL` antes de rodar `seed_data.py` ou `app.py`:

```powershell
# PowerShell — troque SUA_SENHA pela senha real do seu MySQL
$env:DATABASE_URL = "mysql+pymysql://root:SUA_SENHA@localhost/horizonte_turismo"
```

```bash
# bash/macOS
export DATABASE_URL="mysql+pymysql://root:SUA_SENHA@localhost/horizonte_turismo"
```

Essa variável só vale para a janela do terminal em que foi definida — se
fechar e abrir de novo, precisa rodar de novo antes de qualquer comando
`python`.

## Bônus: testando no Postman

1. `POST http://127.0.0.1:3000/api/usuarios/login` com
   `{ "identificador": "...", "senha": "..." }` no Body (raw/JSON)
2. Copie o `access_token` da resposta
3. Em `GET http://127.0.0.1:3000/api/carrinho`, vá em **Authorization →
   Type: Bearer Token** e cole o token
