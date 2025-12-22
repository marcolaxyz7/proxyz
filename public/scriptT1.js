const API_URL = 'http://localhost:3000/api';
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

        // 2. FUNÇÕES DE MODAL
        function showMsg(title, text, type='info') {
            document.getElementById('msgTitle').innerText = title;
            document.getElementById('msgText').innerText = text;
            const icon = document.getElementById('msgIcon');
            icon.className = 'msg-icon fa-solid ' + (type === 'success' ? 'fa-check-circle msg-success' : type === 'error' ? 'fa-circle-xmark msg-error' : 'fa-circle-exclamation msg-info');
            document.getElementById('msgModal').style.display = 'flex';
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

        // 3. NAVEGAÇÃO DE PAGAMENTO
        function resetPaymentView() {
            // Esconde todas as telas
            document.getElementById('pay-options').style.display = 'block';
            document.getElementById('pay-pix').style.display = 'none';
            document.getElementById('pay-card').style.display = 'none';
            document.getElementById('pay-stripe').style.display = 'none'; // Novo

            // Reseta Checkboxes e Botões para garantir segurança
            document.getElementById('legalCheckPix').checked = false;
            document.getElementById('btn-finish-pix').disabled = true;

            document.getElementById('legalCheckCard').checked = false;
            if(document.getElementById('form-checkout__submit')) 
                document.getElementById('form-checkout__submit').disabled = true;

            document.getElementById('legalCheckStripe').checked = false;
            document.getElementById('btn-stripe-go').disabled = true;
        }

        function showPixView() {
            document.getElementById('pay-options').style.display = 'none';
            document.getElementById('pay-pix').style.display = 'block';
            generatePixPayment();
        }

        function showCardView() {
            document.getElementById('pay-options').style.display = 'none';
            document.getElementById('pay-card').style.display = 'block';
            if(mp && !cardForm) mountCardForm();
        }

        // NOVA FUNÇÃO: View do Stripe
        function showStripeView() {
            document.getElementById('pay-options').style.display = 'none';
            document.getElementById('pay-stripe').style.display = 'block';
        }

        // Substitua a função startStripeCheckout inteira por esta:
        async function startStripeCheckout() {
            const btn = document.getElementById('btn-stripe-go');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Redirecionando...';
            btn.disabled = true;

            try {
                // 1. Pede ao backend para criar a sessão
                const res = await fetch(`${API_URL}/create-stripe-session`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        userId: currentUserId, 
                        email: currentUserEmail 
                    })
                });

                const data = await res.json();

                if (data.url) {
                    // 2. Redireciona o usuário para a página segura da Stripe
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
                    // 1. Salva o Token
                    localStorage.setItem('token', data.token);
                    
                    // 2. SALVA O NOME DO USUÁRIO (Essa era a linha que faltava)
                    localStorage.setItem('user', JSON.stringify(data.user)); 

                    // 3. Redireciona
                    window.location.href='indexT2.html';
                
                } else if(res.status===403) {
                    currentUserId = data.userId; currentUserEmail = data.email;
                    showMsg('Pagamento Pendente', 'Finalize o pagamento.', 'info');
                    openModal('signup'); switchStep('step-payment'); resetPaymentView();
                } else {
                    showMsg('Erro', data.error, 'error');
                }
            } catch(e) { 
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
                    switchStep('step-payment'); resetPaymentView();
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

        // 6. CARTÃO (BRICK/FORM)
        function mountCardForm() {
            document.getElementById('form-checkout__cardholderEmail').value = currentUserEmail;
            
            cardForm = mp.cardForm({
                amount: "19.90",
                iframe: true,
                form: {
                    id: "form-checkout",
                    cardNumber: { id: "form-checkout__cardNumber" },
                    expirationDate: { id: "form-checkout__expirationDate" },
                    securityCode: { id: "form-checkout__securityCode" },
                    cardholderName: { id: "form-checkout__cardholderName" },
                    issuer: { id: "form-checkout__issuer" },
                    installments: { id: "form-checkout__installments" },
                    identificationType: { id: "form-checkout__identificationType" },
                    identificationNumber: { id: "form-checkout__identificationNumber" },
                    cardholderEmail: { id: "form-checkout__cardholderEmail" },
                },
                callbacks: {
                    onFormMounted: error => { if (error) console.warn("Form Error", error); },
                    onSubmit: event => {
                        event.preventDefault();
                        // Pega os dados seguros
                        const { paymentMethodId, issuerId, amount, token, identificationNumber, identificationType } = cardForm.getCardFormData();
                        
                        // Envia para o backend
                        processCardBackend({
                            token, issuerId, paymentMethodId, amount, 
                            payer: { identification: { type: identificationType, number: identificationNumber } }
                        });
                    },
                    onFetching: (resource) => {
                        const btn = document.getElementById('form-checkout__submit');
                        const txt = btn.innerHTML;
                        btn.innerHTML = 'Processando...'; btn.disabled = true;
                        return () => { btn.disabled = false; btn.innerHTML = txt; };
                    }
                },
            });
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

        async function sendRecoveryEmail() {
    // Substitua 'recoverEmailInput' pelo ID real do input de e-mail no seu modal de recuperação
    // Substitua 'btn-recover' pelo ID do botão que envia
    const emailInput = document.getElementById('recoverEmailInput'); 
    const btn = document.getElementById('btn-recover');
    
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
            // Opcional: fechar modal ou limpar input
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