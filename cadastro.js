/* =====================================================
   CADASTRO — JavaScript de Validação
   Horizonte Turismo — Portal de Turismo Local
   Disciplina: Programação Web — UFC Itapajé

   Funcionalidades:
   - Validação de todos os campos em tempo real
   - Máscaras para CPF e Telefone
   - Toggle de visibilidade de senha
   - Confirmação de senha
   - Método GET no envio
   - Mensagens de erro no frontend (ao lado/abaixo de cada campo)
===================================================== */

document.addEventListener('DOMContentLoaded', function() {

  /* ── Referências aos elementos ───────────────── */
  const form = document.getElementById('cadastro-form');
  const alertBox = document.getElementById('cadastro-alert');
  const alertText = document.getElementById('cadastro-alert-text');
  const submitBtn = document.getElementById('cadastro-submit');
  const limparBtn = document.getElementById('cadastro-limpar');

  /* Campos */
  const campos = {
    nome: document.getElementById('cad-nome'),
    cpf: document.getElementById('cad-cpf'),
    telefone: document.getElementById('cad-telefone'),
    email: document.getElementById('cad-email'),
    endereco: document.getElementById('cad-endereco'),
    cidade: document.getElementById('cad-cidade'),
    cidadeOrigem: document.getElementById('cad-cidade-origem'),
    login: document.getElementById('cad-login'),
    senha: document.getElementById('cad-senha'),
    confirmarSenha: document.getElementById('cad-confirmar-senha'),
    dataVisita: document.getElementById('cad-data-visita'),
    preferencias: document.getElementById('cad-preferencias'),
    termos: document.getElementById('cad-termos')
  };

  /* Erros */
  const erros = {
    nome: document.getElementById('error-nome'),
    cpf: document.getElementById('error-cpf'),
    telefone: document.getElementById('error-telefone'),
    email: document.getElementById('error-email'),
    endereco: document.getElementById('error-endereco'),
    cidade: document.getElementById('error-cidade'),
    cidadeOrigem: document.getElementById('error-cidade-origem'),
    login: document.getElementById('error-login'),
    senha: document.getElementById('error-senha'),
    confirmarSenha: document.getElementById('error-confirmar-senha'),
    dataVisita: document.getElementById('error-data-visita'),
    preferencias: document.getElementById('error-preferencias'),
    termos: document.getElementById('error-termos')
  };

  /* ── Máscara de CPF ──────────────────────────── */
  campos.cpf.addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 9) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (valor.length > 6) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (valor.length > 3) {
      valor = valor.replace(/(\d{3})(\d{3})/, '$1.$2');
    }

    e.target.value = valor;
  });

  /* ── Máscara de Telefone ─────────────────────── */
  campos.telefone.addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 10) {
      valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (valor.length > 6) {
      valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/(\d{2})(\d+)/, '($1) $2');
    }

    e.target.value = valor;
  });

  /* ── Toggle visibilidade da senha ────────────── */
  function setupToggle(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    if (toggle && input) {
      toggle.addEventListener('click', function() {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);

        const eyeIcon = toggle.querySelector('.eye-icon');
        if (type === 'text') {
          eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          `;
          toggle.setAttribute('aria-label', 'Ocultar senha');
        } else {
          eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          `;
          toggle.setAttribute('aria-label', 'Mostrar senha');
        }
      });
    }
  }

  setupToggle('cad-senha', 'toggle-senha');
  setupToggle('cad-confirmar-senha', 'toggle-confirmar');

  /* ── Funções de validação ────────────────────── */
  function limparErro(campo, erro) {
    erro.textContent = '';
    campo.classList.remove('error');
  }

  function mostrarErro(campo, erro, mensagem) {
    erro.textContent = mensagem;
    campo.classList.add('error');
    return false;
  }

  function validarNome() {
    limparErro(campos.nome, erros.nome);
    const valor = campos.nome.value.trim();

    if (!valor) return mostrarErro(campos.nome, erros.nome, 'Campo obrigatório');
    if (valor.length < 3) return mostrarErro(campos.nome, erros.nome, 'Mínimo 3 caracteres');
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(valor)) return mostrarErro(campos.nome, erros.nome, 'Apenas letras e espaços');

    return true;
  }

  function validarCPF() {
    limparErro(campos.cpf, erros.cpf);
    const valor = campos.cpf.value.replace(/\D/g, '');

    if (!valor) return mostrarErro(campos.cpf, erros.cpf, 'Campo obrigatório');
    if (valor.length !== 11) return mostrarErro(campos.cpf, erros.cpf, 'CPF deve ter 11 dígitos');

    /* Validação básica de CPF (dígitos verificadores) */
    let soma = 0;
    let resto;

    if (/^(\d){10}$/.test(valor)) return mostrarErro(campos.cpf, erros.cpf, 'CPF inválido');

    for (let i = 1; i <= 9; i++) soma += parseInt(valor.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(valor.substring(9, 10))) return mostrarErro(campos.cpf, erros.cpf, 'CPF inválido');

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(valor.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(valor.substring(10, 11))) return mostrarErro(campos.cpf, erros.cpf, 'CPF inválido');

    return true;
  }

  function validarTelefone() {
    limparErro(campos.telefone, erros.telefone);
    const valor = campos.telefone.value.replace(/\D/g, '');

    if (!valor) return mostrarErro(campos.telefone, erros.telefone, 'Campo obrigatório');
    if (valor.length < 10) return mostrarErro(campos.telefone, erros.telefone, 'Telefone incompleto');
    if (valor.length > 11) return mostrarErro(campos.telefone, erros.telefone, 'Telefone inválido');

    return true;
  }

  function validarEmail() {
    limparErro(campos.email, erros.email);
    const valor = campos.email.value.trim();

    if (!valor) return mostrarErro(campos.email, erros.email, 'Campo obrigatório');

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) return mostrarErro(campos.email, erros.email, 'Formato de e-mail inválido');

    return true;
  }

  function validarEndereco() {
    limparErro(campos.endereco, erros.endereco);
    const valor = campos.endereco.value.trim();

    if (!valor) return mostrarErro(campos.endereco, erros.endereco, 'Campo obrigatório');
    if (valor.length < 5) return mostrarErro(campos.endereco, erros.endereco, 'Endereço muito curto');

    return true;
  }

  function validarCidade() {
    limparErro(campos.cidade, erros.cidade);
    const valor = campos.cidade.value.trim();

    if (!valor) return mostrarErro(campos.cidade, erros.cidade, 'Campo obrigatório');
    if (valor.length < 2) return mostrarErro(campos.cidade, erros.cidade, 'Cidade muito curta');

    return true;
  }

  function validarLogin() {
    limparErro(campos.login, erros.login);
    const valor = campos.login.value.trim();

    if (!valor) return mostrarErro(campos.login, erros.login, 'Campo obrigatório');
    if (valor.length < 4) return mostrarErro(campos.login, erros.login, 'Mínimo 4 caracteres');
    if (!/^[a-zA-Z0-9_]+$/.test(valor)) return mostrarErro(campos.login, erros.login, 'Apenas letras, números e underscore');

    return true;
  }

  function validarSenha() {
    limparErro(campos.senha, erros.senha);
    const valor = campos.senha.value;

    if (!valor) return mostrarErro(campos.senha, erros.senha, 'Campo obrigatório');
    if (valor.length < 8) return mostrarErro(campos.senha, erros.senha, 'Mínimo 8 caracteres');
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(valor)) {
      return mostrarErro(campos.senha, erros.senha, 'Deve conter letras e números');
    }

    return true;
  }

  function validarConfirmarSenha() {
    limparErro(campos.confirmarSenha, erros.confirmarSenha);
    const valor = campos.confirmarSenha.value;
    const senha = campos.senha.value;

    if (!valor) return mostrarErro(campos.confirmarSenha, erros.confirmarSenha, 'Campo obrigatório');
    if (valor !== senha) return mostrarErro(campos.confirmarSenha, erros.confirmarSenha, 'As senhas não coincidem');

    return true;
  }

  function validarTermos() {
    erros.termos.textContent = '';

    if (!campos.termos.checked) {
      erros.termos.textContent = 'Você deve aceitar os termos';
      return false;
    }

    return true;
  }

  /* ── Validação em tempo real (blur) ──────────── */
  campos.nome.addEventListener('blur', validarNome);
  campos.cpf.addEventListener('blur', validarCPF);
  campos.telefone.addEventListener('blur', validarTelefone);
  campos.email.addEventListener('blur', validarEmail);
  campos.endereco.addEventListener('blur', validarEndereco);
  campos.cidade.addEventListener('blur', validarCidade);
  campos.login.addEventListener('blur', validarLogin);
  campos.senha.addEventListener('blur', validarSenha);
  campos.confirmarSenha.addEventListener('blur', validarConfirmarSenha);

  /* Limpa erro ao digitar */
  Object.keys(campos).forEach(function(key) {
    const campo = campos[key];
    const erro = erros[key];

    if (campo && erro && campo.tagName !== 'SELECT') {
      campo.addEventListener('input', function() {
        if (campo.classList.contains('error')) {
          limparErro(campo, erro);
        }
      });
    }
  });

  /* ── Botão Limpar ────────────────────────────── */
  if (limparBtn) {
    limparBtn.addEventListener('click', function() {
      /* Limpa todos os erros */
      Object.keys(campos).forEach(function(key) {
        const campo = campos[key];
        const erro = erros[key];
        if (campo && erro) {
          limparErro(campo, erro);
        }
      });

      /* Limpa alerta geral */
      alertBox.classList.remove('show');
      alertText.textContent = '';

      /* Limpa checkbox */
      if (campos.termos) campos.termos.checked = false;
      erros.termos.textContent = '';
    });
  }

  /* ── Envio do formulário ─────────────────────── */
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    /* Limpa alerta anterior */
    alertBox.classList.remove('show');
    alertText.textContent = '';

    /* Valida todos os campos */
    const validacoes = [
      validarNome(),
      validarCPF(),
      validarTelefone(),
      validarEmail(),
      validarEndereco(),
      validarCidade(),
      validarLogin(),
      validarSenha(),
      validarConfirmarSenha(),
      validarTermos()
    ];

    const todosValidos = validacoes.every(function(v) { return v === true; });

    if (!todosValidos) {
      alertBox.className = 'cadastro-alert cadastro-alert-error show';
      alertText.textContent = 'Corrija os erros acima antes de continuar.';
      return;
    }

    /* Mostra loader no botão */
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const dados = {
      nome: campos.nome.value.trim(),
      cpf: campos.cpf.value,
      telefone: campos.telefone.value,
      email: campos.email.value.trim(),
      endereco: campos.endereco.value.trim(),
      cidade: campos.cidade.value.trim(),
      cidade_origem: campos.cidadeOrigem.value.trim() || null,
      login: campos.login.value.trim(),
      senha: campos.senha.value,
      confirmar_senha: campos.confirmarSenha.value,
      data_visita: campos.dataVisita.value || null,
      preferencias: campos.preferencias.value.trim() || null
    };

    const API_BASE_URL = 'http://localhost:3000/api';

    fetch(API_BASE_URL + '/usuarios/cadastro', {
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
          alertBox.className = 'cadastro-alert cadastro-alert-success show';
          alertText.textContent = 'Cadastro realizado com sucesso! Redirecionando...';

          setTimeout(function() {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          alertBox.className = 'cadastro-alert cadastro-alert-error show';
          alertText.textContent = resultado.mensagem || 'Erro ao cadastrar. Verifique os dados.';
        }
      })
      .catch(function(erro) {
        console.error('Erro ao cadastrar:', erro);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        alertBox.className = 'cadastro-alert cadastro-alert-error show';
        alertText.textContent = 'Não foi possível conectar ao servidor. Tente novamente.';
      });
  });

});