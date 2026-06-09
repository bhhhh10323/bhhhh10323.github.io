/* ============================================================
   script.js — Funcionalidades JavaScript do Projeto Reflexivo
   
   Funcionalidade 1: Modo Escuro / Claro (toggle de tema)
   Funcionalidade 2: Validação de Formulário com feedback visual
   Funcionalidade 3: Botão "Ver Mais" (mostrar/ocultar conteúdo)
============================================================ */


/* ============================================================
   FUNCIONALIDADE 1 — MODO ESCURO / CLARO
   Alterna o atributo data-bs-theme no <html> entre "light" e "dark"
   e salva a preferência do usuário no localStorage.
============================================================ */
function alternarTema() {
    const html = document.documentElement;
    const temaAtual = html.getAttribute('data-bs-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-bs-theme', novoTema);

    // Atualiza ícone e texto do botão
    const icone = document.getElementById('iconeTema');
    const texto = document.getElementById('textoTema');

    if (novoTema === 'dark') {
        icone.className = 'bi bi-sun-fill';
        texto.textContent = 'Modo Claro';
    } else {
        icone.className = 'bi bi-moon-fill';
        texto.textContent = 'Modo Escuro';
    }

    // Salva preferência
    localStorage.setItem('tema', novoTema);
}

// Aplica o tema salvo ao carregar a página
(function aplicarTemaSalvo() {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo) {
        document.documentElement.setAttribute('data-bs-theme', temaSalvo);
        if (temaSalvo === 'dark') {
            const icone = document.getElementById('iconeTema');
            const texto = document.getElementById('textoTema');
            if (icone) icone.className = 'bi bi-sun-fill';
            if (texto) texto.textContent = 'Modo Claro';
        }
    }
})();


/* ============================================================
   FUNCIONALIDADE 2 — VALIDAÇÃO DE FORMULÁRIO
   Valida os campos obrigatórios antes do envio e exibe
   mensagens de erro/sucesso com manipulação do DOM.
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formContato');

    if (!form) return;

    form.addEventListener('submit', function (evento) {
        evento.preventDefault(); // Impede envio padrão

        let valido = true;

        // Validar Nome
        const nome = document.getElementById('nome');
        if (!nome.value.trim()) {
            nome.classList.add('is-invalid');
            nome.classList.remove('is-valid');
            valido = false;
        } else {
            nome.classList.remove('is-invalid');
            nome.classList.add('is-valid');
        }

        // Validar E-mail (formato básico)
        const email = document.getElementById('email');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !regexEmail.test(email.value.trim())) {
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
            valido = false;
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }

        // Validar Mensagem
        const mensagem = document.getElementById('mensagem');
        if (!mensagem.value.trim()) {
            mensagem.classList.add('is-invalid');
            mensagem.classList.remove('is-valid');
            valido = false;
        } else {
            mensagem.classList.remove('is-invalid');
            mensagem.classList.add('is-valid');
        }

        // Se tudo válido: exibe toast de sucesso e limpa formulário
        if (valido) {
            const toastEl = document.getElementById('toastSucesso');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();

            // Limpa os campos e estados após 800ms
            setTimeout(function () {
                form.reset();
                form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
            }, 800);
        }
    });

    // Remove estado inválido ao começar a digitar
    form.querySelectorAll('input, textarea').forEach(function (campo) {
        campo.addEventListener('input', function () {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });
});


/* ============================================================
   FUNCIONALIDADE 3 — BOTÃO "VER MAIS" (Mostrar/Ocultar conteúdo)
   Exibe ou oculta o bloco de texto extra e atualiza o botão.
============================================================ */
function toggleVerMais() {
    const bloco = document.getElementById('verMaisBloco');
    const btn = document.getElementById('btnVerMais');
    const icone = document.getElementById('iconeVerMais');

    const estaOculto = bloco.classList.contains('d-none');

    if (estaOculto) {
        bloco.classList.remove('d-none');
        btn.innerHTML = '<i class="bi bi-chevron-up me-1" id="iconeVerMais"></i> Ver menos';
        btn.classList.replace('btn-outline-primary', 'btn-primary');
    } else {
        bloco.classList.add('d-none');
        btn.innerHTML = '<i class="bi bi-chevron-down me-1" id="iconeVerMais"></i> Ver mais';
        btn.classList.replace('btn-primary', 'btn-outline-primary');
    }
}
