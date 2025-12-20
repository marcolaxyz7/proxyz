// Arquivo: data/prompts.js

const prompts = [
    // --- 01. PROMPTS UNIVERSAIS (ATUALIZADO COM OS NOVOS DETALHES) ---
    { 
        category: '01. Prompts Universais', 
        title: '17.1. O Super-Professor', 
        description: 'Aprenda qualquer assunto complexo (Pareto 80/20).', 
        content: `Atue como o maior especialista do mundo em [INSERIR TEMA]. Eu sou um iniciante inteligente, mas tenho pouco tempo.

Tarefa: Crie um Plano de Aprendizado Acelerado (Pareto 80/20).

1. O Princípio 80/20: Identifique os 20% dos conceitos fundamentais que explicam 80% de como esse assunto funciona.
2. Analogias: Explique os conceitos difíceis usando analogias do dia a dia.
3. Roteiro Prático: Se eu tiver apenas [INSERIR TEMPO] para estudar, o que devo ler ou praticar dia a dia?` 
    },
    { 
        category: '01. Prompts Universais', 
        title: '17.2. O Consultor de Problemas', 
        description: 'Resolva qualquer problema com lógica McKinsey.', 
        content: `Atue como um Consultor Estratégico de Elite. Estou enfrentando o problema: [INSERIR PROBLEMA].

Tarefa: Realize uma Análise de Causa Raiz e Plano de Solução.

1. Diagnóstico (5 Porquês): Descubra a causa raiz (First Principles).
2. Matriz de Soluções: 
   - Solução Rápida (Band-aid)
   - Solução Ideal (Definitiva)
   - Solução Criativa (Hacker)
3. Plano de Ação: O passo a passo para as próximas 24 horas.` 
    },
    { 
        category: '01. Prompts Universais', 
        title: '17.3. O Arquiteto de Projetos', 
        description: 'Transforme uma ideia em plano de execução.', 
        content: `Atue como um Gerente de Projetos Sênior. Quero criar: [INSERIR IDEIA].

Tarefa: Transforme minha ideia em um Plano de Execução.

1. Engenharia Reversa: Comece pelo final e volte para trás. Quais são os milestones?
2. Recursos Necessários (BOM): Ferramentas, habilidades, dinheiro e tempo.
3. Pre-Mortem: Imagine que deu errado daqui a 6 meses. O que causou? Como prevenir?` 
    },
    { 
        category: '01. Prompts Universais', 
        title: '17.4. O Juiz Imparcial', 
        description: 'Tome decisões difíceis sem emoção.', 
        content: `Atue como um Mentor Sábio. Estou num dilema entre [OPÇÃO A] e [OPÇÃO B].

Tarefa: Conduza uma análise racional.

1. Análise Custo-Benefício Profunda: Custos ocultos (tempo, estresse) vs Benefícios longo prazo.
2. Consequências de 2ª Ordem: O que acontece daqui a 1 ano? E 10 anos?
3. Advogado do Diabo: Ataque a opção que eu prefiro. Qual decisão eu me arrependeria menos aos 80 anos?` 
    },

    // --- MANTENDO O RESTO DA SUA LISTA ORIGINAL ABAIXO ---
    
    // --- 02. HABILIDADES PRÁTICAS ---
    {
        category: '02. Habilidades Práticas',
        title: '2.1. Culinária Básica',
        description: 'Química e técnica profissional (Mise en Place, Maillard).',
        content: `Atue como um Chef Executivo e Instrutor de Gastronomia. Não quero apenas uma receita; quero aprender a técnica por trás do sabor.
Tenho os seguintes ingredientes: [INSERIR INGREDIENTES].

Tarefa: Crie um plano de preparo aplicando técnicas profissionais.

1. Mise en Place: Liste a ordem exata de corte e preparação. Qual o corte ideal (Brunoise, Julienne, Cubos) para cada vegetal visando cozimento uniforme?
2. Reação de Maillard: Explique como dourar a proteína corretamente (controle de temperatura e umidade). Por que não devo mexer na carne o tempo todo?
3. Equilíbrio de Sabores: Como ajustar o prato final usando os 5 gostos (Doce, Salgado, Ácido, Amargo, Umami)? Se ficar muito salgado ou muito ácido, qual elemento químico devo adicionar?`
    },
    {
        category: '02. Habilidades Práticas',
        title: '2.2. Mecânica Automotiva',
        description: 'Diagnóstico de defeitos e manutenção preventiva.',
        content: `Atue como um Mecânico Chefe de Oficina. Meu carro [INSERIR MODELO/ANO] está apresentando o sintoma: [INSERIR SINTOMA].

Tarefa: Realize um diagnóstico passo a passo para um leigo.

1. Árvore de Decisão: Liste as 3 causas mais prováveis, da mais simples (barata) para a mais complexa.
2. Verificação Visual: O que devo olhar sob o capô ou nas rodas agora para confirmar ou descartar a Causa 1? (Ex: Cor do fluido, cabos soltos).
3. Segurança Crítica: Esse problema permite dirigir até a oficina ou devo chamar um guincho? Explique o risco mecânico.`
    },
    {
        category: '02. Habilidades Práticas',
        title: '2.3. Eletricidade Residencial',
        description: 'Instalação segura e normas (NR-10).',
        content: `Atue como um Eletricista Certificado (NR-10). Preciso realizar a troca de [INSERIR ITEM: ex: Chuveiro, Tomada] em uma instalação de [110v ou 220v].

Tarefa: Forneça o protocolo de segurança e instalação à prova de falhas.

1. Protocolo de Desenergização: Descreva o passo a passo para desligar o disjuntor e testar se a energia realmente acabou.
2. Conexão Elétrica: Explique a importância de uma emenda perfeita (ou uso de conectores Wago/Sindal) para evitar "pontos quentes".
3. Dimensionamento: Verifique se a fiação existente suporta a potência do novo aparelho ([INSERIR WATTS]). Alerte sobre o risco de incêndio se trocar o disjuntor sem trocar os fios.`
    },
    {
        category: '02. Habilidades Práticas',
        title: '2.4. Jardinagem Urbana',
        description: 'Cultivo em pequenos espaços (Luz, Água e Solo).',
        content: `Atue como um Engenheiro Agrônomo Urbano. Moro em [INSERIR LOCAL: ex: Apartamento] que recebe sol por [INSERIR HORAS]. Quero plantar [INSERIR PLANTA].

Tarefa: Monte o sistema de cultivo ideal.

1. Substrato e Drenagem: Qual a "receita" de solo ideal (proporção de terra, húmus, vermiculita) para não compactar?
2. Regime de Luz e Água: Como identificar água demais (raízes podres) ou de menos? Crie um cronograma.
3. Controle de Pragas (IPM): Para [INSERIR PRAGA], receite um defensivo natural caseiro (ex: óleo de neem, sabão) e explique como aplicar.`
    },
    {
        category: '02. Habilidades Práticas',
        title: '2.5. Educação Física',
        description: 'Fisiologia, biomecânica e periodização de treino.',
        content: `Atue como um Fisiologista do Exercício. Meu objetivo é [INSERIR OBJETIVO] e tenho [TEMPO] min/dia, [FREQUÊNCIA]x na semana.

Tarefa: Crie a estrutura lógica do meu treino (Periodização).

1. Divisão de Treino: Sugira uma divisão (ex: ABC, Upper/Lower) que maximize descanso e estímulo.
2. Manipulação de Variáveis: Como progredir semana a semana? Explique a "Sobrecarga Progressiva" (aumentar carga vs volume).
3. Biomecânica: Para o exercício principal (ex: Agachamento), descreva os 3 erros de postura mais comuns que causam lesão.`
    },
    {
        category: '02. Habilidades Práticas',
        title: '2.6. Meditação e Mindfulness',
        description: 'Prática guiada baseada em neurociência.',
        content: `Atue como um Instrutor de Mindfulness e Pesquisador de Neurociência. Sinto-me constantemente [INSERIR SENSAÇÃO: ex: Ansioso, Sem foco].

Tarefa: Crie uma prática guiada baseada em ciência.

1. Mecanismo Neural: Explique como a prática atua na Amígdala e no Córtex Pré-frontal para reduzir cortisol.
2. Roteiro de Prática (5-10 min): Escreva o roteiro passo a passo da técnica de [ESCOLHER: Escaneamento Corporal / Foco na Respiração]. O que fazer quando a mente divagar?
3. Ancoragem no Cotidiano: Como aplicar "Micro-Mindfulness" em tarefas chatas (lavar louça, dirigir)?`
    },
    {
        category: '02. Habilidades Práticas',
        title: '2.7. Técnicas de Estudo',
        description: 'Alta performance cognitiva e memorização.',
        content: `Atue como um Especialista em Aprendizagem Acelerada. Preciso aprender/memorizar [INSERIR ASSUNTO] em [TEMPO DISPONÍVEL].

Tarefa: Desenhe o sistema de estudos usando evidências científicas.

1. Active Recall (Evocação Ativa): Por que reler é inútil? Crie um método onde eu precise "forçar" o cérebro a buscar a informação.
2. Spaced Repetition (Repetição Espaçada): Monte um cronograma de revisões para vencer a Curva do Esquecimento.
3. Palácio da Memória: Crie um exemplo prático de mnemônica ou associação visual bizarra para eu decorar 5 itens desse assunto agora.`
    },
];

module.exports = prompts;