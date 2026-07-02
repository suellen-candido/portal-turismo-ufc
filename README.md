# Horizonte Turismo — Projeto Integrado

## Estrutura

Todos os arquivos de front-end ficam numa pasta só (é o padrão que o próprio
projeto já usava nos links — `href="cadastro.html"`, sem `../`), então
**abra o Live Server na raiz desta pasta**, não em subpastas.

```
horizonte-final/
├── index.html / style.css / script.js        → página inicial + menu mobile
├── categoria.html / categoria.css / categoria.js
├── detalhes.html / detalhes.css / detalhes.js  → NOVA
├── login.html / login.css / login.js
├── cadastro.html / cadastro.css / cadastro.js
├── roteiro.html / roteiro.css / roteiro.js     → NOVA (carrinho)
└── backend/                                    → API Node + Express + MySQL
```

## Como rodar

```bash
cd backend
npm install
cp .env.example .env        # ajuste usuário/senha do seu MySQL
mysql -u root -p < database/schema.sql
npm run dev
```

Depois abra a raiz do projeto com o Live Server do VS Code (não dê duplo
clique nos arquivos — cookies de sessão e CORS não funcionam em `file://`).

## Fluxo completo (endpoint 7)

1. `index.html` → clica em "Cadastro" → `cadastro.html`
2. Cadastro envia pra `POST /api/usuarios/cadastro` → redireciona pra `login.html`
3. Login envia pra `POST /api/usuarios/login` (sessão via cookie) → redireciona pra `roteiro.html`
4. `roteiro.html` busca `GET /api/carrinho` — se não tiver sessão, volta pro login
5. Em qualquer passeio (`detalhes.html?id=X`), o botão "Adicionar ao Roteiro"
   chama `POST /api/carrinho` (também exige sessão)

## Páginas novas criadas

- **`detalhes.html`** — hero com imagem do passeio, roteiro, pontos de
  interesse, recomendações e card de reserva com botão "Adicionar ao
  Roteiro" (`GET /api/produtos/:id`)
- **`roteiro.html`** — lista os itens do carrinho do usuário logado, com
  resumo de valores e opção de sair da conta (`GET /api/carrinho`)

## Correção que fiz de bônus

O `style.css` e o `script.js` (menu mobile) só existiam dentro da pasta
`pagina inicial/` no projeto original — por isso as outras páginas
(`categoria.html`, `login.html`, `cadastro.html`) ficavam sem estilo quando
abertas fora dessa pasta. Consolidei tudo numa pasta só pra resolver isso
de vez.
