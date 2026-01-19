const API_URL = '/api';
let allPrompts = [];

// --- SONS DO SISTEMA ---
const audioSuccess = new Audio('success.wav');
const audioError = new Audio('error.wav');
audioSuccess.volume = 0.5;
audioError.volume = 0.5;

// --- MAPA DE ÍCONES ---
const categoryIcons = {
    'Prompts Universais': 'fa-earth-americas',
    'Habilidades Práticas': 'fa-toolbox',
    'Eng. Software & Full Stack': 'fa-code',
    'Data Science & Analytics': 'fa-chart-pie',
    'Mkt Digital & Creator': 'fa-hashtag',
    'Engajamento': 'fa-comments',
    'Carreira & Idiomas': 'fa-briefcase',
    'Alta Performance': 'fa-bolt',
    'Futurismo & Inovação': 'fa-robot',
    'Ciências Exatas & Lógica': 'fa-calculator',
    'Ciências Naturais': 'fa-leaf',
    'Biologia & Saúde': 'fa-heart-pulse',
    'Linguagens & Comunicação': 'fa-language',
    'Humanas & Sociedade': 'fa-users',
    'Direito & Política': 'fa-scale-balanced',
    'Economia & Negócios': 'fa-chart-line',
    'Tecnologia & Digital': 'fa-microchip',
    'Artes & Cultura': 'fa-palette',
    'Criação de Games': 'fa-gamepad'
};

// --- FUNÇÕES DE MENSAGEM ---
function showMsg(title, text, type = 'info') {
    const modal = document.getElementById('msgModal');
    const icon = document.getElementById('msgIcon');
    if(!modal) return;

    document.getElementById('msgTitle').innerText = title;
    document.getElementById('msgText').innerText = text;

    icon.className = 'msg-icon fa-solid';
    icon.classList.remove('msg-success', 'msg-error', 'msg-info', 'fa-check-circle', 'fa-circle-xmark', 'fa-circle-exclamation');

    if (type === 'success') {
        icon.classList.add('fa-check-circle', 'msg-success');
        audioSuccess.currentTime = 0;
        audioSuccess.play().catch(e => {});
    } else if (type === 'error') {
        icon.classList.add('fa-circle-xmark', 'msg-error');
        audioError.currentTime = 0;
        audioError.play().catch(e => {});
    } else {
        icon.classList.add('fa-circle-exclamation', 'msg-info');
    }

    modal.style.display = 'flex';
}
function closeMsgModal() { 
    const modal = document.getElementById('msgModal');
    if(modal) modal.style.display = 'none'; 
}

// --- LOGOUT ---
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'indexT1.html';
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Acesso Negado.');
        window.location.href = 'indexT1.html';
        return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && document.getElementById('userName')) {
        document.getElementById('userName').innerText = user.name;
    }

    // Carrega dados
    loadPrompts(token);
    setupSecureVideo(token);
});

// --- VÍDEO/ÁUDIO SEGURO ---
function setupSecureVideo(token) {
    const video = document.getElementById('videoPlayer');
    const audio = document.getElementById('audioPlayer');

    if (video && token) video.src = `${API_URL}/video-tutorial?token=${token}`;
    if (audio && token) audio.src = `${API_URL}/audio-tutorial?token=${token}`;

    if (video && audio) {
        video.onplay = () => { audio.play(); };
        video.onpause = () => { audio.pause(); };
        video.onseeking = () => { audio.currentTime = video.currentTime; };
        video.onseeked = () => { audio.currentTime = video.currentTime; };
        video.onended = () => { audio.pause(); audio.currentTime = 0; };
        video.onvolumechange = () => {
            if(video.muted) audio.muted = true;
            else { audio.muted = false; audio.volume = video.volume; }
        };
    }
}

// --- CORE: CARREGAR DADOS ---
async function loadPrompts(token) {
    try {
        const res = await fetch(`${API_URL}/prompts`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error('Falha ao buscar prompts');
        
        allPrompts = await res.json();
        
        renderSidebarCategories();
        renderPrompts(allPrompts);

    } catch (err) {
        console.error(err);
        if (err.message.includes('403') || err.message.includes('401')) logout();
    }
}

function renderSidebarCategories() {
    const container = document.getElementById('category-list');
    container.innerHTML = ''; 

    const categories = [...new Set(allPrompts.map(p => p.category))].sort();

    categories.forEach(cat => {
        const cleanName = cat.replace(/^\d+\.\s+/, ''); 
        const iconClass = categoryIcons[cleanName] || 'fa-folder';

        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${cleanName}`;
        
        // Agora só chamamos o filtro. O filtro cuidará de fechar o menu.
        btn.onclick = () => filterByCategory(cat, btn);
        
        container.appendChild(btn);
    });
}

function renderPrompts(promptsList) {
    const grid = document.getElementById('promptsGrid');
    const countSpan = document.getElementById('prompt-count');
    if(!grid) return;
    
    grid.innerHTML = ''; 
    if(countSpan) countSpan.innerText = `${promptsList.length} Prompts`;

    if(promptsList.length === 0) {
        grid.innerHTML = '<p style="color:#666; grid-column: 1/-1; text-align:center; padding: 40px;">Nenhum prompt encontrado.</p>';
        return;
    }

    promptsList.forEach(prompt => {
        const card = document.createElement('div');
        card.className = 'dash-card'; 
        
        const cleanCategoryName = prompt.category.replace(/^\d+\.\s+/, '');
        const iconClass = categoryIcons[cleanCategoryName] || 'fa-folder';

        card.innerHTML = `
            <h3 style="margin-top: 10px;">
                <i class="fa-solid ${iconClass}" style="margin-right: 8px; color: #e50914;"></i>
                ${prompt.title}
            </h3>
            <p style="color:#888; font-size:0.9rem; margin-bottom:15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${prompt.description}</p>
        `;

        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar Prompt';
        btn.onclick = function() {
            copyToClipboard(prompt.content);
            logCopyAction(prompt.id); 
        };

        card.appendChild(btn);
        grid.appendChild(card);
    });
}

    function filterByCategory(category, btnElement) {
    switchView('indexT2');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    const displayTitle = category === 'all' ? 'TODOS OS PROMPTS' : category.replace(/^\d+\.\s+/, '').toUpperCase();
    const titleEl = document.getElementById('page-title');
    if(titleEl) titleEl.innerText = displayTitle;
    
    if (category === 'all') renderPrompts(allPrompts);
    else renderPrompts(allPrompts.filter(p => p.category === category));
    
    const searchInp = document.getElementById('searchInput');
    if(searchInp) searchInp.value = '';

    // --- CORREÇÃO: FECHAMENTO FORÇADO ---
    // Remove a classe .active diretamente, sem perguntar se já tem.
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('menu-overlay');
        if(sidebar) sidebar.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
    }
}

function searchPrompts() {
    const inp = document.getElementById('searchInput');
    if(!inp) return;
    const term = inp.value.toLowerCase();
    
    const filtered = allPrompts.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.content.toLowerCase().includes(term)
    );
    renderPrompts(filtered);
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const titleEl = document.getElementById('page-title');
    if(titleEl) titleEl.innerText = 'RESULTADOS DA BUSCA';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showMsg('Sucesso', 'Copiado para a área de transferência!', 'success');
    });
}

function switchView(viewId, btn) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('view-' + viewId);
    if(target) target.classList.add('active');
    
    if(btn) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    // --- CORREÇÃO: FECHAMENTO FORÇADO ---
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('menu-overlay');
        if(sidebar) sidebar.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
    }
}

async function logCopyAction(promptId) {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
        await fetch(`${API_URL}/log-copy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ promptId })
        });
    } catch (e) { console.error("Erro log copy", e); }
}

// --- MENU MOBILE (TOGGLE) ---
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('menu-overlay');
    if(sidebar) sidebar.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
}

// Event Listeners Mobile
const ovl = document.getElementById('menu-overlay');
if(ovl) ovl.addEventListener('click', toggleMobileMenu);