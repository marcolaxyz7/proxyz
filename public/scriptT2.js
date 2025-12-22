const API_URL = 'http://localhost:3000/api';
let allPrompts = []; 

// --- MAPA DE ÍCONES (Configuração Visual) ---
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
    if (type === 'success') icon.classList.add('fa-check-circle', 'msg-success');
    else if (type === 'error') icon.classList.add('fa-circle-xmark', 'msg-error');
    else icon.classList.add('fa-circle-exclamation', 'msg-info');

    modal.style.display = 'flex';
}
function closeMsgModal() { document.getElementById('msgModal').style.display = 'none'; }

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
    if (user) document.getElementById('userName').innerText = user.name;

    loadPrompts(token);
});

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

// --- RENDERIZAÇÃO DA SIDEBAR (ATUALIZADA) ---
function renderSidebarCategories() {
    const container = document.getElementById('category-list');
    container.innerHTML = ''; 

    // 1. Pega categorias e ordena (Mantém o número "01.", "02." para a ordem ficar certa)
    const categories = [...new Set(allPrompts.map(p => p.category))].sort();

    categories.forEach(cat => {
        // 2. Limpa o nome para exibição (Remove "01. ", "02. ")
        const cleanName = cat.replace(/^\d+\.\s+/, ''); 
        
        // 3. Escolhe o ícone certo
        const iconClass = categoryIcons[cleanName] || 'fa-folder';

        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        // Exibe o Ícone Personalizado + Nome Limpo
        btn.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${cleanName}`;
        
        // O filtro continua usando a categoria original (cat) para achar os itens certos
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
        
        // 1. Limpa o nome da categoria para achar o ícone certo
        const cleanCategoryName = prompt.category.replace(/^\d+\.\s+/, '');

        // 2. Busca o ícone no mapa
        const iconClass = categoryIcons[cleanCategoryName] || 'fa-folder';

        // 3. Monta o HTML: SEM badge, COM ícone no título
        // Adicionei uma cor (color: #e50914) no ícone para dar destaque, mas você pode tirar se quiser.
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
        };

        card.appendChild(btn);
        grid.appendChild(card);
    });
}

// --- FILTROS ---
function filterByCategory(category, btnElement) {

    switchView('indexT2');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    // Atualiza o Título da Página (Sem o número também)
    const displayTitle = category === 'all' ? 'TODOS OS PROMPTS' : category.replace(/^\d+\.\s+/, '').toUpperCase();
    document.getElementById('page-title').innerText = displayTitle;
    
    if (category === 'all') {
        renderPrompts(allPrompts);
    } else {
        const filtered = allPrompts.filter(p => p.category === category);
        renderPrompts(filtered);
    }
    
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