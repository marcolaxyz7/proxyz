const API_URL = 'http://localhost:3000/api';
let allPrompts = [];

// --- SONS DO SISTEMA ---
const audioSuccess = new Audio('success.wav');
const audioError = new Audio('error.wav');
// Ajuste o volume para não assustar o usuário (0.0 a 1.0)
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
    document.getElementById('msgTitle').innerText = title;
    document.getElementById('msgText').innerText = text;

    icon.className = 'msg-icon fa-solid';
    
    // Reseta classes antigas
    icon.classList.remove('msg-success', 'msg-error', 'msg-info', 'fa-check-circle', 'fa-circle-xmark', 'fa-circle-exclamation');

    if (type === 'success') {
        icon.classList.add('fa-check-circle', 'msg-success');
        // Toca o som de sucesso (reseta o tempo para tocar rápido se clicar várias vezes)
        audioSuccess.currentTime = 0;
        audioSuccess.play().catch(e => console.log("Interação necessária para som"));
        
    } else if (type === 'error') {
        icon.classList.add('fa-circle-xmark', 'msg-error');
        // Toca o som de erro
        audioError.currentTime = 0;
        audioError.play().catch(e => console.log("Interação necessária para som"));
        
    } else {
        icon.classList.add('fa-circle-exclamation', 'msg-info');
        // Opcional: Se quiser um som neutro para 'info', adicione aqui
    }

    modal.style.display = 'flex';
}
function closeMsgModal() { document.getElementById('msgModal').style.display = 'none'; }

// --- LOGOUT ---
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'indexT1.html';
}

// --- INICIALIZAÇÃO UNIFICADA ---
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Acesso Negado.');
        window.location.href = 'indexT1.html';
        return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) document.getElementById('userName').innerText = user.name;

    // 1. Carrega os Prompts
    loadPrompts(token);

    // 2. Configura o Vídeo e Áudio Seguro
    setupSecureVideo(token);
});

// --- FUNÇÃO DE VÍDEO/ÁUDIO SEGURO ---
function setupSecureVideo(token) {
    const video = document.getElementById('videoPlayer');
    const audio = document.getElementById('audioPlayer');

    if (video && token) {
        // Define o source com o token
        video.src = `${API_URL}/video-tutorial?token=${token}`;
    }

    if (audio && token) {
        audio.src = `${API_URL}/audio-tutorial?token=${token}`;
    }

    // Sincronização
    if (video && audio) {
        video.onplay = () => { audio.play(); };
        video.onpause = () => { audio.pause(); };
        video.onseeking = () => { audio.currentTime = video.currentTime; };
        video.onseeked = () => { audio.currentTime = video.currentTime; };
        video.onended = () => { 
            audio.pause(); 
            audio.currentTime = 0; 
        };
        // Opcional: sincronizar volume
        video.onvolumechange = () => {
            if(video.muted) audio.muted = true;
            else {
                audio.muted = false;
                audio.volume = video.volume;
            }
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

// --- RENDERIZAÇÃO DA SIDEBAR ---
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
        btn.onclick = () => filterByCategory(cat, btn); 
        container.appendChild(btn);
    });
}

function renderPrompts(promptsList) {
    const grid = document.getElementById('promptsGrid');
    const countSpan = document.getElementById('prompt-count');
    
    grid.innerHTML = ''; 
    countSpan.innerText = `${promptsList.length} Prompts`;

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

// --- FILTROS E UTILITÁRIOS ---
function filterByCategory(category, btnElement) {
    switchView('indexT2');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    const displayTitle = category === 'all' ? 'TODOS OS PROMPTS' : category.replace(/^\d+\.\s+/, '').toUpperCase();
    document.getElementById('page-title').innerText = displayTitle;
    
    if (category === 'all') renderPrompts(allPrompts);
    else renderPrompts(allPrompts.filter(p => p.category === category));
    
    document.getElementById('searchInput').value = '';
}

function searchPrompts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allPrompts.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.content.toLowerCase().includes(term)
    );
    renderPrompts(filtered);
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('page-title').innerText = 'RESULTADOS DA BUSCA';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showMsg('Sucesso', 'Copiado para a área de transferência!', 'success');
    });
}

function switchView(viewId, btn) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('view-' + viewId).classList.add('active');
    
    if(btn) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
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
        console.log(`Consumo do prompt ${promptId} registrado.`);
    } catch (e) { console.error("Erro ao registrar cópia", e); }
}