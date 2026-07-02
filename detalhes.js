/* =====================================================
   HORIZONTE TURISMO — JavaScript da Página de Detalhes
   Disciplina: Programação Web — UFC Itapajé
===================================================== */

document.addEventListener('DOMContentLoaded', function() {

  const API_BASE_URL = 'http://localhost:3000/api';

  /* ── Elementos ────────────────────────────────── */
  const loadingEl = document.getElementById('detalhes-loading');
  const erroEl = document.getElementById('detalhes-erro');
  const conteudoEl = document.getElementById('detalhes-conteudo');
  const btnAdicionar = document.getElementById('btn-adicionar-roteiro');
  const avisoLogin = document.getElementById('detalhes-reserva-aviso');

  let produtoAtual = null;
  let usuarioLogado = false;

  function getToken() {
    return localStorage.getItem('token');
  }

  /* ── Utilitários ──────────────────────────────── */
  function getUrlParam(nome) {
    return new URLSearchParams(window.location.search).get(nome);
  }

  function formatarValor(valor) {
    return 'R$ ' + Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  function gerarEstrelas(avaliacao) {
    const cheias = Math.round(avaliacao);
    return '★'.repeat(cheias) + '☆'.repeat(5 - cheias);
  }

  /* ── Preenche a página com os dados do produto ─── */
  function renderizarProduto(produto) {
    document.title = produto.nome + ' — Horizonte Turismo';

    document.getElementById('detalhes-hero-bg').style.backgroundImage = `url(${produto.imagem})`;
    document.getElementById('badge-categoria').textContent = produto.categoria_nome || 'Passeio';
    document.getElementById('detalhes-titulo').textContent = produto.nome;
    document.getElementById('detalhes-local').querySelector('span').textContent = produto.localizacao;
    document.getElementById('breadcrumb-passeio').textContent = produto.nome;

    const linkCategoria = document.getElementById('breadcrumb-categoria-link');
    linkCategoria.textContent = produto.categoria_nome || 'Categoria';
    linkCategoria.href = 'categoria.html?id=' + produto.categoria_id;

    const ratingEl = document.getElementById('detalhes-rating');
    ratingEl.querySelector('.stars').textContent = gerarEstrelas(produto.avaliacao);
    ratingEl.querySelector('.rating-value').textContent = produto.avaliacao;
    ratingEl.querySelector('.rating-count').textContent = `(${produto.num_avaliacoes} avaliações)`;

    document.getElementById('detalhes-descricao-curta').textContent = produto.descricao_curta;
    document.getElementById('detalhes-roteiro').textContent = produto.roteiro;
    document.getElementById('detalhes-recomendacoes').textContent = produto.recomendacoes;

    const listaPontos = document.getElementById('detalhes-pontos');
    listaPontos.innerHTML = '';
    (produto.pontos_interesse || '').split(',').forEach(function(ponto) {
      const li = document.createElement('li');
      li.textContent = ponto.trim();
      listaPontos.appendChild(li);
    });

    document.getElementById('detalhes-valor').textContent = formatarValor(produto.valor_estimado);
    document.getElementById('detalhes-duracao').textContent = produto.duracao;

    loadingEl.style.display = 'none';
    conteudoEl.style.display = 'block';
  }

  function mostrarErro() {
    loadingEl.style.display = 'none';
    erroEl.style.display = 'block';
  }

  /* ── Adicionar ao roteiro (carrinho) ───────────── */
  function atualizarEstadoBotao() {
    if (usuarioLogado) {
      btnAdicionar.disabled = false;
      avisoLogin.style.display = 'none';
    } else {
      btnAdicionar.disabled = true;
      avisoLogin.style.display = 'block';
    }
  }

  btnAdicionar.addEventListener('click', function() {
    if (!produtoAtual) return;

    const token = getToken();
    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    btnAdicionar.disabled = true;
    btnAdicionar.textContent = 'Adicionando...';

    fetch(API_BASE_URL + '/carrinho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ produto_id: produtoAtual.id, quantidade: 1 })
    })
      .then(function(response) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = 'login.html';
          return;
        }
        return response.json();
      })
      .then(function() {
        btnAdicionar.textContent = 'Adicionado ✓';
        setTimeout(function() {
          btnAdicionar.textContent = 'Adicionar ao Roteiro';
          btnAdicionar.disabled = false;
        }, 2000);
      })
      .catch(function(erro) {
        console.error('Erro ao adicionar ao roteiro:', erro);
        btnAdicionar.textContent = 'Adicionar ao Roteiro';
        btnAdicionar.disabled = false;
      });
  });

  /* ── Inicialização ──────────────────────────────── */
  const produtoId = getUrlParam('id');

  if (!produtoId) {
    mostrarErro();
    return;
  }

  // Checa se o usuário está logado (pra liberar o botão de adicionar)
  const tokenAtual = getToken();
  if (tokenAtual) {
    fetch(API_BASE_URL + '/usuarios/me', {
      headers: { 'Authorization': 'Bearer ' + tokenAtual }
    })
      .then(function(response) {
        usuarioLogado = response.ok;
        atualizarEstadoBotao();
      })
      .catch(function() {
        usuarioLogado = false;
        atualizarEstadoBotao();
      });
  } else {
    atualizarEstadoBotao();
  }

  // Busca os dados do passeio
  fetch(API_BASE_URL + '/produtos/' + produtoId)
    .then(function(response) {
      if (!response.ok) throw new Error('Produto não encontrado');
      return response.json();
    })
    .then(function(produto) {
      produtoAtual = produto;
      renderizarProduto(produto);
    })
    .catch(function(erro) {
      console.error('Erro ao carregar produto:', erro);
      mostrarErro();
    });

});
