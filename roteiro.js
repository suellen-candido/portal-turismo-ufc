/* =====================================================
   HORIZONTE TURISMO — JavaScript da Página Meu Roteiro
   Disciplina: Programação Web — UFC Itapajé
===================================================== */

document.addEventListener('DOMContentLoaded', function() {

  const API_BASE_URL = 'http://localhost:3000/api';

  const naoLogadoEl = document.getElementById('roteiro-nao-logado');
  const carregandoEl = document.getElementById('roteiro-carregando');
  const vazioEl = document.getElementById('roteiro-vazio');
  const conteudoEl = document.getElementById('roteiro-conteudo');
  const listaEl = document.getElementById('roteiro-lista');
  const qtdItensEl = document.getElementById('roteiro-qtd-itens');
  const totalEl = document.getElementById('roteiro-total');
  const linkSair = document.getElementById('link-sair');
  const linkSairMobile = document.getElementById('link-sair-mobile');

  function esconderTodosEstados() {
    naoLogadoEl.style.display = 'none';
    carregandoEl.style.display = 'none';
    vazioEl.style.display = 'none';
    conteudoEl.style.display = 'none';
  }

  function formatarValor(valor) {
    return 'R$ ' + Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  function renderizarItens(itens) {
    listaEl.innerHTML = itens.map(function(item) {
      return `
        <div class="roteiro-item">
          <img src="${item.imagem}" alt="${item.nome}">
          <div class="roteiro-item-info">
            <p class="roteiro-item-nome">${item.nome}</p>
            <p class="roteiro-item-qtd">Quantidade: ${item.quantidade}</p>
          </div>
          <span class="roteiro-item-valor">${formatarValor(item.valor_estimado * item.quantidade)}</span>
        </div>
      `;
    }).join('');

    const total = itens.reduce(function(soma, item) {
      return soma + (item.valor_estimado * item.quantidade);
    }, 0);

    qtdItensEl.textContent = itens.length;
    totalEl.textContent = formatarValor(total);
  }

  function carregarRoteiro() {
    esconderTodosEstados();
    carregandoEl.style.display = 'block';

    const token = localStorage.getItem('token');

    if (!token) {
      esconderTodosEstados();
      naoLogadoEl.style.display = 'block';
      return;
    }

    fetch(API_BASE_URL + '/carrinho', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(function(response) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          esconderTodosEstados();
          naoLogadoEl.style.display = 'block';
          return null;
        }
        return response.json();
      })
      .then(function(itens) {
        if (itens === null) return;

        esconderTodosEstados();

        if (itens.length === 0) {
          vazioEl.style.display = 'block';
        } else {
          renderizarItens(itens);
          conteudoEl.style.display = 'grid';
        }
      })
      .catch(function(erro) {
        console.error('Erro ao carregar roteiro:', erro);
        esconderTodosEstados();
        naoLogadoEl.style.display = 'block';
      });
  }

  /* ── Logout ─────────────────────────────────────── */
  function sair(event) {
    event.preventDefault();
    /* Com JWT não existe sessão no servidor pra encerrar —
       basta apagar o token guardado no navegador. */
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
  }

  if (linkSair) linkSair.addEventListener('click', sair);
  if (linkSairMobile) linkSairMobile.addEventListener('click', sair);

  carregarRoteiro();

});
