/* =====================================================
   HORIZONTE TURISMO — JavaScript Principal
   Disciplina: Programação Web — UFC Itapajé

   Funcionalidades:
   - Menu mobile toggle
   - Smooth scroll para âncoras
===================================================== */

document.addEventListener('DOMContentLoaded', function() {

  /* ── Categorias dinâmicas (consumindo a API do backend) ── */
  const API_BASE_URL = 'http://localhost:3000/api';
  const gridCategorias = document.querySelector('.categorias-grid');

  if (gridCategorias) {
    fetch(API_BASE_URL + '/categorias')
      .then(function(response) {
        if (!response.ok) throw new Error('Erro ao buscar categorias');
        return response.json();
      })
      .then(function(categorias) {
        gridCategorias.innerHTML = categorias.map(function(cat) {
          return `
            <article class="categoria-card">
              <div class="card-img-wrap">
                <img src="${cat.imagem}" alt="${cat.nome}" width="400" height="280" loading="lazy">
              </div>
              <div class="card-body">
                <h3 class="card-title">${cat.nome}</h3>
                <p class="card-desc">${cat.descricao}</p>
                <a href="categoria.html?id=${cat.id}" class="card-btn">Ver Passeios</a>
              </div>
            </article>
          `;
        }).join('');
      })
      .catch(function(erro) {
        // Se o backend estiver fora do ar, mantém os cards fixos que já
        // estavam no HTML — o usuário não fica com a seção vazia.
        console.error('Não foi possível carregar categorias da API:', erro);
      });
  }


  /* ── Menu Mobile ─────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.setAttribute('aria-hidden', isExpanded);

      if (!isExpanded) {
        mobileNav.style.display = 'block';
      } else {
        mobileNav.style.display = 'none';
      }
    });
  }

  /* ── Fechar menu ao clicar em link ───────────── */
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (navToggle && mobileNav) {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.style.display = 'none';
      }
    });
  });

});