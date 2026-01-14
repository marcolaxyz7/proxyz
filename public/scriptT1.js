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
    'BRL': { text: 'R$ 1.00', val: 1.00 }, // <--- AQUI ESTAVA 97.97, MUDEI PRA 1.00
    'USD': { text: '$ 1.00', val: 1.00 },
    'EUR': { text: '€ 1.00', val: 1.00 },
    'JPY': { text: '¥ 150', val: 150 },
    'GBP': { text: '£ 1.00', val: 1.00 },
    'CAD': { text: 'C$ 1.00', val: 1.00 },
    'AUD': { text: 'A$ 1.00', val: 1.00 }
};

// 1. CORREÇÃO DA LÓGICA DE MOEDA (Esconde Stripe no BR, Esconde Pix fora)
function updatePriceUI() {
    const currency = getUserCurrency();
    
    // Força R$ 1.00 ou $ 1.00 visualmente
    const displayValue = currency === 'BRL' ? 'R$ 1.00' : '$ 1.00'; 
    const el = document.getElementById('price-display');
    if(el) el.innerText = `VALOR: ${displayValue}`;

    // Pega os botões
    const btnPix = document.getElementById('btn-opt-pix');
    const btnCard = document.getElementById('btn-opt-card');
    const btnStripe = document.getElementById('btn-opt-stripe');

    if (currency === 'BRL') {
        // --- SE FOR BRASIL ---
        // Mostra Pix e Cartão (Brick)
        if(btnPix) btnPix.style.display = 'flex'; // ou 'block'
        if(btnCard) btnCard.style.display = 'flex';
        // Esconde Stripe
        if(btnStripe) btnStripe.style.display = 'none';
    } else {
        // --- SE FOR GRINGO ---
        // Esconde Pix e Cartão BR
        if(btnPix) btnPix.style.display = 'none';
        if(btnCard) btnCard.style.display = 'none';
        // Mostra só Stripe
        if(btnStripe) btnStripe.style.display = 'flex';
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
            if (document.getElementById('step-payment').classList.contains('active') && currentUserId) {
                cancelRegistration(); // Limpa se fechar no meio
                return;
            }
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
        function showPixView() {
            document.getElementById('pay-options').style.display = 'none';
            document.getElementById('pay-pix').style.display = 'block';
            generatePixPayment();
        }

        function showCardView() {
    // 1. Esconde as opções e mostra o container do cartão
    document.getElementById('pay-options').style.display = 'none';
    document.getElementById('pay-card').style.display = 'block';
    
    // 2. Aguarda um pouquinho para a div aparecer e chama o Brick
    setTimeout(() => {
        // Se o MP estiver carregado, monta o formulário novo (Brick)
        if(mp) {
            mountCardForm(); 
        } else {
            console.error("SDK do Mercado Pago não carregou.");
        }
    }, 100);
}

// 2. CORREÇÃO DO CARTÃO (Remove Parcelamento)
let brickController = null;

async function mountCardForm() {
    const container = document.getElementById('pay-card-container');
    if(container) container.innerHTML = '';

    const settings = {
        initialization: {
            amount: 1.00,
            payer: {
                email: currentUserEmail,
                // CORREÇÃO DO ERRO "entityType":
                entityType: 'individual', 
            },
            installments: 1 // Força sistema a entender que é à vista
        },
        customization: {
            visual: {
                style: { theme: 'dark' },
                hidePaymentButton: false
            },
            paymentMethods: {
                creditCard: "all",
                debitCard: "all",
                ticket: "all",
                maxInstallments: 1,
                minInstallments: 1
            }
        },
        callbacks: {
            onReady: () => {
                console.log('Brick pronto');
            },
            onSubmit: async ({ selectedPaymentMethod, formData }) => {
                const cleanFormData = { ...formData, installments: 1 };
                
                return new Promise((resolve, reject) => {
                    fetch(`${API_URL}/process-brick`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            formData: cleanFormData, 
                            userId: currentUserId, 
                            email: currentUserEmail 
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === 'approved') {
                            showMsg('Sucesso!', 'Pagamento Aprovado!', 'success');
                            currentUserId = null;
                            document.getElementById('authModal').style.display = 'none';
                            switchStep('step-login');
                            resolve();
                        } else {
                            showMsg('Recusado', 'Pagamento negado.', 'error');
                            reject();
                        }
                    })
                    .catch(() => reject());
                });
            },
            onError: (error) => console.error(error),
        },
    };

    const bricksBuilder = mp.bricks();
    brickController = await bricksBuilder.create("payment", "pay-card-container", settings);
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

        // 5. PIX
        async function generatePixPayment() {
            const container = document.getElementById('pay-content-pix');
            container.innerHTML = '<p>Gerando Pix...</p>';
            try {
                const res = await fetch(`${API_URL}/create-payment`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId:currentUserId, email:currentUserEmail, type:'pix'})});
                const data = await res.json();
                if(data.qr_code_base64) {
                    container.innerHTML = `<div class="pix-box"><img src="data:image/png;base64,${data.qr_code_base64}" width="180"></div><textarea readonly style="width:100%; background:#111; color:#ccc; border:1px solid #333; font-size:0.7rem;">${data.qr_code}</textarea><button class="btn-main" onclick="navigator.clipboard.writeText('${data.qr_code}'); alert('Copiado!')" style="padding:5px;">COPIAR</button>`;
                }
            } catch(e) { container.innerHTML = '<p style="color:#cc0000">Erro ao gerar Pix.</p>'; }
        }

        async function checkPaymentAndFinish() {
            const btn = document.getElementById('btn-finish-pix');
            btn.innerHTML = 'Verificando...';
            const res = await fetch(`${API_URL}/check-status/${currentUserId}`);
            const data = await res.json();
            if(data.status === 'active') {
                showMsg('Sucesso!', 'Conta ativada!', 'success');
                currentUserId = null; 
                document.getElementById('authModal').style.display = 'none';
                switchStep('step-login');
            } else { showMsg('Aguardando', 'Pagamento ainda não confirmado.', 'info'); }
            btn.innerHTML = 'JÁ FIZ O PAGAMENTO';
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
    // Pegamos os elementos pelos IDs que estão no seu HTML
    const emailInput = document.getElementById('forgotEmail'); // Corrigido para 'forgotEmail' que é o ID no HTML
    const btn = document.getElementById('btn-forgot');         // Corrigido para 'btn-forgot' que é o ID no HTML
    
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

// VERIFICA SE VOLTOU DO STRIPE
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const paymentStatus = urlParams.get('payment');

    if (paymentStatus === 'success' && sessionId) {
        // Abre o modal de carregamento ou feedback
        showMsg('Processando...', 'Validando seu pagamento...', 'info');
        
        // Chama o backend para confirmar e liberar o acesso
        fetch(`${API_URL}/check-stripe-payment/${sessionId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'paid') {
                    showMsg('Sucesso!', 'Pagamento confirmado! Faça login.', 'success');
                    // Remove os parâmetros da URL para ficar limpo
                    window.history.replaceState({}, document.title, "indexT1.html");
                    openModal('login');
                } else {
                    showMsg('Atenção', 'Pagamento ainda não confirmado.', 'error');
                }
            })
            .catch(err => console.error(err));
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