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

    /* Simula requisição ao backend */
    const dados = {
      email: emailInput.value.trim(),
      senha: senhaInput.value
    };

    /* 
      AQUI SERIA A CHAMADA REAL AO BACKEND:

      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      .then(response => response.json())
      .then(data => { ... })
      .catch(error => { ... });
    */

    /* Simulação de autenticação (para demonstração) */
    setTimeout(function() {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      /* 
        Credenciais de teste para demonstração:
        - E-mail: teste@email.com
        - Senha: 123456

        Ou qualquer login/senha com os critérios mínimos
        será aceito nesta simulação.
      */
      const email = dados.email.toLowerCase();
      const senha = dados.senha;

      /* Simulação: aceita qualquer e-mail válido + senha >= 6 */
      const autenticado = (
        (email === 'teste@email.com' && senha === '123456') ||
        (email.length >= 4 && senha.length >= 6)
      );

      if (autenticado) {
        /* Sucesso: mostra mensagem e redireciona */
        alertBox.className = 'login-alert login-alert-success show';
        alertText.textContent = 'Login realizado com sucesso! Redirecionando...';

        /* Salva no sessionStorage que o usuário está logado */
        sessionStorage.setItem('usuarioLogado', JSON.stringify({
          email: dados.email,
          loginEm: new Date().toISOString()
        }));

        /* Redireciona para o roteiro após 1.5 segundos */
        setTimeout(function() {
          window.location.href = 'roteiro.html';
        }, 1500);

      } else {
        /* Erro: credenciais inválidas */
        alertBox.className = 'login-alert login-alert-error show';
        alertText.textContent = 'E-mail ou senha incorretos. Tente novamente.';
        senhaInput.value = '';
        senhaInput.focus();
      }

    }, 1500); /* Simula delay de rede */
  });

  /* ── Verifica se já está logado ──────────────── */
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  if (usuarioLogado) {
    /* Se já estiver logado, pode redirecionar direto */
    /* Descomente a linha abaixo se quiser forçar login toda vez */
    // window.location.href = 'roteiro.html';
  }

});