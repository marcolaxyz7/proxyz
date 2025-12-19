const API_URL = 'http://localhost:3000/api';

        // --- FUNÇÕES DO MODAL (PRECISAM ESTAR AQUI TAMBÉM) ---
        function showMsg(title, text, type = 'info') {
            const modal = document.getElementById('msgModal');
            const icon = document.getElementById('msgIcon');
            const titleEl = document.getElementById('msgTitle');
            const textEl = document.getElementById('msgText');

            titleEl.innerText = title;
            textEl.innerText = text;

            icon.className = 'msg-icon fa-solid';
            if (type === 'success') icon.classList.add('fa-check-circle', 'msg-success');
            else if (type === 'error') icon.classList.add('fa-circle-xmark', 'msg-error');
            else icon.classList.add('fa-circle-exclamation', 'msg-info');

            modal.style.display = 'flex';
        }

        function closeMsgModal() {
            document.getElementById('msgModal').style.display = 'none';
        }

        // --- VERIFICAÇÃO DE SEGURANÇA ---
        document.addEventListener('DOMContentLoaded', () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                alert('Acesso Negado: Você precisa estar logado.');
                window.location.href = 'indexT1.html';
                return;
            }

            // Carrega nome do usuário
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                document.querySelector('.user-info span').innerText = user.name;
            }

            // Carrega os Prompts
            loadPrompts(token);
        });

        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'indexT1.html';
        }

        // --- LÓGICA DO DASHBOARD ---
        async function loadPrompts(token) {
            try {
                const res = await fetch(`${API_URL}/prompts`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (!res.ok) throw new Error('Falha ao buscar prompts');
                
                const prompts = await res.json();
                renderPrompts(prompts);

            } catch (err) {
                console.error(err);
                if (err.message.includes('403') || err.message.includes('401')) {
                    logout();
                }
            }
        }

        function renderPrompts(prompts) {
            const grid = document.querySelector('.dash-grid');
            grid.innerHTML = ''; 

            prompts.forEach(prompt => {
                const card = document.createElement('div');
                card.className = 'dash-card';
                card.style.userSelect = 'none'; 
                
                card.innerHTML = `
                    <span class="card-badge">${prompt.category.toUpperCase()}</span>
                    <h3>${prompt.title}</h3>
                    <p style="color:#888; font-size:0.9rem; height:40px; overflow:hidden;">${prompt.description}</p>
                    <button class="copy-btn" onclick="copyToClipboard(this, '${prompt.content.replace(/'/g, "\\'")}')">
                        <i class="fa-solid fa-copy"></i> Copiar Prompt
                    </button>
                `;
                grid.appendChild(card);
            });
        }

        function copyToClipboard(btn, text) {
            navigator.clipboard.writeText(text).then(() => {
                showMsg('Copiado!', 'Prompt transferido para a área de transferência.', 'success');
            });
        }

        function switchView(viewId, btnElement) {
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

            if(btnElement) btnElement.classList.add('active');
            document.getElementById('view-' + viewId).classList.add('active');

            const title = document.getElementById('page-title');
            if(viewId === 'dashboard') title.innerText = 'MEUS PROMPTS';
            if(viewId === 'tutorial') title.innerText = 'COMO USAR';
        }