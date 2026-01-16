const API_URL = '/api';

const audioSuccess = new Audio('success.wav');
const audioError = new Audio('error.wav');
audioSuccess.volume = 0.5; // Ajuste o volume (0.0 a 1.0)
audioError.volume = 0.5;

        let currentUserId = null;
        let currentUserEmail = null;
        let mp = null;
        let cardForm = null;

        // 1. INICIALIZAÇÃO
        async function initApp() {
            // Animações
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
            });
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            
            // Mercado Pago (Pega Chave Pública do Backend)
            try {
                const res = await fetch(`${API_URL}/config`);
                const data = await res.json();
                if(data.publicKey) mp = new MercadoPago(data.publicKey);
            } catch(e) { console.error("Erro MP Config", e); }
        }
        initApp();

       // --- CORREÇÃO DE PREÇO E UI (NO SCRIPT T1) ---

// 1. Forcei o valor para 1.00 aqui para testes
const PRICING_DISPLAY = {
    'BRL': { text: 'R$ 97.97', val: 97.97 },
    'USD': { text: '$ 19.90', val: 19.90 },
    'EUR': { text: '€ 19.90', val: 19.90 },
    'JPY': { text: '¥ 3.000', val: 3000 },
    'GBP': { text: '£ 14.90', val: 14.90 },
    'CAD': { text: 'C$ 29.90', val: 29.90 },
    'AUD': { text: 'A$ 29.90', val: 29.90 }
};

// 1. CORREÇÃO DA LÓGICA DE MOEDA (Esconde Stripe no BR, Esconde Pix fora)
function updatePriceUI() {
    const currency = getUserCurrency();
    const displayInfo = PRICING_DISPLAY[currency] || PRICING_DISPLAY['USD'];
    const displayValue = displayInfo.text;
    const el = document.getElementById('price-display');
    if(el) el.innerText = `VALOR: ${displayValue}`;

    const btnMP = document.getElementById('btn-mp-pro');
    const btnStripe = document.getElementById('btn-opt-stripe');

    if (currency === 'BRL') {
        if(btnMP) btnMP.style.display = 'flex';
        if(btnStripe) btnStripe.style.display = 'none';
    } else {
        if(btnMP) btnMP.style.display = 'none';
        if(btnStripe) btnStripe.style.display = 'flex';
    }
}

async function startCheckoutPro() {
    const btn = document.getElementById('btn-mp-pro');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Redirecionando...';
    btn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/create-preference`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: currentUserId, 
                email: currentUserEmail,
                title: 'Acesso Próxyz Library',
                price: 97.97 // <--- VALOR REAL QUE VAI SER COBRADO
            })
        });

        const data = await res.json();

        if (data.init_point) {
            // REDIRECIONA O USUÁRIO PARA O MERCADO PAGO
            window.location.href = data.init_point;
        } else {
            alert('Erro ao gerar pagamento.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    } catch(e) {
        console.error(e);
        alert('Erro de conexão.');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

        // 2. FUNÇÕES DE MODAL
        function showMsg(title, text, type='info') {
            document.getElementById('msgTitle').innerText = title;
            document.getElementById('msgText').innerText = text;
            const icon = document.getElementById('msgIcon');
            icon.className = 'msg-icon fa-solid ' + (type === 'success' ? 'fa-check-circle msg-success' : type === 'error' ? 'fa-circle-xmark msg-error' : 'fa-circle-exclamation msg-info');
            document.getElementById('msgModal').style.display = 'flex';
            // TOCA O SOM BASEADO NO TIPO
    if (type === 'success') {
        audioSuccess.currentTime = 0;
        audioSuccess.play();
    } else {
        // Serve para 'error' e 'info'
        audioError.currentTime = 0;
        audioError.play();
    }
        }

        function closeMsgModal() { document.getElementById('msgModal').style.display = 'none'; }
        
        function openModal(step) { document.getElementById('authModal').style.display = 'flex'; switchStep(step==='login'?'step-login':'step-signup'); }
        
        function closeModal() {
            document.getElementById('authModal').style.display = 'none';
        }

        function switchStep(stepId) {
            document.querySelectorAll('.modal-step').forEach(el => el.classList.remove('active'));
            document.getElementById(stepId).classList.add('active');
            document.querySelector('.close-modal').style.display = 'block';
        }

        // --- AQUI ESTAVA O ERRO: MANTENHA APENAS ESTA VERSÃO ---
        function openLegalModal(id) { 
            const modal = document.getElementById(id);
            // Força o modal de termos a ficar ACIMA do modal de pagamento (que tem z-index 2000)
            modal.style.zIndex = '2005'; 
            modal.style.display = 'flex'; 
        }
        
        // APAGUE A LINHA QUE TINHA AQUI (a antiga openLegalModal)
        
        function closeLegalModal(id) { document.getElementById(id).style.display = 'none'; }

       
        function resetPaymentView() {
    const opts = document.getElementById('pay-options');
    const pix = document.getElementById('pay-pix');
    const card = document.getElementById('pay-card');
    const stripe = document.getElementById('pay-stripe');

    // Esconde/Mostra as divs se elas existirem
    if(opts) opts.style.display = 'block';
    if(pix) pix.style.display = 'none';
    if(card) card.style.display = 'none';
    if(stripe) stripe.style.display = 'none';

    // Reseta Pix
    const checkPix = document.getElementById('legalCheckPix');
    if(checkPix) checkPix.checked = false;
    const btnPix = document.getElementById('btn-finish-pix');
    if(btnPix) btnPix.disabled = true;

    // Reseta Stripe
    const checkStripe = document.getElementById('legalCheckStripe');
    if(checkStripe) checkStripe.checked = false;
    const btnStripe = document.getElementById('btn-stripe-go');
    if(btnStripe) btnStripe.disabled = true;
    
    // NÃO tentamos limpar o checkbox do cartão antigo, pois ele não existe mais.
}

        // NOVA FUNÇÃO: View do Stripe
        function showStripeView() {
            document.getElementById('pay-options').style.display = 'none';
            document.getElementById('pay-stripe').style.display = 'block';
        }

        async function startStripeCheckout() {
            const btn = document.getElementById('btn-stripe-go');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Redirecionando...';
            btn.disabled = true;

            // Pega a moeda detectada
            const myCurrency = getUserCurrency();

            try {
                const res = await fetch(`${API_URL}/create-stripe-session`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        userId: currentUserId, 
                        email: currentUserEmail,
                        countryCode: myCurrency // <--- ENVIA A MOEDA AQUI
                    })
                });

                const data = await res.json();

                if (data.url) {
                    window.location.href = data.url;
                } else {
                    alert('Erro ao iniciar pagamento.');
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }

            } catch(e) {
                console.error(e);
                showMsg('Erro', 'Não foi possível conectar ao Stripe.', 'error');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }

        // 4. LÓGICA DE USUÁRIO
async function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPass').value;
    try {
        const res = await fetch(`${API_URL}/login`, { 
            method:'POST', 
            headers:{'Content-Type':'application/json'}, 
            body:JSON.stringify({email,password})
        });
        
        const data = await res.json();
        
        if(res.ok) {
            // [SUCESSO] TOCA O SOM AQUI
            audioSuccess.currentTime = 0;
            audioSuccess.play().catch(e => console.log("Som bloqueado pelo navegador"));

            // 1. Salva o Token
            localStorage.setItem('token', data.token);
            
            // 2. SALVA O NOME DO USUÁRIO
            localStorage.setItem('user', JSON.stringify(data.user)); 

            // 3. Redireciona
            window.location.href='indexT2.html';
        
        } else if(res.status===403) {
            // [PAGAMENTO PENDENTE] TOCA SOM DE ALERTA/ERRO AQUI
            audioError.currentTime = 0;
            audioError.play().catch(e => console.log("Som bloqueado"));

            currentUserId = data.userId; currentUserEmail = data.email;
            showMsg('Pagamento Pendente', 'Finalize o pagamento.', 'info');
            openModal('signup'); switchStep('step-payment'); resetPaymentView(); updatePriceUI();

        } else {
            // [ERRO GERAL - SENHA ERRADA, ETC] TOCA SOM DE ERRO AQUI
            audioError.currentTime = 0;
            audioError.play().catch(e => console.log("Som bloqueado"));

            showMsg('Erro', data.error, 'error');
        }
    } catch(e) { 
        // [ERRO DE CONEXÃO] TOCA SOM DE ERRO AQUI TAMBÉM
        audioError.currentTime = 0;
        audioError.play().catch(e => console.log("Som bloqueado"));

        showMsg('Erro', 'Falha na conexão.', 'error'); 
    }
}

        async function validateAndGoToPayment() {
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const pass = document.getElementById('regPass').value;
            const whatsapp = document.getElementById('whatsappInput').value.replace(/\D/g,'');

            let hasError = false;
            if(!name) { showError('regName', 'Nome obrigatório'); hasError=true; }
            if(!validateEmail(email)) { showError('regEmail', 'Inválido'); hasError=true; }
            if(pass.length < 8) { showError('regPass', 'Mínimo 8'); hasError=true; }
            if(whatsapp.length < 8) { showError('whatsappInput', 'Inválido'); hasError=true; }
            if(hasError) return;

            const btn = document.querySelector('#step-signup .btn-main');
            const txt = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processando...'; btn.disabled = true;

            try {
                const res = await fetch(`${API_URL}/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password:pass,whatsapp})});
                const data = await res.json();
                if(res.ok) {
                    currentUserId = data.userId; currentUserEmail = data.email;
                    switchStep('step-payment'); resetPaymentView(); updatePriceUI();
                } else showMsg('Erro', data.error, 'error');
            } catch(e) { showMsg('Erro', 'Falha ao criar conta.', 'error'); }
            finally { btn.innerHTML = txt; btn.disabled = false; }
        }

        async function cancelRegistration() {
            if(currentUserId) {
                try { await fetch(`${API_URL}/cancel-register`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId:currentUserId}) }); }
                catch(e){}
            }
            currentUserId = null;
            document.getElementById('authModal').style.display = 'none';
            switchStep('step-login');
        }


        async function processCardBackend(data) {
            try {
                const res = await fetch(`${API_URL}/create-payment`, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        userId: currentUserId, 
                        email: currentUserEmail, 
                        type: 'card',
                        installments: 1, // Força à vista
                        ...data 
                    })
                });
                
                const result = await res.json();
                
                if (result.status === 'approved') {
                    showMsg('Sucesso!', 'Pagamento Aprovado! Bem-vindo.', 'success');
                    currentUserId = null; 
                    document.getElementById('authModal').style.display = 'none';
                    switchStep('step-login');
                } else {
                    showMsg('Recusado', 'Pagamento negado pelo banco.', 'error');
                }
            } catch (e) {
                showMsg('Erro', 'Falha ao processar cartão.', 'error');
            }
        }

  // --- SUBSTITUA A FUNÇÃO sendRecoveryEmail POR ESTA ---

async function requestPasswordReset() {
    // Atenção aos IDs aqui: 'forgotEmail' e 'btn-forgot'
    const emailInput = document.getElementById('forgotEmail'); 
    const btn = document.getElementById('btn-forgot');
    
    if(!emailInput || !emailInput.value) {
        alert('Por favor, digite seu e-mail.');
        return;
    }

    const originalText = btn.innerText;
    btn.innerText = 'Enviando...';
    btn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailInput.value })
        });

        const data = await res.json();

        if (res.ok) {
            alert('E-mail enviado! Verifique sua caixa de entrada (e spam).');
            emailInput.value = '';
            closeModal(); 
        } else {
            alert(data.error || 'Erro ao enviar.');
        }
    } catch (error) {
        console.error(error);
        alert('Erro de conexão.');
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

    // --- DETECTOR DE MOEDA ---
function getUserCurrency() {
    const lang = navigator.language || navigator.userLanguage; // Ex: 'pt-BR', 'en-US'
    
    // Mapeamento simples de Região -> Moeda
    if (lang.includes('pt')) return 'BRL'; // Brasil, Portugal (cuidado, Portugal usa EUR, ver ajuste abaixo)
    if (lang === 'pt-PT') return 'EUR';    // Correção para Portugal
    
    if (lang.includes('ja')) return 'JPY'; // Japão
    if (lang.includes('en-GB')) return 'GBP'; // Reino Unido
    if (lang.includes('en-CA')) return 'CAD'; // Canadá
    if (lang.includes('en-AU')) return 'AUD'; // Austrália
    
    // Europa (Simplificado - pega principais línguas do Euro)
    if (['es', 'fr', 'de', 'it', 'nl'].some(l => lang.startsWith(l))) return 'EUR';

    return 'USD'; // Resto do mundo
}

        // Helpers
        function formatGlobalPhone(input) { let v=input.value.replace(/[^0-9+]/g,''); if(v.includes('+')) v='+'+v.split('+').join(''); input.value=v; }
        function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
        function showError(id, msg) { const el=document.getElementById(id); el.classList.add('input-invalid'); const sp=el.previousElementSibling; if(sp) {sp.innerText=msg; sp.style.display='block';} }
        function clearError(i) { i.classList.remove('input-invalid'); i.previousElementSibling.style.display='none'; }
        
        function flipCard(el) { el.classList.toggle('flipped'); }
        function resetLuckySection() {
            document.getElementById('prizeDisplay').classList.remove('active');
            document.querySelectorAll('.hand-coin').forEach(c => c.style.opacity = '1');
        } 
        function chooseSide(side) { 
            if (side === 'left') { document.querySelectorAll('.hand-coin').forEach(c => c.style.opacity = '0'); document.getElementById('prizeDisplay').classList.add('active'); } 
            else { openModal('signup'); resetLuckySection(); }
        }

   // --- VERIFICADOR UNIFICADO DE PAGAMENTOS (STRIPE E MERCADO PAGO) ---
const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get('payment'); // Pega o status ('success', 'mp_approved', etc.)
const sessionId = urlParams.get('session_id');  // Só existe no Stripe

// 1. CASO STRIPE (Identificado por 'success' E presença de session_id)
if (paymentStatus === 'success' && sessionId) {
    showMsg('Processando...', 'Validando Stripe...', 'info');
    
    fetch(`${API_URL}/check-stripe-payment/${sessionId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'paid') {
                showMsg('Sucesso!', 'Pagamento Stripe confirmado!', 'success');
                window.history.replaceState({}, document.title, "indexT1.html"); // Limpa URL
                openModal('login');
            } else {
                showMsg('Atenção', 'Pagamento Stripe pendente.', 'error');
            }
        })
        .catch(err => console.error(err));
} 

// 2. CASO MERCADO PAGO (Identificado pelos nossos códigos 'mp_')
else if (paymentStatus === 'mp_approved') {
    showMsg('Sucesso!', 'Pagamento via Mercado Pago confirmado!', 'success');
    window.history.replaceState({}, document.title, "indexT1.html"); // Limpa URL
    openModal('login');
} 
else if (paymentStatus === 'mp_pending') {
    showMsg('Aguardando', 'Seu pagamento (Pix/Boleto) está sendo processado.', 'info');
    window.history.replaceState({}, document.title, "indexT1.html");
} 
else if (paymentStatus === 'mp_failure') {
    showMsg('Erro', 'O pagamento não foi concluído. Tente novamente.', 'error');
    window.history.replaceState({}, document.title, "indexT1.html");
}

// --- FUNÇÃO PARA LIBERAR O BOTÃO DE PAGAMENTO ---
function toggleMPButton() {
    const chk = document.getElementById('check-terms-mp');
    const btn = document.getElementById('btn-mp-pro');
    
    if (chk && btn) {
        if (chk.checked) {
            // HABILITA O BOTÃO (Visual Aceso)
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.style.boxShadow = '0 0 15px rgba(204, 0, 0, 0.4)'; // Volta o brilho
        } else {
            // DESABILITA O BOTÃO (Visual Apagado)
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.style.boxShadow = 'none'; // Tira o brilho
        }
    }
}