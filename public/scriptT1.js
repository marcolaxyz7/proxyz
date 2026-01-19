const API_URL = '/api';

// --- SONS ---
const audioSuccess = new Audio('success.wav');
const audioError = new Audio('error.wav');
audioSuccess.volume = 0.5;
audioError.volume = 0.5;

// --- VARIÁVEIS GLOBAIS ---
let currentUserId = null;
let currentUserEmail = null;
let mp = null;

// --- 1. CONFIGURAÇÃO DE PREÇOS (NO TOPO PARA NÃO FALHAR) ---
const PRICING_DISPLAY = {
    'BRL': { text: 'R$ 97.97', val: 97.97 },
    'USD': { text: '$ 19.90', val: 19.90 },
    'EUR': { text: '€ 19.90', val: 19.90 },
    'JPY': { text: '¥ 3.000', val: 3000 },
    'GBP': { text: '£ 14.90', val: 14.90 },
    'CAD': { text: 'C$ 29.90', val: 29.90 },
    'AUD': { text: 'A$ 29.90', val: 29.90 }
};

// --- 2. INICIALIZAÇÃO DO APP ---
async function initApp() {
    // Animações de Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // Configuração do Mercado Pago
    try {
        const res = await fetch(`${API_URL}/config`);
        const data = await res.json();
        if(data.publicKey) mp = new MercadoPago(data.publicKey);
    } catch(e) { console.error("Erro MP Config", e); }

    // LISTENERS (Ouvintes de eventos)
    
    // 1. Trava do Stripe (Termos)
    const checkStripe = document.getElementById('legalCheckStripe');
    if(checkStripe) {
        checkStripe.addEventListener('change', toggleStripeButton);
    }

    // 2. Trava do Mercado Pago (Termos)
    const checkMP = document.getElementById('check-terms-mp');
    if(checkMP) {
        checkMP.addEventListener('change', toggleMPButton);
    }

    // ATUALIZAÇÃO DE UI (Preço e Botões)
    // Roda imediato e reforça após 0.5s para garantir
    updatePriceUI();
    setTimeout(() => { updatePriceUI(); }, 500);
}

// Inicia o sistema
initApp();


// --- 3. LÓGICA DE UI E MOEDA ---

function getUserCurrency() {
    const lang = navigator.language || navigator.userLanguage; 
    
    if (lang.includes('pt')) return 'BRL'; 
    if (lang === 'pt-PT') return 'EUR';    
    if (lang.includes('ja')) return 'JPY'; 
    if (lang.includes('en-GB')) return 'GBP';
    if (lang.includes('en-CA')) return 'CAD'; 
    if (lang.includes('en-AU')) return 'AUD'; 
    if (['es', 'fr', 'de', 'it', 'nl'].some(l => lang.startsWith(l))) return 'EUR';

    return 'USD'; // Padrão Mundial
}

function updatePriceUI() {
    const currency = getUserCurrency();
    const displayInfo = PRICING_DISPLAY[currency] || PRICING_DISPLAY['USD'];
    
    // Atualiza Texto do Preço
    const el = document.getElementById('price-display');
    if(el) el.innerText = `VALOR: ${displayInfo.text}`;

    // A lógica de esconder/mostrar botões agora fica no resetPaymentView
    // mas podemos reforçar aqui se necessário.
}


// --- 4. O PORTEIRO (Lógica do Modal) ---
function resetPaymentView() {
    const opts = document.getElementById('pay-options');   
    const stripeView = document.getElementById('pay-stripe'); 
    const currency = getUserCurrency();

    // 1. Reseta os estados (Desabilita botões visualmente)
    const checkStripe = document.getElementById('legalCheckStripe');
    if(checkStripe) { checkStripe.checked = false; toggleStripeButton(); }
    
    const checkMP = document.getElementById('check-terms-mp');
    if(checkMP) { checkMP.checked = false; toggleMPButton(); }

    // Referência ao botão "Internacional" que precisa sumir no BR
    const btnStripeOption = document.getElementById('btn-opt-stripe'); 

    // 2. LÓGICA DE EXIBIÇÃO
    if (currency === 'BRL') {
        // === CASO BRASIL ===
        // Mostra o container de opções (onde fica o Mercado Pago)
        if(opts) opts.style.display = 'block';
        if(stripeView) stripeView.style.display = 'none';

        // TRAVA DE SEGURANÇA: Esconde o botão Internacional
        if(btnStripeOption) {
            btnStripeOption.style.display = 'none';
            btnStripeOption.style.visibility = 'hidden'; // Garante que suma
        }

    } else {
        // === CASO GRINGO ===
        // Esconde o menu BR e mostra o formulário Stripe direto
        if(opts) opts.style.display = 'none';
        if(stripeView) stripeView.style.display = 'block';
    }
}

// --- 5. TRAVAS DOS BOTÕES ---
function toggleStripeButton() {
    const chk = document.getElementById('legalCheckStripe');
    const btn = document.getElementById('btn-stripe-go');
    
    if (chk && btn) {
        if (chk.checked) {
            // HABILITA (Aceso e com brilho roxo)
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.style.boxShadow = '0 0 15px rgba(99, 91, 255, 0.4)'; 
        } else {
            // DESABILITA
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.style.boxShadow = 'none';
        }
    }
}

function toggleMPButton() {
    const chk = document.getElementById('check-terms-mp');
    const btn = document.getElementById('btn-mp-pro');
    
    if (chk && btn) {
        if (chk.checked) {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.style.boxShadow = '0 0 15px rgba(0, 200, 0, 0.4)'; 
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.style.boxShadow = 'none';
        }
    }
}


// --- 6. CHECKOUTS (PAGAMENTO) ---

// Checkout Mercado Pago (Brasil)
async function startCheckoutPro() {
    const btn = document.getElementById('btn-mp-pro');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processando...';
    btn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/create-preference`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: currentUserId, 
                email: currentUserEmail,
                title: 'Acesso Próxyz Library'
            })
        });

        const data = await res.json();
        if (data.init_point) {
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

// Checkout Stripe (Internacional)
async function startStripeCheckout() {
    const btn = document.getElementById('btn-stripe-go');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Redirecionando...';
    btn.disabled = true;

    const myCurrency = getUserCurrency();

    try {
        const res = await fetch(`${API_URL}/create-stripe-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: currentUserId, 
                email: currentUserEmail,
                countryCode: myCurrency 
            })
        });

        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert('Erro ao iniciar Stripe.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    } catch(e) {
        console.error(e);
        alert('Erro de conexão Stripe.');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}


// --- 7. SISTEMA DE LOGIN E CADASTRO ---

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
            audioSuccess.currentTime = 0;
            audioSuccess.play().catch(e=>{});
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); 
            window.location.href='indexT2.html';
        
        } else if(res.status===403) {
            // Pagamento Pendente -> Manda para Tela de Pagamento
            audioError.currentTime = 0;
            audioError.play().catch(e=>{});

            currentUserId = data.userId; 
            currentUserEmail = data.email;
            
            showMsg('Pagamento Pendente', 'Finalize o pagamento.', 'info');
            openModal('signup'); 
            switchStep('step-payment'); // Vai para tela de pagamento
            resetPaymentView(); // <--- AQUI ESTÁ A MÁGICA: Decide qual tela mostrar
            updatePriceUI();

        } else {
            audioError.currentTime = 0;
            audioError.play().catch(e=>{});
            showMsg('Erro', data.error, 'error');
        }
    } catch(e) { 
        audioError.currentTime = 0;
        audioError.play().catch(e=>{});
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
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Criando conta...'; 
    btn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password:pass,whatsapp})});
        const data = await res.json();
        if(res.ok) {
            currentUserId = data.userId; currentUserEmail = data.email;
            
            // SUCESSO NO CADASTRO -> MANDA PRO PAGAMENTO
            switchStep('step-payment'); 
            resetPaymentView(); // <--- AQUI: Ajusta a tela para Gringo ou BR
            updatePriceUI();
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

async function requestPasswordReset() {
    const emailInput = document.getElementById('forgotEmail'); 
    const btn = document.getElementById('btn-forgot');
    
    if(!emailInput || !emailInput.value) { alert('Digite seu e-mail.'); return; }

    const originalText = btn.innerText;
    btn.innerText = 'Enviando...'; btn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/forgot-password`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailInput.value })
        });
        if (res.ok) {
            alert('E-mail enviado!'); emailInput.value = ''; closeModal(); 
        } else { alert('Erro ao enviar.'); }
    } catch (error) { alert('Erro de conexão.'); } 
    finally { btn.innerText = originalText; btn.disabled = false; }
}


// --- 8. HELPERS E MODAIS ---

function showMsg(title, text, type='info') {
    document.getElementById('msgTitle').innerText = title;
    document.getElementById('msgText').innerText = text;
    const icon = document.getElementById('msgIcon');
    icon.className = 'msg-icon fa-solid ' + (type === 'success' ? 'fa-check-circle msg-success' : type === 'error' ? 'fa-circle-xmark msg-error' : 'fa-circle-exclamation msg-info');
    document.getElementById('msgModal').style.display = 'flex';
    
    if (type === 'success') {
        audioSuccess.currentTime = 0; audioSuccess.play();
    } else {
        audioError.currentTime = 0; audioError.play();
    }
}

function closeMsgModal() { document.getElementById('msgModal').style.display = 'none'; }

function openModal(step) { 
    document.getElementById('authModal').style.display = 'flex'; 
    switchStep(step==='login'?'step-login':'step-signup'); 
}

function closeModal() { document.getElementById('authModal').style.display = 'none'; }

function switchStep(stepId) {
    document.querySelectorAll('.modal-step').forEach(el => el.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');
    document.querySelector('.close-modal').style.display = 'block';
}

function openLegalModal(id) { 
    const modal = document.getElementById(id);
    modal.style.zIndex = '2005'; 
    modal.style.display = 'flex'; 
}

function closeLegalModal(id) { document.getElementById(id).style.display = 'none'; }

function formatGlobalPhone(input) { let v=input.value.replace(/[^0-9+]/g,''); if(v.includes('+')) v='+'+v.split('+').join(''); input.value=v; }
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function showError(id, msg) { const el=document.getElementById(id); el.classList.add('input-invalid'); const sp=el.previousElementSibling; if(sp) {sp.innerText=msg; sp.style.display='block';} }
function clearError(i) { i.classList.remove('input-invalid'); i.previousElementSibling.style.display='none'; }


// --- 9. VERIFICAÇÃO DE RETORNO (URL) ---
const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get('payment');
const sessionId = urlParams.get('session_id');

if (paymentStatus === 'success' && sessionId) {
    showMsg('Processando...', 'Validando Stripe...', 'info');
    fetch(`${API_URL}/check-stripe-payment/${sessionId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'paid') {
                showMsg('Sucesso!', 'Acesso Liberado!', 'success');
                window.history.replaceState({}, document.title, "indexT1.html");
                openModal('login');
            } else { showMsg('Atenção', 'Pagamento pendente.', 'error'); }
        }).catch(err => console.error(err));
} 
else if (paymentStatus === 'mp_approved') {
    showMsg('Sucesso!', 'Pagamento Confirmado!', 'success');
    window.history.replaceState({}, document.title, "indexT1.html");
    openModal('login');
} 
else if (paymentStatus === 'mp_pending') {
    showMsg('Aguardando', 'Pagamento em processamento.', 'info');
    window.history.replaceState({}, document.title, "indexT1.html");
} 
else if (paymentStatus === 'mp_failure') {
    showMsg('Erro', 'Pagamento não concluído.', 'error');
    window.history.replaceState({}, document.title, "indexT1.html");
}

// --- FUNÇÃO DO OLINHO (Coloque no final do arquivo) ---
function togglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    
    // Teste de segurança para não travar se o ID estiver errado
    if (!input || !icon) return console.warn("Erro: Input ou Ícone não encontrados", inputId, iconId);

    if (input.type === 'password') {
        input.type = 'text'; // Mostra a senha
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password'; // Esconde a senha
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}