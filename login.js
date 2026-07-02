/* =====================================================
   LOGIN — JavaScript de Validação e Autenticação
   Horizonte Turismo — Portal de Turismo Local
   Disciplina: Programação Web — UFC Itapajé

   Funcionalidades:
   - Validação de campos em tempo real
   - Toggle de visibilidade da senha
   - Simulação de autenticação via backend
   - Mensagens de erro no frontend
   - Redirecionamento após login bem-sucedido
===================================================== */

document.addEventListener('DOMContentLoaded', function() {

  /* ── Referências aos elementos ───────────────── */
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('login-email');
  const senhaInput = document.getElementById('login-senha');
  const togglePassword = document.getElementById('toggle-password');
  const submitBtn = document.getElementById('login-submit');
  const alertBox = document.getElementById('login-alert');
  const alertText = document.getElementById('login-alert-text');
  const errorEmail = document.getElementById('error-email');
  const errorSenha = document.getElementById('error-senha');

  /* ── Toggle visibilidade da senha ────────────── */
  if (togglePassword && senhaInput) {
    togglePassword.addEventListener('click', function() {
      const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
      senhaInput.setAttribute('type', type);

      /* Atualiza ícone */
      const eyeIcon = document.getElementById('eye-icon');
      if (type === 'text') {
        eyeIcon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        `;
        togglePassword.setAttribute('aria-label', 'Ocultar senha');
      } else {
        eyeIcon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        `;
        togglePassword.setAttribute('aria-label', 'Mostrar senha');
      }
    });
  }

  /* ── Validação em tempo real ─────────────────── */
  function validarEmail() {
    const valor = emailInput.value.trim();
    errorEmail.textContent = '';
    emailInput.classList.remove('error');

    if (!valor) {
      errorEmail.textContent = 'Campo obrigatório';
      emailInput.classList.add('error');
      return false;
    }

    /* Valida formato de e-mail ou login (mínimo 4 caracteres) */
    if (valor.length < 4) {
      errorEmail.textContent = 'Mínimo 4 caracteres';
      emailInput.classList.add('error');
      return false;
    }

    /* Se contém @, valida como e-mail */
    if (valor.includes('@')) {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(valor)) {
        errorEmail.textContent = 'Formato de e-mail inválido';
        emailInput.classList.add('error');
        return false;
      }
    }

    return true;
  }

  function validarSenha() {
    const valor = senhaInput.value;
    errorSenha.textContent = '';
    senhaInput.classList.remove('error');

    if (!valor) {
      errorSenha.textContent = 'Campo obrigatório';
      senhaInput.classList.add('error');
      return false;
    }

    if (valor.length < 6) {
      errorSenha.textContent = 'Mínimo 6 caracteres';
      senhaInput.classList.add('error');
      return false;
    }

    return true;
  }

  /* Validação ao sair do campo (blur) */
  emailInput.addEventListener('blur', validarEmail);
  senhaInput.addEventListener('blur', validarSenha);

  /* Limpa erro ao digitar */
  emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('error')) {
      validarEmail();
    }
  });

  senhaInput.addEventListener('input', function() {
    if (senhaInput.classList.contains('error')) {
      validarSenha();
    }
  });

  /* ── Envio do formulário ─────────────────────── */
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    /* Limpa alerta anterior */
    alertBox.classList.remove('show');
    alertText.textContent = '';

    /* Valida todos os campos */
    const emailValido = validarEmail();
    const senhaValida = validarSenha();

    if (!emailValido || !senhaValida) {
      return;
    }

    /* Mostra loader no botão */
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const dados = {
      identificador: emailInput.value.trim(),
      senha: senhaInput.value
    };

    const API_BASE_URL = 'http://localhost:3000/api';

    fetch(API_BASE_URL + '/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
      .then(async function(response) {
        const resultado = await response.json();
        return { ok: response.ok, resultado };
      })
      .then(function({ ok, resultado }) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        if (ok) {
          /* Guarda o token JWT para usar nas próximas requisições */
          localStorage.setItem('token', resultado.access_token);
          localStorage.setItem('usuario', JSON.stringify(resultado.usuario));

          alertBox.className = 'login-alert login-alert-success show';
          alertText.textContent = 'Login realizado com sucesso! Redirecionando...';

          setTimeout(function() {
            window.location.href = 'roteiro.html';
          }, 1500);
        } else {
          alertBox.className = 'login-alert login-alert-error show';
          alertText.textContent = resultado.mensagem || 'E-mail ou senha incorretos.';
          senhaInput.value = '';
          senhaInput.focus();
        }
      })
      .catch(function(erro) {
        console.error('Erro ao autenticar:', erro);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        alertBox.className = 'login-alert login-alert-error show';
        alertText.textContent = 'Não foi possível conectar ao servidor. Tente novamente.';
      });
  });

  /* ── Verifica se já está logado ──────────────── */
  const tokenExistente = localStorage.getItem('token');
  if (tokenExistente) {
    // Já está logado — descomente se quiser redirecionar direto
    // window.location.href = 'roteiro.html';
  }

});