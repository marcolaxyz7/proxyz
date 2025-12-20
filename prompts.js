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


    // --- 03. ENG. SOFTWARE E FULL STACK ---
    {
        category: '03. Eng. Software & Full Stack',
        title: '11.1. Front-end Moderno',
        description: 'Foco: Arquitetura e UX Engineering.',
        content: `Contexto: Atue como um Principal Frontend Engineer. Não quero apenas uma tela bonita; quero uma aplicação robusta, acessível e performática. Estou usando a stack [INSERIR STACK: ex: React com Next.js e Tailwind] para construir [INSERIR PROJETO: ex: Dashboard Financeiro]. Tarefa: Defina a arquitetura do front-end e a estratégia de renderização.

Estratégia de Renderização (SSR vs CSR): Para este tipo de projeto, qual a melhor estratégia: Server-Side Rendering (SSR) para SEO, Client-Side Rendering (CSR) para interatividade, ou Static Site Generation (SSG)? Explique o impacto na performance inicial (Time to First Byte).

Gerenciamento de Estado Complexo: Como evitar o "Prop Drilling" e re-renderizações desnecessárias? Defina a arquitetura de estado: o que deve ficar no Context API, o que exige uma lib global (Redux/Zustand) e o que deve ser apenas estado local.

Acessibilidade (a11y) e Semântica: Como estruturar o HTML e os componentes ARIA para que a aplicação seja navegável por leitores de tela e teclado, cumprindo as diretrizes WCAG?`
    },
    {
        category: '03. Eng. Software & Full Stack',
        title: '11.2. Back-end & Arquitetura',
        description: 'Foco: Escalabilidade e Segurança.',
        content: `Contexto: Atue como um Arquiteto de Software Sênior. Preciso construir o "motor" de uma aplicação que deve ser segura e fácil de escalar. A linguagem escolhida é [INSERIR LINGUAGEM: ex: Node.js, Java Spring, Python] e o sistema lidará com [INSERIR CENÁRIO: ex: Alto volume de transações, Chat em tempo real]. Tarefa: Projete a arquitetura do back-end e a modelagem de dados.

Design de API (REST vs GraphQL): Analise os requisitos de consumo de dados pelos clientes (Mobile/Web). Devemos usar uma arquitetura REST rígida ou GraphQL para flexibilidade? Justifique com base em Overfetching e Underfetching.

Persistência de Dados (SQL vs NoSQL): Considerando a natureza dos dados, devo usar um banco Relacional (Postgres/MySQL) para integridade (ACID) ou NoSQL (MongoDB/DynamoDB) para velocidade de escrita? Como modelar as tabelas/coleções para evitar queries lentas?

Camada de Segurança: Como implementar Autenticação e Autorização robustas (JWT, OAuth2)? Quais middlewares de segurança são obrigatórios para prevenir ataques do OWASP Top 10 (como Injection e XSS)?`
    },
    {
        category: '03. Eng. Software & Full Stack',
        title: '11.3. DevOps & Cloud',
        description: 'Foco: Automação e Infraestrutura.',
        content: `Contexto: Atue como um Engenheiro DevOps/SRE. O código funciona na minha máquina, mas preciso de um pipeline profissional para levar isso à produção na [INSERIR CLOUD: AWS, Azure, Vercel]. Tarefa: Crie o fluxo de CI/CD e a estratégia de infraestrutura.

Pipeline de CI/CD: Desenhe a esteira de automação. Quais verificações (Lint, Testes Unitários, Build de Imagem) devem bloquear um Merge Request? Como automatizar o deploy para Staging e Production?

Containerização Eficiente (Docker): Como escrever um Dockerfile usando Multi-Stage Builds para garantir que a imagem final seja minúscula e segura (sem dependências de desenvolvimento)?

Observabilidade: Depois que o código está no ar, como monitorar a saúde da aplicação? Defina uma estratégia de Logs centralizados e Métricas de performance (CPU, Memória, Latência).`
    },
    {
        category: '03. Eng. Software & Full Stack',
        title: '11.4. Mobile Development',
        description: 'Foco: Experiência Nativa vs Híbrida.',
        content: `Contexto: Atue como um Lead Mobile Developer. Preciso criar um aplicativo para [INSERIR OBJETIVO: ex: Delivery, Rede Social] e tenho restrições de [INSERIR RESTRIÇÃO: ex: Orçamento limitado, Prazo curto, Necessidade de alta performance gráfica]. Tarefa: Defina a tecnologia e a arquitetura do app.

Escolha da Tecnologia: Devemos usar React Native/Flutter (Cross-platform) ou desenvolver nativo (Swift/Kotlin)? Justifique analisando o acesso a recursos do dispositivo (Bluetooth, Câmera, GPS) e a fluidez da animação necessária.

Offline-First: Como arquitetar o app para funcionar sem internet? Explique como sincronizar os dados locais (SQLite/Realm) com o servidor assim que a conexão voltar, lidando com conflitos de dados.

Publicação e Stores: Quais são os requisitos técnicos rígidos da Apple App Store e Google Play Store que devo prever desde o início para evitar rejeição do app?`
    },
    {
        category: '03. Eng. Software & Full Stack',
        title: '11.5. Qualidade de Código',
        description: 'Foco: Manutenibilidade a Longo Prazo.',
        content: `Contexto: Atue como um Tech Lead focado em Clean Code. O projeto está crescendo e ficando difícil de manter. Preciso estabelecer padrões para garantir que o código seja legível por humanos, não apenas máquinas. Tarefa: Crie o guia de estilo e qualidade do projeto.

Princípios SOLID na Prática: Escolha um módulo complexo do sistema e explique como aplicar o Princípio da Responsabilidade Única (SRP) e Inversão de Dependência (DIP) para desacoplar a lógica.

Estratégia de Testes (Pirâmide de Testes): Não temos tempo para testar tudo. Onde devemos focar nossos esforços: Testes Unitários, de Integração ou E2E? Defina a proporção ideal para garantir confiança sem travar o desenvolvimento.

Refatoração Preventiva: Como identificar "Code Smells" (ex: Funções gigantes, muitos parâmetros, código duplicado) e qual a técnica passo-a-passo para refatorar sem quebrar a funcionalidade existente?`
    },
    {
        category: '03. Eng. Software & Full Stack',
        title: '11.6. Web3 e Blockchain',
        description: 'Foco: Descentralização e Segurança de Contratos.',
        content: `Contexto: Atue como um Desenvolvedor Blockchain e Auditor de Smart Contracts. Quero criar uma dApp (Aplicação Descentralizada) para [INSERIR CASO DE USO: ex: Sistema de Votação, Marketplace de NFT] na rede [INSERIR REDE: ex: Ethereum, Solana]. Tarefa: Projete a lógica do contrato inteligente e a integração.

Segurança do Smart Contract: Como prevenir vulnerabilidades clássicas como Reentrancy Attacks e Integer Overflow? Explique os padrões de segurança que devo seguir no código Solidity.

Otimização de Gas: Cada operação na blockchain custa dinheiro. Quais técnicas de otimização de código (ex: tipos de variáveis, loops) devo usar para que a transação seja barata para o usuário final?

Integração Web3: Como conectar o front-end (React) com a Wallet do usuário (Metamask)? Explique o fluxo de assinatura de transações e como lidar com a latência da rede blockchain na interface.`
    },
    {
        category: '03. Eng. Software & Full Stack',
        title: '11.7. System Design',
        description: 'Foco: Alta Escala e Trade-offs.',
        content: `Contexto: Atue como um Arquiteto de Soluções de uma Big Tech. Precisamos desenhar um sistema similar ao [INSERIR SISTEMA: ex: Uber, Twitter, Netflix] que suporte milhões de usuários simultâneos. Tarefa: Desenhe a arquitetura de alto nível focada em disponibilidade e escala.

Escalabilidade Horizontal: Como o sistema deve crescer? Explique o uso de Load Balancers e Auto-scaling Groups para distribuir o tráfego entre múltiplos servidores sem gargalos.

Estratégia de Banco de Dados (Sharding/Partitioning): Um único banco de dados não aguentará a carga. Como dividir os dados (Sharding) entre múltiplos servidores? Qual será a "Chave de Shard" (ex: ID do usuário, Região) e por quê?

Teorema CAP: Em caso de falha de rede entre data centers, o sistema deve priorizar Consistência (dados sempre iguais) ou Disponibilidade (sistema sempre no ar, mesmo com dados antigos)? Justifique a escolha para este negócio específico.`
    },


// --- 04. DATA SCIENCE E ANALYTICS ---
    {
        category: '04. Data Science & Analytics',
        title: '12.1. Python para Análise de Dados',
        description: 'Foco: Performance e Limpeza.',
        content: `Contexto: Atue como um Cientista de Dados Sênior. Tenho um dataset sujo e volumoso sobre [INSERIR TEMA: ex: Vendas de Varejo, Log de Servidor, Dados Financeiros]. O código atual cheio de loops for está lento e ilegível. Tarefa: Otimize o script de tratamento de dados e faça a Análise Exploratória (EDA).

Pandas Avançado e Vetorização: Reescreva a lógica de manipulação para eliminar iterações manuais. Como usar .apply(), .groupby() e operações vetoriais para que o processamento seja instantâneo?

Limpeza e Inputação: O dataset tem valores nulos e outliers. Qual a estratégia estatística correta para lidar com eles (Inputação pela média/mediana ou remoção)? Justifique para não enviesar a análise.

Análise Exploratória (EDA): Quais perguntas devemos fazer aos dados primeiro? Identifique correlações ocultas e padrões de sazonalidade que podem gerar insights de negócio imediatos antes mesmo de criar modelos.`
    },
    {
        category: '04. Data Science & Analytics',
        title: '12.2. Machine Learning',
        description: 'Foco: Modelagem Preditiva e Generalização.',
        content: `Contexto: Atue como um Machine Learning Engineer. Precisamos prever [INSERIR OBJETIVO: ex: Churn de Clientes, Preço de Imóveis, Fraude] com base em dados históricos. Não quero apenas acurácia; quero um modelo que funcione no mundo real. Tarefa: Desenhe a estratégia de modelagem e validação.

Seleção de Algoritmo: Para este tipo de problema (Classificação/Regressão) e volume de dados, devemos começar com modelos simples (Regressão Linear/Logística) ou ir direto para complexos (XGBoost/Redes Neurais)? Discuta o trade-off entre performance e interpretabilidade.

Estratégia de Validação (Cross-Validation): Como garantir que o modelo não decorou os dados (Overfitting)? Defina a estratégia de separação de Treino/Teste/Validação e como evitar o vazamento de dados (Data Leakage).

Métricas de Negócio: A "Acurácia" pode enganar. Para este problema, devemos priorizar Precisão (evitar falsos positivos) ou Recall (evitar falsos negativos)? Traduza isso para o impacto financeiro.`
    },
    {
        category: '04. Data Science & Analytics',
        title: '12.3. Visualização de Dados',
        description: 'Foco: Data Storytelling.',
        content: `Contexto: Atue como um Especialista em Data Visualization e BI. Tenho que apresentar os resultados da análise para [INSERIR PÚBLICO: ex: CEO, Time de Marketing, Investidores]. Eles não entendem estatística, apenas resultados. Tarefa: Crie o roteiro da apresentação (Data Storytelling).

Narrativa Visual: Não jogue gráficos na tela. Qual é a história? Começamos pelo problema, mostramos a tendência e finalizamos com a recomendação. Estruture esse arco narrativo.

Escolha do Gráfico Correto: Para mostrar a comparação de [VARIÁVEL A] com [VARIÁVEL B], qual visualização tem menor carga cognitiva (Barra, Linha, Scatter Plot)? Por que evitar gráficos de pizza/pizza 3D aqui?

Design de Dashboard: Se formos criar um painel interativo (PowerBI/Tableau), como aplicar a regra Z ou F de leitura para destacar os KPIs mais importantes logo de cara?`
    },
    {
        category: '04. Data Science & Analytics',
        title: '12.4. Engenharia de Dados',
        description: 'Foco: Pipeline e Confiabilidade.',
        content: `Contexto: Atue como um Engenheiro de Dados Sênior. Os dados estão espalhados em [INSERIR FONTES: ex: Excel, API de CRM, Banco SQL] e precisam chegar limpos para o time de análise. Tarefa: Arquitetar o pipeline de dados (ETL/ELT).

Arquitetura do Pipeline: Devemos fazer ETL (Transformar antes de carregar) ou ELT (Carregar tudo e transformar no destino)? Justifique com base na necessidade de dados históricos brutos.

Data Quality: O pipeline quebra se o dado vier errado. Quais testes automatizados de qualidade (ex: schema validation, checagem de nulos, unicidade de IDs) devemos implementar em cada etapa?

Armazenamento (Lake vs Warehouse): Para este cenário, os dados devem ir para um Data Lake (S3 - arquivos brutos) ou Data Warehouse (Snowflake/BigQuery - tabelas estruturadas)?`
    },
    {
        category: '04. Data Science & Analytics',
        title: '12.5. Estatística Aplicada a Negócios',
        description: 'Foco: Testes A/B e Decisão.',
        content: `Contexto: Atue como um Product Analyst. Lançamos uma nova funcionalidade/preço e queremos saber se ela realmente melhorou a conversão ou se foi sorte. Temos dados do Grupo Controle e Grupo Teste. Tarefa: Planejar e analisar o Teste A/B.

Definição de Hipótese e Amostra: Antes de começar, qual o tamanho da amostra necessário para ter significância estatística (Poder Estatístico)? Defina a Hipótese Nula (H0) e Alternativa (H1).

Interpretação do P-Valor: O teste terminou. Explique para um gerente não-técnico o que significa o p-valor de 0.03. Isso confirma que a mudança gerou lucro ou apenas que o resultado é estatisticamente diferente?

Correlação vs Causalidade: Observamos que usuários que usam a feature X gastam mais. Isso prova que X causa gasto maior? Como isolar variáveis de confusão para ter certeza?`
    },
    {
        category: '04. Data Science & Analytics',
        title: '12.6. Ética em IA e Dados',
        description: 'Foco: Responsabilidade e Viés.',
        content: `Contexto: Atue como um Especialista em Ética de IA. Estamos implementando um modelo para [INSERIR USO: ex: Aprovação de Crédito, Triagem de Currículos]. Precisamos garantir que ele seja justo e auditável. Tarefa: Realizar uma auditoria de risco algorítmico.

Detecção de Viés (Bias): Como verificar se o dataset histórico carrega preconceitos (ex: gênero, raça, região)? Quais técnicas usaremos para balancear os dados antes do treino?

Explicabilidade (XAI): O modelo é uma "caixa preta". Como usar ferramentas como SHAP ou LIME para explicar por que o modelo negou crédito para a pessoa X? Isso é crucial para compliance legal.

Privacidade (LGPD/GDPR): Como garantir a anonimização dos dados sensíveis durante o treinamento sem destruir a utilidade preditiva do modelo?`
    },
    {
        category: '04. Data Science & Analytics',
        title: '12.7. Big Data',
        description: 'Foco: Volume e Processamento Distribuído.',
        content: `Contexto: Atue como um Arquiteto de Big Data. O volume de dados cresceu para a casa dos Terabytes e o Pandas não carrega mais na memória. Precisamos processar logs de [INSERIR FONTE: ex: IoT, Cliques no Site]. Tarefa: Definir a estratégia de processamento massivo.

Processamento Distribuído (Spark): Explique como migrar a lógica para Apache Spark (PySpark). Como funciona o processamento em cluster e as operações Lazy Evaluation?

Formatos de Arquivo: Por que devemos abandonar o CSV e usar Parquet ou Avro para armazenamento no Data Lake? Explique as vantagens de compressão e leitura colunar.

Particionamento: Como particionar os dados no armazenamento (ex: por Data, por Região) para que as consultas futuras leiam apenas o necessário e economizem custo de processamento?`
    },


    // --- 05. MARKETING DIGITAL & CREATOR ---
    {
        category: '05. Mkt Digital & Creator',
        title: '13.1. Branding Pessoal',
        description: 'Foco: Autoridade e Diferenciação.',
        content: `Contexto: Atue como um Estrategista de Personal Branding. Eu sou um profissional da área de [INSERIR ÁREA: ex: Nutrição, Design, Advocacia] e quero deixar de ser visto como uma "commodity" para me tornar uma autoridade premium. Tarefa: Desenvolva minha plataforma de marca e posicionamento.

Arquétipo e Tom de Voz: Com base na minha personalidade (mais sério/técnico ou mais acessível/divertido), qual Arquétipo de Jung (ex: O Sábio, O Rebelde, O Cuidador) devo adotar? Como isso se traduz na minha comunicação visual e verbal?

Proposta Única de Valor (USP): O mercado está saturado. Qual é o meu "Mecanismo Único"? O que eu ofereço ou como eu entrego que me diferencia drasticamente dos concorrentes genéricos?

Pilares de Conteúdo: Defina os 3 temas centrais (Editorias) que vão sustentar minha autoridade. Como equilibrar conteúdo técnico (para gerar respeito) com conteúdo de bastidores/lifestyle (para gerar conexão e confiança)?`
    },
    {
        category: '05. Mkt Digital & Creator',
        title: '13.2. Copywriting',
        description: 'Foco: Psicologia e Conversão.',
        content: `Contexto: Atue como um Copywriter de Resposta Direta (Direct Response). Preciso escrever a carta de vendas (ou script de vídeo/VSL) para vender [INSERIR PRODUTO: ex: Curso de Inglês, Consultoria Financeira]. O público está cético e cansado de promessas vazias. Tarefa: Estruture o texto persuasivo usando neurociência e gatilhos mentais.

A Grande Ideia (Big Idea) e Gancho: Como capturar a atenção nos primeiros 3 segundos (Pattern Interrupt)? Qual é a promessa ousada, mas crível, que fará a pessoa parar de rolar o feed?

Quebra de Objeções e Agitação: Antes de falar da solução, como descrever a dor do cliente melhor do que ele mesmo (Empatia Tática)? Liste as 3 principais objeções universais (não tenho tempo, não tenho dinheiro, não funciona pra mim) e como matá-las no texto.

Oferta Irresistível: Não venda apenas o produto. Construa a oferta. Como empilhar bônus, garantias de risco zero e ancoragem de preço para fazer o valor parecer 10x maior que o custo?`
    },
    {
        category: '05. Mkt Digital & Creator',
        title: '13.3. Tráfego Pago e Orgânico',
        description: 'Foco: Aquisição e Distribuição.',
        content: `Contexto: Atue como um Gestor de Tráfego e Estrategista de Distribuição. Tenho uma verba de [INSERIR ORÇAMENTO] e meu objetivo é [INSERIR META: Leads Qualificados, Venda Direta, Seguidores]. Tarefa: Crie o plano de mídia e distribuição.

Seleção de Canais (Intenção vs. Atenção): Devo focar em Google Ads (Fundo de funil/Intenção de compra) ou Meta Ads/TikTok (Topo de funil/Descoberta)? Defina o mix de investimento ideal para este estágio do negócio.

Estratégia de Criativos: O que funciona hoje? Descreva 3 conceitos de anúncios (ex: Depoimento, Demonstração de Produto, "Nós vs Eles") que tendem a ter CTR alto para este nicho.

Segmentação e Retargeting: Não quero queimar dinheiro. Como estruturar os públicos (Lookalike, Interesses, Públicos Personalizados)? Desenhe a jornada de remarketing para quem visitou a página mas não comprou.`
    },
    {
        category: '05. Mkt Digital & Creator',
        title: '13.4. Marketing de Conteúdo',
        description: 'Foco: Retenção e Funil.',
        content: `Contexto: Atue como um Editor-Chefe e Estrategista de Conteúdo. Estou cansado de criar conteúdo que só gera likes mas não paga as contas. Quero crescer no [INSERIR CANAL: Instagram, YouTube, LinkedIn]. Tarefa: Crie um calendário editorial estratégico com foco em conversão.

Funil de Conteúdo: Classifique as pautas em Topo (Viralização/Atração), Meio (Educação/Consciência do Problema) e Fundo (Oferta/Decisão). Qual a proporção ideal (ex: 60/30/10) para o meu momento atual?

Fluxo de Reaproveitamento: Como trabalhar de forma inteligente? Crie um workflow para transformar um conteúdo "Pilar" (ex: Vídeo longo ou Artigo) em 10 micro-conteúdos (Reels, Carrossel, Tweets) para onipresença sem burnout.

Métricas de Vaidade vs. Negócio: Quais métricas devo ignorar e quais devo perseguir? (ex: Salve vs Like, Tempo de Retenção vs Visualizações).`
    },
    {
        category: '05. Mkt Digital & Creator',
        title: '13.5. Funis de Venda Digitais',
        description: 'Foco: Jornada do Cliente.',
        content: `Contexto: Atue como um Arquiteto de Funis. Vendo um produto de ticket [INSERIR VALOR: Baixo/Médio/Alto]. Preciso automatizar o processo de vendas. Tarefa: Desenhe o diagrama do funil de conversão.

Escolha do Modelo de Funil: Para este produto, o ideal é um Funil Perpétuo (venda todo dia), um Funil de Tripwire (produto barato que leva ao caro) ou um Funil de Aplicação (High Ticket)? Justifique.

Automação de E-mail Marketing: O lead baixou a isca digital. Escreva a estrutura da "Sequência de Novela" (Soap Opera Sequence) de 5 dias para criar conexão e vender o produto principal.

Landing Page de Alta Conversão: Quais são os blocos obrigatórios da página (Headline, VSL, Prova Social, Garantia, FAQ)? Desenhe o wireframe mental da página perfeita.`
    },
    {
        category: '05. Mkt Digital & Creator',
        title: '13.6. Lançamentos de Infoprodutos',
        description: 'Foco: Picos de Venda.',
        content: `Contexto: Atue como um Estrategista de Lançamentos. Estamos preparando o lançamento do [NOME DO PRODUTO]. Temos uma audiência de [TAMANHO DA AUDIÊNCIA]. Tarefa: Planeje o cronograma e a estratégia do evento de lançamento.

Tipo de Lançamento: Devemos fazer um Lançamento Semente (beta), Lançamento Interno (clássico com CPLs/Aulas) ou Meteórico (grupos de WhatsApp)? Explique a escolha baseada no nosso ativo atual.

Antecipação e Narrativa: Como criar o "Buzz" 15 dias antes de abrir o carrinho? Qual será a "Grande Oportunidade" ou o "Inimigo Comum" que unirá a audiência durante o evento gratuito?

Estratégia de Abertura de Carrinho: O que fazer nas primeiras 24h para garantir 50% da meta? E no último dia (fechamento) para ativar o gatilho da escassez real?`
    },
    {
        category: '05. Mkt Digital & Creator',
        title: '13.7. Growth Hacking',
        description: 'Foco: Crescimento Acelerado e Viralidade.',
        content: `Contexto: Atue como um Head of Growth. Temos um produto validado, mas o crescimento está linear. Preciso de estratégias para crescer exponencialmente (Growth Loops) com baixo custo. Tarefa: Proponha experimentos de Growth.

Análise do Funil Pirata (AARRR): Analise as etapas de Aquisição, Ativação, Retenção, Receita e Recomendação. Onde está o gargalo mais provável neste modelo de negócio e qual experimento rápido podemos rodar para destravar?

Viral Loops e Referral: Como incentivar o usuário atual a trazer novos usuários (Member get Member)? Pense em incentivos (descontos, armazenamento extra, status) que sejam baratos para nós, mas valiosos para eles.

Testes de Alta Cadência (ICE Score): Liste 3 ideias de testes rápidos (mudança de copy, novo canal, alteração no onboarding) e classifique-os por Impacto, Confiança e Facilidade (ICE) para priorizar o que fazer na próxima sprint.`
    },


    // --- 06. ENGAJAMENTO ---
    {
        category: '06. Engajamento',
        title: '3. Roteiro para Vídeos Curtos',
        description: 'Foco: Viralidade e Retenção (TikTok/Reels).',
        content: `Contexto: Atue como um Roteirista de Vídeos Virais e Estrategista de Retenção. Quero promover meu produto/marca [INSERIR NICHOS: ex: Meu Jogo, Infoproduto, Loja de Roupas] no TikTok e Reels. O objetivo é parar o "scroll" e fazer a pessoa assistir até o final. Tarefa: Crie scripts baseados em estruturas de alta retenção.

O Gancho (The Hook - 0 a 3s): Escreva 3 opções de ganchos visuais ou verbais que quebrem o padrão. Não use "Oi gente". Use algo que gere curiosidade imediata, polêmica ou identificação (ex: "Pare de fazer isso agora se você quer X").

A Estrutura de Retenção: Desenvolva o corpo do vídeo. Como manter o ritmo acelerado? Indique onde colocar cortes secos (Jump Cuts), B-Rolls (imagens de cobertura) e textos na tela para reter a atenção de quem assiste no mudo.

CTA (Chamada para Ação) Disfarçada: Ninguém gosta de propaganda. Como pedir para seguir ou clicar no link de forma orgânica e integrada ao valor entregue no vídeo, sem parecer um vendedor chato?`
    },
    {
        category: '06. Engajamento',
        title: '4. Engajamento e Algoritmo',
        description: 'Foco: Construção de Comunidade e Sinais.',
        content: `Contexto: Atue como um Especialista em Algoritmos de Social Media. Estou postando, mas meus números estagnaram. Meu nicho é [INSERIR NICHO]. Quero entender o que o algoritmo quer de mim para entregar meu conteúdo para mais pessoas (Efeito Bola de Neve). Tarefa: Audite minha estratégia e defina o plano de crescimento.

Sinais de Engajamento: O que vale mais para o algoritmo hoje: Likes, Salvamentos, Compartilhamentos ou Tempo de Tela? Explique como otimizar meu conteúdo para o sinal mais valioso (ex: criar conteúdo "salvável" para tutoriais ou "compartilhável" para memes/identificação).

Pilares de Conteúdo: Defina 3 linhas editoriais:

Atração (Topo de Funil): Para trazer gente nova (Trends, Curiosidades).

Conexão (Meio de Funil): Para gerar fãs (Bastidores, Opinião Forte).

Conversão (Fundo de Funil): Para vender (Prova Social, Oferta).

Análise de Métricas: Quando eu abrir o Insights, o que devo olhar? Ensine-me a interpretar a "Taxa de Retenção" no gráfico do vídeo. Se as pessoas saem no segundo 5, qual é o problema? E se saem no final, qual é o problema?`
    },



    // --- 07. CARREIRA & IDIOMAS ---
    {
        category: '07. Carreira & Idiomas',
        title: '14.1. Inglês para Tech e Business',
        description: 'Foco: Entrevistas e Dia a Dia.',
        content: `Contexto: Atue como um Tech English Coach especializado em preparar profissionais latinos para vagas na América do Norte e Europa. Meu nível de inglês é [INSERIR NÍVEL: Intermediário/Avançado] e estou me preparando para uma [INSERIR SITUAÇÃO: Entrevista Técnica / Daily Meeting / Apresentação de Projeto] para uma vaga de [INSERIR CARGO]. Tarefa: Prepare-me para a comunicação profissional de alto nível.

Técnica STAR (Entrevistas): Simule as 3 perguntas comportamentais mais difíceis ("Fale sobre um conflito", "Fale sobre um erro"). Ajude-me a estruturar minhas respostas usando o método Situation, Task, Action, Result para que eu soe objetivo e orientado a resultados, e não enrolado.

Vocabulário Técnico Específico: Liste 20 termos e phrasal verbs essenciais para a minha área ([INSERIR ÁREA]) que vão me fazer soar como um nativo da indústria (ex: drill down, circle back, push back, scalability). Dê exemplos de frases.

Suavização (Softening Language): Latinos tendem a ser muito diretos, o que pode soar rude em inglês. Ensine-me a usar "Softening Language" para dar feedbacks negativos ou discordar de um chefe sem parecer agressivo (ex: usar "I was wondering if..." em vez de "You must...").`
    },
    {
        category: '07. Carreira & Idiomas',
        title: '14.2. Tradução e Localização',
        description: 'Foco: Adaptação de Produto.',
        content: `Contexto: Atue como um Gerente de Localização (L10n). Temos um produto digital (App/Site) criado no Brasil e queremos expandi-lo para [INSERIR PAÍS/REGIÃO: ex: EUA, França, China]. Não quero apenas traduzir palavras, quero adaptar a experiência. Tarefa: Crie o guia de localização e internacionalização (i18n).

Transcreation vs. Tradução: Identifique elementos do nosso produto (slogans, cores, imagens, humor) que podem não funcionar ou até ofender a cultura de destino. Como devemos reescrever (transcriar) a mensagem para manter o impacto emocional?

Restrições Técnicas (UI/UX): O texto em Alemão/Francês costuma ser 30% maior que em Inglês/Português. Como adaptar a interface (botões, menus) para evitar quebras de layout? O que fazer com datas, moedas e formatos de números?

Compliance Cultural e Legal: Existem leis específicas de privacidade ou exigências de termos de uso nesse país que diferem do padrão global? O que precisamos alterar no fluxo de cadastro?`
    },
    {
        category: '07. Carreira & Idiomas',
        title: '14.3. Cultura de Trabalho Remoto',
        description: 'Foco: Assincronicidade.',
        content: `Contexto: Atue como um Head of Remote. Acabei de ser contratado por uma empresa Remote-First com o time espalhado por [INSERIR FUSOS: ex: Europa, Ásia, Américas]. Preciso me adaptar para não trabalhar 24h por dia e manter a produtividade. Tarefa: Crie meu manual de etiqueta e produtividade remota.

Comunicação Assíncrona: Como escrever mensagens (Slack/Teams) e documentações que eliminem a necessidade de reuniões? Ensine a estrutura de "Contexto Total" para que um colega na Ásia possa ler e agir enquanto eu durmo, sem precisar me perguntar nada.

Gestão de Fuso Horário: Como negociar horários de reunião justos? Defina estratégias para "janelas de sobreposição" (overlap hours) e como dizer não para reuniões fora do meu horário de trabalho sem parecer descompromissado.

Visibilidade e Confiança: Em um ambiente remoto, "quem não é visto, não é lembrado". Como documentar minhas entregas e fazer "Work in Public" para que a liderança saiba que estou gerando valor, mesmo sem me ver na cadeira?`
    },
    {
        category: '07. Carreira & Idiomas',
        title: '14.4. Nomadismo Digital',
        description: 'Foco: Logística e Legalidade.',
        content: `Contexto: Atue como um Consultor de Estilo de Vida Nômade e Advogado de Imigração. Quero passar [TEMPO: ex: 6 meses] viajando pela [REGIÃO: ex: Sudeste Asiático, Europa] enquanto trabalho remotamente. Tarefa: Planeje a logística e a estratégia legal.

Estratégia de Vistos: Analise as opções de Vistos de Nômade Digital vs. Vistos de Turista para o meu passaporte. Quais são os riscos de trabalhar com visto de turista (grey area) e quais países fiscalizam isso rigorosamente?

Infraestrutura Crítica: Como garantir internet 100% estável para videochamadas? Crie um checklist de verificação de Airbnb/Hotel (ex: pedir print do Speedtest, verificar roteador 5Ghz) e qual o kit de redundância (chips locais, Starlink, powerbank) devo levar.

Rotina e Solidão: O sonho pode virar pesadelo. Crie uma rotina semanal sugerida que equilibre exploração turística com horas de trabalho focado. Como conectar com comunidades locais para evitar o isolamento social?`
    },
    {
        category: '07. Carreira & Idiomas',
        title: '14.5. Networking Internacional',
        description: 'Foco: LinkedIn Global.',
        content: `Contexto: Atue como um Estrategista de Carreira Internacional. Quero ser recrutado por empresas de fora. Meu perfil no LinkedIn precisa atrair recrutadores dos [PAÍS ALVO: ex: EUA, Canadá]. Tarefa: Otimize meu perfil e estratégia de conexão.

Otimização de Perfil (Keywords): Como traduzir meus cargos brasileiros para o equivalente internacional? (ex: Um "Gerente" aqui é um "Manager" ou "Lead" lá?). Quais palavras-chave (Hard Skills) são essenciais no título e resumo para passar nos filtros de ATS dos recrutadores gringos?

Diferenças Culturais de Networking: Nos EUA, o networking é mais transacional; na Europa, mais formal. Como abordar um recrutador ou um par profissional via DM? Escreva 3 scripts de Cold Message que sejam profissionais, diretos e não pareçam spam.

Prova Social Global: Como conseguir recomendações em inglês? Como exibir projetos que tenham relevância internacional (e não apenas local) para validar minha competência?`
    },
    {
        category: '07. Carreira & Idiomas',
        title: '14.6. Recebimento Internacional',
        description: 'Foco: Contabilidade e Câmbio.',
        content: `Contexto: Atue como um Consultor Financeiro para Exportação de Serviços (Brasil). Consegui um contrato PJ (Contractor) pagando em [MOEDA: Dólar/Euro]. Quero maximizar meu ganho líquido e estar 100% legal com a Receita Federal. Tarefa: Estruture meu fluxo financeiro internacional.

Estrutura de Recebimento: Compare as taxas e spreads das principais plataformas (Wise, Payoneer, Husky, Banco Inter). Qual oferece o melhor Custo Efetivo Total (CET) para o meu volume mensal?

Invoice e Contratos: O que deve constar na minha Invoice mensal para que ela seja válida internacionalmente e para a contabilidade no Brasil? Explique a diferença entre ser Contractor direto e ser contratado via EOR (Employer of Record/Deel).

Impostos (Carnê-Leão vs PJ): Explique por que receber como Pessoa Física (Carnê-Leão) costuma ser um erro brutal (27.5% imposto). Simule a carga tributária abrindo uma empresa (Simples Nacional anexo III ou V / Lucro Presumido) com isenção de impostos de exportação (ISS/PIS/COFINS).`
    },



    // --- 08. ALTA PERFORMANCE E BIOHACKING ---
    {
        category: '08. Alta Performance',
        title: '15.1. Higiene do Sono',
        description: 'Foco: Recuperação Profunda e Ciclo Circadiano.',
        content: `Contexto: Atue como um Sleep Coach e Especialista em Cronobiologia. Eu não quero apenas "dormir 8 horas"; quero otimizar a qualidade do meu sono profundo (Deep Sleep) e REM para acordar 100% restaurado. Tenho sentido [INSERIR SINTOMA: ex: Cansaço matinal, Insônia, Acordar no meio da noite]. Tarefa: Crie meu protocolo de otimização do sono.

Ajuste do Ciclo Circadiano: Como usar a exposição à luz (solar e artificial) para "setar" meu relógio biológico? Defina um protocolo de luz para a primeira hora da manhã e para as últimas 2 horas da noite (bloqueio de luz azul).

Termorregulação e Ambiente: A temperatura do corpo precisa cair para o sono acontecer. Qual a temperatura ideal do quarto e quais técnicas (banho quente/frio, ventilação) usar para induzir o sono mais rápido?

Suplementação e Rotina Pré-Sono: Analise a eficácia de suplementos como Magnésio, Melatonina (quando usar e quando não usar) e Glicina. Crie um ritual de desligamento de 60 minutos sem telas.`
    },
    {
        category: '08. Alta Performance',
        title: '15.2. Nutrição Cognitiva',
        description: 'Foco: Clareza Mental e Nootrópicos.',
        content: `Contexto: Atue como um Neuro-Nutricionista. Trabalho com [INSERIR TIPO DE TRABALHO: ex: Programação, Escrita Criativa] e sofro com "Brain Fog" (névoa mental) e queda de energia após o almoço. Quero alimentar meu cérebro, não apenas meu estômago. Tarefa: Desenvolva um plano nutricional para performance cognitiva.

Controle Glicêmico: Explique como os picos de insulina destroem o foco. Quais alimentos devo evitar no café da manhã e almoço para manter a energia estável sem o "crash" da tarde?

Nootrópicos e Suplementos Seguros: Além do café, o que realmente funciona com base em evidências? Analise compostos como Creatina, Ômega-3 (DHA/EPA), L-Teanina e Rhodiola Rosea. Qual a dosagem segura e o efeito esperado?

Hidratação e Eletrólitos: A desidratação leve já derruba o QI. Crie uma estratégia de hidratação que inclua a reposição de sais minerais, especialmente para quem faz trabalho mental intenso.`
    },
    {
        category: '08. Alta Performance',
        title: '15.3. Gestão de Energia',
        description: 'Foco: Ritmos Ultradianos vs. Tempo.',
        content: `Contexto: Atue como um Coach de Alta Performance. Eu sei usar agenda, mas muitas vezes tenho tempo e não tenho vontade ou foco. Quero parar de gerenciar horas e começar a gerenciar minha energia biológica. Tarefa: Reestruture meu dia de trabalho com base na biologia.

Ritmos Ultradianos: O cérebro foca em ciclos de 90 minutos. Como estruturar blocos de "Deep Work" (Trabalho Profundo) seguidos de "Recuperação Ativa"? O que fazer nesses intervalos (que não seja olhar o celular) para recarregar a dopamina?

Cronotipo e Agendamento: Sou [INSERIR CRONOTIPO: ex: Matutino, Vespertino]. Quais tarefas (Criativas vs. Analíticas vs. Administrativas) devo alocar em cada período do dia para surfar na minha onda natural de alerta?

Gestão de Decisões: A "Fadiga de Decisão" é real. Como sistematizar escolhas triviais (roupa, comida) para economizar "bateria mental" para as decisões importantes do trabalho?`
    },
    {
        category: '08. Alta Performance',
        title: '15.4. Controle de Dopamina',
        description: 'Foco: Foco e Motivação (Detox).',
        content: `Contexto: Atue como um Neurocientista Comportamental. Sinto que meu sistema de recompensa está "quebrado" pelo excesso de redes sociais e estímulos rápidos. Tenho dificuldade em focar em tarefas longas e chatas. Tarefa: Crie um protocolo de "Dopamine Detox" e reabilitação do foco.

Neurobiologia do Vício: Explique por que rolar o feed é tão viciante e como isso diminui minha linha de base de dopamina, tornando o trabalho normal "chato".

Protocolo de Jejum de Dopamina: Defina regras para um "Reset" de fim de semana ou diário. O que eliminar radicalmente e o que manter? Como lidar com a abstinência e o tédio (e por que o tédio é crucial para a criatividade)?

Design de Fricção: Como alterar meu ambiente digital (bloqueadores de app, modo cinza, notificações) para tornar o comportamento ruim difícil e o comportamento bom fácil?`
    },
    {
        category: '08. Alta Performance',
        title: '15.5. Resiliência Mental',
        description: 'Foco: Antifragilidade e Estoicismo.',
        content: `Contexto: Atue como um Mentor de Liderança e Filósofo Estoico. Trabalho em um ambiente de alta pressão e incerteza. Fico ansioso com coisas que não controlo e me irrito facilmente. Tarefa: Treine minha mente para a antifragilidade.

Dicotomia do Controle: Diante de um problema [INSERIR PROBLEMA ATUAL], ajude-me a separar estritamente o que depende de mim e o que não depende. Como parar de sofrer pelo que está fora da minha mão?

Reenquadramento Cognitivo (Reframing): Como transformar uma "Ameaça" em um "Desafio"? Use técnicas da Terapia Cognitivo-Comportamental (TCC) para questionar meus pensamentos catastróficos automáticos.

Visualização Negativa (Premeditatio Malorum): Como usar a técnica de "imaginar o pior cenário possível" não para gerar pânico, mas para tirar o medo do desconhecido e me preparar emocionalmente?`
    },
    {
        category: '08. Alta Performance',
        title: '15.6. Ambiente de Alta Performance',
        description: 'Foco: Ergonomia e Flow no Workspace.',
        content: `Contexto: Atue como um Designer de Espaços de Trabalho e Ergonomista. Vou montar/reformar meu Home Office. Quero um ambiente que induza o estado de Flow e proteja minha saúde física a longo prazo. Tarefa: Projete o setup ideal.

Ergonomia Física: Qual a altura correta do monitor, cadeira e mesa para evitar dores nas costas e LER? O trabalho em pé (Standing Desk) vale a pena? Qual a regra para alternar posições?

Iluminação e Ar: A qualidade do ar (CO2) impacta o raciocínio. Como garantir ventilação? Qual o tipo de lâmpada (temperatura de cor/Lux) ideal para foco intenso vs. criatividade relaxada?

Pistas Visuais e Minimalismo: Como organizar a mesa para que ela "grite" o que precisa ser feito? Como eliminar a poluição visual que rouba atenção periférica?`
    },



    // --- 09. FUTURISMO E INOVAÇÃO ---
    {
        category: '09. Futurismo & Inovação',
        title: '16.1. ESG e Sustentabilidade',
        description: 'Foco: Estratégia Real vs Greenwashing.',
        content: `Contexto: Atue como um Chief Sustainability Officer (CSO) de uma multinacional. Quero implementar uma estratégia ESG (Environmental, Social, Governance) para minha empresa/projeto na área de [INSERIR SETOR: ex: Varejo de Moda, Tecnologia, Agronegócio]. Não quero marketing verde; quero viabilidade econômica e impacto real. Tarefa: Desenvolva o plano estratégico de sustentabilidade.

Mercado de Carbono: Explique como funciona a compra e venda de créditos de carbono para o meu setor. É financeiramente viável buscar ser "Carbon Neutral" agora? Quais são as certificações globais que evitam a acusação de Greenwashing?

Economia Circular: Como redesenhar o ciclo de vida do meu produto para que o "lixo" final se torne insumo para um novo ciclo? Dê um exemplo prático de logística reversa que reduza custos operacionais a longo prazo.

Governança e Transparência: Quais métricas (KPIs) devo reportar aos investidores? Utilize frameworks como o GRI ou SASB para definir o que realmente importa medir (ex: consumo de água, diversidade no conselho, emissão de escopo 3).`
    },
    {
        category: '09. Futurismo & Inovação',
        title: '16.2. Economia da Longevidade',
        description: 'Foco: Viver e Trabalhar até os 100.',
        content: `Contexto: Atue como um Demógrafo e Planejador Financeiro de Longo Prazo. A expectativa de vida está indo para 90/100 anos. O modelo "Estudar -> Trabalhar -> Aposentar" quebrou. Tenho [IDADE] anos e atuo como [PROFISSÃO]. Tarefa: Crie meu plano de vida multi-estágio.

Carreira Multi-Estágio: Se vou trabalhar até os 80 anos, como planejar "pausas sabáticas" e "reinvenções de carreira" para não ter burnout aos 50? Desenhe uma linha do tempo onde o aprendizado contínuo (Lifelong Learning) substitui a aposentadoria tradicional.

Reserva Financeira para 100 Anos: A matemática da aposentadoria mudou. Como calcular o "Número da Independência" considerando que precisarei custear saúde de ponta por 30 anos a mais que meus avós?

Oportunidades da Silver Economy: O envelhecimento global cria novos mercados. Identifique 3 oportunidades de negócios ou serviços focados na terceira idade ativa (60+) que estão subatendidos hoje.`
    },
    {
        category: '09. Futurismo & Inovação',
        title: '16.3. Cidades Inteligentes (Smart Cities)',
        description: 'Foco: Urbanismo 5.0 e IoT.',
        content: `Contexto: Atue como um Urbanista Tecnológico e Arquiteto de IoT. Estamos projetando um bairro ou avaliando uma cidade para viver. O foco é qualidade de vida impulsionada por dados, não apenas gadgets espalhados. Tarefa: Analise a infraestrutura de uma Cidade Inteligente.

Mobilidade como Serviço (MaaS): Como integrar transporte público, carros autônomos e micromobilidade (bikes/patinetes) em um único app? Explique como a redução de carros particulares impacta o design urbano (menos estacionamentos, mais parques).

Internet das Coisas (IoT) e Sensores: Quais sensores são críticos para a gestão da cidade (ex: qualidade do ar, lixeiras inteligentes, gestão de tráfego em tempo real)? Como processar esses dados na borda (Edge Computing) para economizar banda?

Privacidade e Vigilância: Existe uma linha tênue entre segurança e "Big Brother". Como desenhar sistemas de câmeras e reconhecimento facial que respeitem a privacidade do cidadão (Anonimização de dados)?`
    },
    {
        category: '09. Futurismo & Inovação',
        title: '16.4. Exploração Espacial (New Space)',
        description: 'Foco: Economia Orbital.',
        content: `Contexto: Atue como um Analista da Indústria Aeroespacial. O espaço deixou de ser apenas governamental (NASA) e virou comercial (SpaceX, Blue Origin). Quero entender onde está o dinheiro nessa nova fronteira. Tarefa: Mapeie as oportunidades da Space Economy.

Internet via Satélite (LEO): Explique o impacto de constelações como a Starlink na conectividade global. Como isso afeta o agronegócio, logística marítima e áreas rurais que antes eram "offline"?

Mineração de Asteroides e Recursos: Isso é ficção ou realidade próxima? Analise a viabilidade e a legalidade (Tratado do Espaço Sideral) de extrair metais raros ou água na Lua/Asteroides para abastecer missões mais longas.

Turismo e Manufatura em Microgravidade: Quais produtos (ex: fibra óptica, órgãos impressos em 3D, cristais farmacêuticos) podem ser fabricados melhor no espaço do que na Terra?`
    },
    {
        category: '09. Futurismo & Inovação',
        title: '16.5. Singularidade e Transhumanismo',
        description: 'Foco: Fusão Homem-Máquina e Ética.',
        content: `Contexto: Atue como um Futurista e Bioeticista. Estamos vendo o avanço de interfaces cérebro-computador (como Neuralink) e IA Geral (AGI). Quero entender as implicações éticas e práticas da fusão biológica com a tecnológica. Tarefa: Explore o cenário da Singularidade.

Interfaces Cérebro-Computador (BCI): Além de curar paralisia, quais são as aplicações futuras para aumento cognitivo (download de habilidades, telepatia digital)? Quais são os riscos de "hackearem" meu cérebro?

Ética da IA e Consciência: Se uma IA atingir a singularidade (superar a inteligência humana em tudo), como garantimos que seus objetivos estejam alinhados com a sobrevivência humana (O problema do alinhamento)?

Desigualdade Biológica: Se apenas os ricos puderem pagar por "upgrades" genéticos ou cibernéticos, criaremos duas espécies humanas? Discuta o cenário sociológico disso.`
    },
    {
        category: '09. Futurismo & Inovação',
        title: '16.6. Futuro do Trabalho',
        description: 'Foco: Coexistência com IA e Renda.',
        content: `Contexto: Atue como um Estrategista de Força de Trabalho. Tenho medo que a automação torne minha profissão obsoleta. Quero me preparar para a era da "Economia sem Emprego" ou do trabalho híbrido IA-Humano. Tarefa: Desenhe o mapa de sobrevivência profissional.

Modelo Centauro (Humano + IA): Em vez de "IA vai me substituir", como posso me tornar um "Centauro" (Alguém que usa a IA para amplificar sua capacidade)? Liste as habilidades exclusivamente humanas (empatia, julgamento ético, criatividade caótica) que a máquina dificilmente copiará nesta década.

Renda Básica Universal (UBI): Se a automação eliminar 40% dos empregos, como a economia gira? Explique os modelos de UBI e Renda Básica Computacional (imposto sobre robôs) que estão sendo discutidos por economistas.

De "Empregos" para "Tarefas": O conceito de "cargo fixo" está morrendo. Como se adaptar à "Gig Economy" de alta performance, onde você vende projetos e habilidades específicas para várias empresas globalmente?`
    },
    {
        category: '09. Futurismo & Inovação',
        title: '16.7. Geopolítica do Futuro',
        description: 'Foco: Guerra Híbrida e Soberania Digital.',
        content: `Contexto: Atue como um Analista de Inteligência Geopolítica. O mundo não gira mais apenas em torno de petróleo e fronteiras físicas. Quero entender as novas guerras invisíveis. Tarefa: Analise o cenário de poder global.

A Guerra dos Chips: Por que semicondutores (Taiwan) são o novo petróleo? Explique como a escassez ou o bloqueio de chips avançados pode paralisar a economia de uma nação inteira.

Soberania de Dados e Splinternet: Estamos caminhando para uma internet fragmentada (Internet Americana vs. Internet Chinesa)? Como isso afeta empresas que querem atuar globalmente?

Ciberguerra e Infraestrutura Crítica: Como nações podem "desligar" outras sem disparar um tiro (ataques a redes elétricas, sistemas bancários)? Como se preparar individualmente para cenários de colapso digital temporário?`
    },


    // --- 10. CIÊNCIAS EXATAS E LÓGICA ---
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.1. Aritmética Básica',
        description: 'Foco: Eficiência Algorítmica e Mental.',
        content: `Contexto: Atue como um Matemático Computacional e especialista em Otimização de Processos. Preciso desenvolver um método de cálculo mental rápido ou uma lógica de script para uma equipe de [INSERIR PROFISSÃO: ex: Comerciantes / Engenheiros de Obra / Traders].

Tarefa: Crie um "Sistema de Aritmética Rápida" personalizado para as operações diárias deste profissional.

Identificação de Padrões: Liste as 5 operações matemáticas mais críticas e repetitivas para um [INSERIR PROFISSÃO].

Técnicas de Simplificação: Para cada operação, desenvolva um atalho mental ou uma fórmula simplificada (ex: decomposição numérica, aproximação percentual) que aumente a velocidade de cálculo em 50% sem perder precisão significativa.

Algoritmo de Verificação: Crie um método de "prova real" rápido (como a técnica dos nove fora ou estimativa de magnitude) para evitar erros grosseiros em situações de pressão.

Aplicação Prática: Demonstre o sistema resolvendo um problema complexo de [INSERIR PROBLEMA ESPECÍFICO: ex: cálculo de troco com múltiplas moedas / estimativa de material por m²].`
    },
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.2. Álgebra Elementar',
        description: 'Foco: Modelagem de Negócios.',
        content: `Contexto: Atue como um Consultor de Modelagem de Negócios. Estou planejando a estrutura financeira de um novo empreendimento: [INSERIR TIPO DE NEGÓCIO: ex: SaaS de Assinatura / Loja de Roupas / Delivery de Comida].

Tarefa: Modele matematicamente a viabilidade deste negócio usando equações algébricas.

Definição de Variáveis: Identifique e nomeie as variáveis independentes (ex: x = número de vendas, y = custo de marketing) e dependentes (Lucro Líquido).

Equação de Custo e Receita: Monte a função de Custo Total C(x) (fixos + variáveis) e a função de Receita R(x).

Ponto de Equilíbrio (Break-even): Desenvolva a inequação que determina o momento exato em que o negócio começa a dar lucro (R(x) > C(x)).

Análise de Sensibilidade: Se eu aumentar o preço do produto em [INSERIR % DE AUMENTO], como isso altera a quantidade necessária de vendas para atingir o equilíbrio? Mostre o cálculo algébrico passo a passo.`
    },
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.3. Geometria Plana',
        description: 'Foco: Otimização de Layout e Espaço.',
        content: `Contexto: Atue como um Arquiteto e Planejador Urbano. Tenho um terreno/espaço com formato [INSERIR FORMATO: ex: Retangular Irregular / Triangular / L-Shape] e área total de [INSERIR METRAGEM] m².

Tarefa: Projete a distribuição espacial mais eficiente para a construção de [INSERIR PROJETO: ex: Estacionamento / Coworking / Depósito Logístico].

Cálculo de Área Útil: Desconte [INSERIR % DE PERDA] para áreas de circulação e paredes. Qual a área líquida disponível?

Maximização de Unidades: Utilizando geometria, determine a disposição (layout) que permite encaixar o maior número possível de [INSERIR UNIDADE: ex: Vagas de Carro / Mesas de Escritório], respeitando as dimensões de [INSERIR MEDIDAS DA UNIDADE].

Comparativo Geométrico: Compare duas configurações diferentes (ex: disposição em 90º vs disposição em 45º) e prove matematicamente qual oferece maior aproveitamento do perímetro e da área.`
    },
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.4. Geometria Espacial',
        description: 'Foco: Design de Produto e Embalagem.',
        content: `Contexto: Atue como um Engenheiro de Embalagens e Logística. Minha empresa fabrica [INSERIR PRODUTO: ex: Perfumes Líquidos / Grãos a granel]. Precisamos redesenhar a embalagem para reduzir custos de material e transporte.

Tarefa: Otimize a forma geométrica da embalagem.

Análise Volume vs. Superfície: O volume necessário é [INSERIR VOLUME EM LITROS/CM³]. Compare matematicamente três formas 3D: [INSERIR FORMAS: ex: Cubo, Cilindro, Esfera/Tetraedro].

Minimização de Material: Calcule a área de superfície total necessária para cada forma manter o volume desejado. Qual forma gasta menos material (papelão/plástico)?

Eficiência de Paletização: Considerando um pallet padrão PBR (1,00 x 1,20m), qual dessas formas permite o melhor empilhamento sem perda de espaço ("espaço morto" entre as caixas)? Justifique com cálculos espaciais.`
    },
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.5. Trigonometria',
        description: 'Foco: Engenharia e Fenômenos Cíclicos.',
        content: `Contexto: Atue como um Engenheiro Civil ou Engenheiro de Som (escolha conforme a variável). Estou lidando com um problema de [INSERIR PROBLEMA: ex: Inclinação de Rampa de Acesso / Isolamento Acústico de Sala].

Tarefa: Aplique funções trigonométricas para resolver este desafio técnico.

Modelagem do Problema: Desenhe (descreva) o triângulo retângulo ou a onda senoidal que representa a situação. Defina o que é o cateto oposto, adjacente e hipotenusa (ou amplitude e frequência) neste contexto real.

Cálculo de Precisão: Dado que [INSERIR DADO CONHECIDO: ex: a altura é 2m / a frequência é 440hz], utilize Seno, Cosseno ou Tangente para descobrir a variável desconhecida [INSERIR DADO FALTANTE: ex: comprimento da rampa / comprimento da onda].

Conformidade Técnica: O resultado obtido respeita a norma técnica que exige [INSERIR REGRA: ex: inclinação máxima de 8% / cancelamento de fase total]? Demonstre a prova matemática.`
    },
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.6. Probabilidade',
        description: 'Foco: Gestão de Risco e Decisão.',
        content: `Contexto: Atue como um Analista de Riscos e Estatístico. Estou diante de uma decisão crítica de investimento/estratégia: [INSERIR DECISÃO: ex: Lançar produto novo ou Melhorar o atual / Investir em Ação X ou Renda Fixa].

Tarefa: Crie uma Árvore de Decisão Probabilística para guiar minha escolha.

Cenários Possíveis: Defina 3 cenários para o futuro (Otimista, Realista, Pessimista) e atribua uma probabilidade percentual estimada para cada um baseada em [INSERIR DADO HISTÓRICO OU INTUIÇÃO].

Cálculo de Valor Esperado (EV): Calcule o Valor Esperado financeiro de cada opção, multiplicando o retorno potencial pela probabilidade de ocorrência.

Análise de Risco Combinado: Qual a probabilidade de ambos os piores cenários acontecerem simultaneamente (Eventos Independentes ou Dependentes)? Calcule essa intersecção.

Veredito Matemático: Com base puramente nos números, qual caminho oferece a melhor relação Risco x Retorno?`
    },
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.7. Matemática Financeira',
        description: 'Foco: Estratégia de Longo Prazo.',
        content: `Contexto: Atue como um Planejador Financeiro Patrimonial (CFP). Meu cliente tem o objetivo de [INSERIR OBJETIVO: ex: Aposentar com R$ 2 Milhões / Comprar uma Casa de R$ 500k] em [INSERIR TEMPO] anos.

Tarefa: Compare dois caminhos financeiros distintos utilizando o valor do dinheiro no tempo.

Cenário A (Conservador): Aportes mensais em [INSERIR TIPO DE INVESTIMENTO: ex: Tesouro Direto] com taxa média de [INSERIR TAXA %] ao ano.

Cenário B (Agressivo/Alavancado): Aportes em [INSERIR TIPO: ex: Carteira de Ações / Financiamento Imobiliário] com taxa projetada de [INSERIR TAXA %] ao ano, mas considerando uma inflação de [INSERIR INFLAÇÃO %].

Cálculo Comparativo: Apresente o montante final (Valor Futuro) e o ganho real (descontando inflação) para ambos os casos usando fórmulas de Juros Compostos e Séries Uniformes de Pagamento.

Conclusão: Qual estratégia exige menor esforço mensal de aporte para atingir o mesmo objetivo?`
    },
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.8. Lógica Formal',
        description: 'Foco: Validação de Sistemas e Regras.',
        content: `Contexto: Atue como um Auditor de Sistemas e Especialista em Lógica Booleana. Estamos desenhando as regras de negócio para um sistema de [INSERIR SISTEMA: ex: Aprovação de Crédito / Triagem Médica Automatizada].

Tarefa: Estruture e valide a lógica de tomada de decisão.

Definição das Premissas: Liste as 3 condições principais (INPUTS) que determinam o resultado (ex: Score > 700, Renda > 5k, Sem Dívidas).

Tabela-Verdade: Crie uma Tabela-Verdade completa cobrindo todas as combinações possíveis dessas variáveis (V/F) e o resultado esperado (OUTPUT) para cada linha.

Identificação de Conflitos: Analise se existe alguma contradição lógica ou "Beco Sem Saída" (Deadlock) onde o sistema não saberia o que fazer.

Simplificação Lógica: Transforme essa tabela em uma sentença lógica única usando conectivos (E, OU, NÃO, SE...ENTÃO) para ser implementada no código.`
    },
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.9. Estatística Descritiva',
        description: 'Foco: Análise de Dados e Tendências.',
        content: `Contexto: Atue como um Cientista de Dados (Data Scientist). Recebi um dataset com o histórico de [INSERIR DADOS: ex: Vendas Mensais dos últimos 5 anos / Notas de Alunos da Escola / Acidentes de Trânsito].

Tarefa: Realize uma análise descritiva para extrair insights acionáveis, não apenas números.

Medidas de Tendência Central: Explique o que a Média, a Mediana e a Moda desses dados indicam sobre o "comportamento padrão" do [INSERIR SUJEITO DA ANÁLISE]. Há muita discrepância entre média e mediana? O que isso significa?

Medidas de Dispersão: Calcule ou estime o Desvio Padrão. Os dados são consistentes ou voláteis? Isso indica segurança ou risco para o [INSERIR NEGÓCIO/PROJETO]?

Identificação de Outliers: Como identificaríamos pontos fora da curva (anomalias)? Se removermos os [INSERIR %] melhores e piores resultados, a conclusão da análise muda drasticamente?

Storytelling com Dados: Escreva um parágrafo executivo resumindo a saúde desses dados para um CEO, evitando o "matematiquês" excessivo.`
    },
    {
        category: '10. Ciências Exatas & Lógica',
        title: '10.10. Cálculo I',
        description: 'Foco: Otimização e Taxas de Variação.',
        content: `Contexto: Atue como um Engenheiro de Produção Industrial. Temos um processo de fabricação ou uma campanha de marketing onde a função que descreve o [INSERIR VARIÁVEL: ex: Lucro / Eficiência / Custo] em relação ao tempo/recurso investido é dada por (ou se comporta como) uma parábola invertida (curva de rendimentos decrescentes).

Tarefa: Utilize conceitos de Limites e Derivadas para encontrar o ponto ótimo.

Conceito de Derivada: Explique, sem usar fórmulas complexas, por que a derivada da função de lucro é igual a zero no ponto de lucro máximo.

Aplicação: Se a equação do lucro é L(x) = -x² + [INSERIR NÚMERO]x - [INSERIR CUSTO FIXO], onde x é a quantidade produzida/investida. Calcule a derivada L'(x), iguale a zero e encontre o valor exato de x que maximiza o resultado.

Taxa de Variação Instantânea: Em um ponto específico x = [INSERIR VALOR], o lucro está subindo ou descendo? A que velocidade? Use a derivada para explicar se vale a pena continuar investindo mais recursos nesse ponto.`
    },


// --- 11. CIÊNCIAS NATURAIS ---
    {
        category: '11. Ciências Naturais',
        title: '11.1. Termodinâmica',
        description: 'Foco: Eficiência Energética Industrial.',
        content: `Contexto: Atue como um Consultor de Eficiência Energética. Fui contratado para auditar um sistema de [INSERIR SISTEMA: ex: Caldeira Industrial / Data Center / Motor a Combustão] que está superaquecendo ou gastando muita energia.

Tarefa: Otimize o ciclo termodinâmico do sistema.

Mapeamento de Perdas: Identifique onde está ocorrendo a maior perda de calor (entropia) no sistema atual. É no isolamento? Na exaustão?

Cálculo de Rendimento: Calcule a eficiência atual do sistema (Trabalho Realizado / Energia Fornecida). Compare com o ciclo ideal (Carnot) para essa temperatura.

Solução de Engenharia: Proponha uma modificação técnica ([INSERIR ORÇAMENTO DISPONÍVEL]) para reaproveitar o calor residual (ex: Cogeração).

ROI Energético: Quanto de energia (em KWh ou Joules) economizaremos por mês com essa implementação?`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.2. Óptica',
        description: 'Foco: Design de Iluminação e Imagem.',
        content: `Contexto: Atue como um Designer de Iluminação (Lighting Designer) para um grande projeto: [INSERIR PROJETO: ex: Museu de Arte / Estufa Agrícola Indoor / Set de Filmagem].

Tarefa: Crie um projeto óptico que atenda às necessidades biológicas ou estéticas.

Física da Luz: Explique como o Índice de Reprodução de Cor (IRC) e a Temperatura de Cor (Kelvin) da luz escolhida afetarão a percepção do [INSERIR OBJETO ILUMINADO].

Cálculo de Lúmens/Lux: Para cobrir uma área de [INSERIR ÁREA EM M²], quantas fontes de luz de [INSERIR POTÊNCIA] são necessárias para atingir a iluminância recomendada por norma?

Controle de Refração/Reflexão: Como posicionar as fontes de luz e quais difusores usar para evitar ofuscamento (glare) e sombras duras indesejadas?

Espectro Invisível: (Opcional) Devemos considerar filtros para bloquear UV ou IR para proteger o material/obras de arte?`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.3. Eletricidade Básica',
        description: 'Foco: Projetos Off-Grid e Renováveis.',
        content: `Contexto: Atue como um Engenheiro Eletricista de Renováveis. O cliente quer instalar um sistema solar Off-Grid (fora da rede) em uma localidade remota: [INSERIR LOCAL: ex: Fazenda no Pantanal / Motorhome / Ilha].

Tarefa: Dimensione o sistema elétrico completo.

Levantamento de Carga: Liste todos os equipamentos (Geladeira, Lâmpadas, Bomba d'água) e some o consumo diário em Watts-hora.

Dimensionamento do Banco de Baterias: Calcule quantos Ah (Amperes-hora) são necessários para garantir [INSERIR DIAS DE AUTONOMIA] sem sol, considerando a profundidade de descarga segura da bateria.

Lei de Ohm na Prática: Dimensione a fiação entre os painéis e o controlador de carga. Qual a perda de tensão aceitável para a distância de [INSERIR DISTÂNCIA] metros?

Proteção: Especifique os disjuntores e fusíveis necessários para proteger o sistema contra curto-circuito e sobrecarga.`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.4. Magnetismo',
        description: 'Foco: Transporte e Indústria (Levitação/Blindagem).',
        content: `Contexto: Atue como um Engenheiro de Maglev (Levitação Magnética) ou Especialista em Ressonância Magnética. Estamos desenvolvendo um protótipo que utiliza supercondutores ou eletroímãs potentes.

Tarefa: Explique o funcionamento e resolva um problema de interferência.

Princípio Físico: Explique como a Força de Lorentz e o diamagnetismo serão usados para levitar ou mover o objeto de [INSERIR MASSA] kg.

Desafio de Blindagem: O campo magnético gerado é de [INSERIR TESLA]. Como protegeremos os passageiros/pacientes e os eletrônicos próximos? Desenhe (descreva) a Gaiola de Faraday necessária.

Refrigeração: Como manteremos os supercondutores na temperatura crítica? Descreva o sistema de criogenia necessário.`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.5. Física Moderna',
        description: 'Foco: Tecnologia Quântica e Segurança.',
        content: `Contexto: Atue como um Consultor de Tecnologia Quântica. Um banco ou governo quer saber se seus dados estão seguros contra computadores quânticos ou se devem investir em criptografia pós-quântica.

Tarefa: Produza um relatório técnico-executivo.

Conceito Base: Explique a "Superposição" e o "Emaranhamento" de forma que um CEO entenda, contrastando bits clássicos com Qubits.

A Ameaça: Explique como o Algoritmo de Shor poderia, teoricamente, quebrar a criptografia RSA atual usada pelo cliente.

Cronograma de Risco: Baseado no estado atual da arte (número de Qubits estáveis), em quantos anos isso se tornará um risco real? 5, 10, 50 anos?

Recomendação: O que o cliente deve fazer hoje? [INSERIR AÇÃO: Migrar chaves? Esperar?]`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.6. Química Geral',
        description: 'Foco: Processos Industriais e Estequiometria.',
        content: `Contexto: Atue como um Engenheiro Químico Industrial. Precisamos escalar a produção de [INSERIR PRODUTO: ex: Sabão Biodegradável / Fertilizante / Combustível Sintético] de uma escala de laboratório para uma fábrica.

Tarefa: Planeje a reação e a segurança.

Estequiometria: A reação balanceada é [INSERIR REAÇÃO]. Se quisermos produzir 1 tonelada do produto final, qual a massa exata de cada reagente necessária (considerando um rendimento de [INSERIR % DE RENDIMENTO])?

Cinética Química: Como podemos acelerar essa reação sem explodir a fábrica? (Aumentar pressão? Temperatura? Usar catalisador?). Escolha a melhor opção custo-benefício.

Gestão de Resíduos: O subproduto da reação é tóxico? Como neutralizá-lo quimicamente antes do descarte ambiental?`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.7. Tabela Periódica',
        description: 'Foco: Engenharia de Materiais.',
        content: `Contexto: Atue como um Cientista de Materiais. Estamos projetando um componente para [INSERIR APLICAÇÃO EXTREMA: ex: Revestimento de Foguete / Implante Ósseo / Bateria de Longa Duração].

Tarefa: Selecione o elemento ou liga ideal justificando pelas propriedades periódicas.

Seleção: Por que escolher o elemento [INSERIR ELEMENTO: ex: Titânio / Grafeno / Lítio]? Analise sua eletronegatividade, raio atômico e ponto de fusão.

Substituição: Esse material é muito caro ou raro (Terras Raras). Qual elemento da mesma família ou grupo na Tabela Periódica poderia servir como substituto mais barato, e quais seriam as perdas de performance?

Durabilidade: Como esse material reage à oxidação ou corrosão no ambiente de operação previsto?`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.8. Bioquímica',
        description: 'Foco: Saúde e Performance Humana.',
        content: `Contexto: Atue como um Bioquímico Esportivo e Nutricionista. O cliente é um atleta de [INSERIR ESPORTE: ex: Fisiculturismo / Maratona / CrossFit] que estagnou nos resultados.

Tarefa: Analise o metabolismo energético e proponha ajustes.

Vias Metabólicas: Durante o treino desse atleta, qual a via predominante? (ATP-CP, Glicolítica ou Oxidativa?). O que isso significa para a demanda de nutrientes?

Suplementação: Explique o mecanismo de ação molecular de um suplemento (ex: Creatina, Beta-alanina, Whey) no corpo dele. Como isso ajuda na ressíntese de ATP ou recuperação muscular?

Hormônios: Como a dieta atual pode estar afetando a insulina e o cortisol, prejudicando a performance? Ajuste os macros para otimizar o ambiente anabólico.`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.9. Astronomia',
        description: 'Foco: Colonização e Exploração Espacial.',
        content: `Contexto: Atue como um Engenheiro de Missão Espacial. Estamos planejando uma base permanente em [INSERIR CORPO CELESTE: ex: Marte / Lua / Europa (Lua de Júpiter)].

Tarefa: Resolva os desafios físicos de sobrevivência local.

Gravidade e Órbita: A gravidade local é de [INSERIR g]. Como isso afeta a fisiologia dos astronautas a longo prazo e como mitigar (centrífugas, exercícios)?

Recursos In-Situ (ISRU): Identifique quais recursos químicos (Água, Regolito, CO2) existem no local e descreva o processo químico para transformá-los em Oxigênio e Combustível de Foguete.

Radiação: Sem uma atmosfera densa ou campo magnético forte, como proteger a base da radiação cósmica e solar? (Enterrar os módulos? Usar água como escudo?).`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.10. Geologia',
        description: 'Foco: Mineração e Construção.',
        content: `Contexto: Atue como um Geólogo de Exploração. Uma empresa quer comprar um terreno para [INSERIR FINALIDADE: ex: Mineração de Ouro / Construção de Represa / Condomínio de Luxo] em uma área de relevo acidentado.

Tarefa: Avalie o potencial e os riscos do solo.

Análise Estratigráfica: O solo é sedimentar, ígneo ou metamórfico? O que isso nos diz sobre a estabilidade para fundações pesadas ou a presença de aquíferos?

Riscos Geotécnicos: Identifique sinais de erosão, rastejo de solo ou falhas tectônicas ativas na região. Qual a probabilidade de deslizamento em caso de chuvas intensas?

Viabilidade Econômica: Se for mineração, explique como estimar o teor do minério e a cubicagem da jazida antes de começar a escavar.`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.11. Meteorologia',
        description: 'Foco: Agronegócio e Aviação.',
        content: `Contexto: Atue como um Meteorologista Sinótico. Uma companhia aérea ou grande cooperativa agrícola precisa de um briefing para a próxima semana, onde há previsão de [INSERIR FENÔMENO: ex: Ciclone Extratropical / Geada Negra / Nevoeiro Denso].

Tarefa: Analise os modelos numéricos e oriente a operação.

Análise de Cartas: Interprete as cartas de pressão atmosférica e ventos. De onde vem a massa de ar e com que velocidade ela se desloca?

Impacto Operacional: * (Se Aviação): Calcule o teto (visibilidade vertical) e cisalhamento do vento (windshear). É seguro pousar? * (Se Agro): Qual a temperatura mínima prevista ao nível do solo?

Plano de Contingência: Recomende a ação imediata (ex: Desviar rotas / Acionar aquecedores no pomar / Antecipar colheita).`
    },
    {
        category: '11. Ciências Naturais',
        title: '11.12. Mecânica Clássica',
        description: 'Foco: Perícia e Dinâmica de Trânsito.',
        content: `Contexto: Atue como um Engenheiro Forense de Trânsito. Ocorreu um acidente envolvendo [INSERIR VEÍCULOS: ex: um Caminhão e um Carro de Passeio] em uma pista [INSERIR CONDIÇÃO: ex: Molhada / Declive Acentuado].

Tarefa: Utilize a física newtoniana para reconstruir o acidente e determinar responsabilidades.

Cálculo de Energia Cinética: Estime a energia envolvida no impacto considerando que o veículo A tinha massa [INSERIR MASSA] e estava a [INSERIR VELOCIDADE ESTIMADA].

Análise de Frenagem: Com base no coeficiente de atrito da pista (µ), calcule a distância mínima de parada necessária. As marcas de pneu no chão de [INSERIR METROS] indicam que ele estava acima da velocidade permitida?

Quantidade de Movimento (Momentum): Explique, vetorialmente, para onde os destroços deveriam ter sido arremessados após a colisão inelástica. Isso condiz com a posição final dos carros?

Laudo Técnico: Redija a conclusão do laudo explicando se houve falha mecânica ou imprudência, baseando-se estritamente nas Leis de Newton.`
    },



    // --- 12. BIOLOGIA E SAÚDE ---
    {
        category: '12. Biologia & Saúde',
        title: '12.1. Citologia',
        description: 'Foco: Pesquisa e Biotecnologia.',
        content: `Contexto: Atue como um Pesquisador em Biologia Celular. Estamos investigando uma patologia ou desenvolvendo um tratamento que envolve a célula do tipo [INSERIR TIPO CELULAR: ex: Neurônio / Hepatócito / Célula-tronco].

Tarefa: Analise a estrutura e o funcionamento celular diante de um estresse.

Análise de Organelas: A célula está apresentando falha na produção de energia ou acúmulo de toxinas. Qual organela (Mitocôndria, Lisossomo, Retículo) é a provável culpada e qual o mecanismo molecular da falha?

Transporte de Membrana: Explique como a membrana plasmática está reagindo à presença de [INSERIR SUBSTÂNCIA OU DROGA]. O transporte é ativo ou passivo? Há bloqueio de canais iônicos?

Ciclo Celular: Se o objetivo for [INSERIR OBJETIVO: ex: Regenerar Tecido / Parar um Tumor], como devemos manipular o ciclo celular (Mitose)? Devemos estimular a divisão ou induzir a apoptose (morte celular programada)?`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.2. Genética',
        description: 'Foco: Medicina Personalizada e Hereditariedade.',
        content: `Contexto: Atue como um Geneticista Clínico. Um casal procura aconselhamento pois há histórico de [INSERIR DOENÇA GENÉTICA: ex: Fibrose Cística / Hemofilia / Huntington] na família e eles desejam ter filhos.

Tarefa: Trace o perfil de risco e as opções.

Padrão de Herança: Explique se a condição é Autossômica Dominante, Recessiva ou Ligada ao Sexo. Desenhe (descreva) o Heredograma provável da família.

Cálculo de Probabilidade: Qual a chance percentual exata de o filho nascer com a doença? E de ser apenas portador assintomático?

Tecnologia CRISPR/Edição: Explique, teoricamente, se essa condição seria candidata a tratamento futuro com terapia gênica (CRISPR-Cas9) e quais os desafios éticos/técnicos de editar embriões.`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.3. Anatomia Humana',
        description: 'Foco: Lesões e Reabilitação.',
        content: `Contexto: Atue como um Cirurgião Ortopedista ou Fisioterapeuta. Um paciente sofreu uma lesão grave no [INSERIR REGIÃO: ex: Joelho / Ombro / Coluna Lombar] praticando [INSERIR ESPORTE/ATIVIDADE].

Tarefa: Descreva a anatomia da lesão e o plano de recuperação.

Estruturas Afetadas: Liste os ossos, ligamentos, tendões e músculos específicos envolvidos. A lesão foi um rompimento total ou parcial?

Biomecânica da Lesão: Explique o movimento mecânico que causou a falha (ex: rotação excessiva com pé fixo).

Plano Cirúrgico/Reabilitação: Descreva a abordagem para consertar a estrutura. Quais exercícios devem ser evitados nas primeiras semanas para não estressar a área operada?`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.4. Fisiologia Humana',
        description: 'Foco: Performance e Homeostase.',
        content: `Contexto: Atue como um Fisiologista do Esporte. Estamos preparando um atleta de elite para competir em um ambiente de [INSERIR AMBIENTE EXTREMO: ex: Altitude Elevada / Deserto Quente / Frio Intenso].

Tarefa: Prepare o corpo do atleta para manter a homeostase.

Adaptação Respiratória/Cardíaca: Como o corpo reagirá inicialmente à mudança (ex: falta de oxigênio ou calor excessivo)? O que acontecerá com a frequência cardíaca e o pH do sangue?

Sistema Renal e Hídrico: Crie um protocolo de hidratação. Como evitar a desidratação ou a hiponatremia (perda de sais) considerando a taxa de suor prevista?

Aclimatização: Quanto tempo o atleta precisa chegar antes da prova para que seu corpo produza adaptações fisiológicas (ex: aumento de hemácias)? Explique o processo da Eritropoietina (EPO).`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.5. Imunologia',
        description: 'Foco: Vacinas e Defesa.',
        content: `Contexto: Atue como um Imunologista. Surgiu um novo patógeno [INSERIR TIPO: ex: Vírus Respiratório / Bactéria Super-resistente] que ataca especificamente [INSERIR CÉLULAS ALVO: ex: Pulmões / Sistema Nervoso].

Tarefa: Desenhe a estratégia de defesa imunológica.

Resposta Inata vs Adaptativa: Descreva a linha do tempo da infecção. Como os macrófagos agem primeiro e quanto tempo leva para os Linfócitos B produzirem anticorpos específicos?

Desenvolvimento de Vacina: Qual tecnologia de vacina seria mais rápida e eficaz para este caso (RNA mensageiro, Vírus Atenuado, Vetor Viral)? Justifique.

Memória Imunológica: Por que algumas pessoas podem ser reinfectadas? O patógeno sofre muitas mutações? Explique o conceito de "Drift Antigênico".`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.6. Nutrição Básica',
        description: 'Foco: Dieta Clínica.',
        content: `Contexto: Atue como um Nutricionista Clínico. O paciente é [INSERIR PERFIL: ex: Diabético Tipo 2 / Hipertenso / Vegano com Anemia] e precisa mudar drasticamente a alimentação.

Tarefa: Elabore um plano nutricional bioquimicamente justificado.

Metabolismo de Macros: Calcule a distribuição ideal de Carboidratos, Proteínas e Gorduras. Por que devemos restringir ou aumentar [INSERIR NUTRIENTE] para essa patologia específica?

Micronutrientes Críticos: Identifique 3 vitaminas ou minerais que podem estar em déficit (ex: B12, Ferro, Cálcio) e sugira fontes alimentares (não suplementos) para corrigir.

Índice Glicêmico/Carga: (Se aplicável) Explique como a combinação de alimentos (ex: fibra + carbo) afeta a curva de insulina deste paciente.`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.7. Botânica',
        description: 'Foco: Agricultura Sustentável.',
        content: `Contexto: Atue como um Engenheiro Agrônomo. Temos uma plantação de [INSERIR CULTURA: ex: Soja / Milho / Tomate] que está sofrendo com [INSERIR PROBLEMA: ex: Seca / Praga de Lagartas / Solo Ácido].

Tarefa: Salve a colheita usando conhecimentos de fisiologia vegetal.

Diagnóstico Foliar: Descreva os sintomas visuais na planta (amarelamento, necrose). Isso indica deficiência de qual nutriente (Nitrogênio, Fósforo, Potássio)?

Fisiologia do Estresse: Como a planta fecha os estômatos para economizar água e como isso afeta a fotossíntese? Podemos usar algum bioestimulante?

Controle Biológico vs Químico: Proponha uma solução para a praga que não mate os polinizadores (abelhas). Existe algum predador natural ou bactéria (ex: Bacillus thuringiensis) que possamos usar?`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.8. Zoologia',
        description: 'Foco: Conservação e Manejo.',
        content: `Contexto: Atue como um Biólogo da Conservação. Uma espécie de [INSERIR ANIMAL: ex: Onça-Pintada / Tartaruga Marinha / Ave Rara] está ameaçada de extinção devido à [INSERIR CAUSA: ex: Fragmentação do Habitat / Caça Ilegal].

Tarefa: Crie um plano de manejo para aumentar a população.

Nicho Ecológico: Descreva o papel desse animal no ecossistema (Predador de topo? Dispersor de sementes?). O que acontece com o bioma se ele desaparecer?

Reprodução: A estratégia reprodutiva da espécie é "K" (poucos filhotes, muito cuidado) ou "r" (muitos filhotes, pouco cuidado)? Como isso afeta a velocidade de recuperação da população?

Corredores Ecológicos: Projete uma solução física para reconectar as populações isoladas e garantir variabilidade genética, evitando a endogamia.`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.9. Ecologia',
        description: 'Foco: Impacto Ambiental.',
        content: `Contexto: Atue como um Consultor Ambiental. Uma empresa planeja construir [INSERIR EMPREENDIMENTO: ex: Uma Estrada / Uma Fábrica / Um Resort] em uma área de [INSERIR BIOMA: ex: Manguezal / Cerrado / Floresta Tropical].

Tarefa: Realize o Estudo de Impacto Ambiental (EIA).

Cadeia Alimentar: Mapeie a teia trófica local. Qual espécie é a "chave" que, se afetada pela obra, colapsará o resto da cadeia?

Ciclos Biogeoquímicos: Como a obra afetará o ciclo da água ou do carbono na região? Há risco de eutrofização de corpos d'água próximos?

Mitigação e Compensação: A obra é irreversível. Proponha 3 medidas obrigatórias para compensar o dano (ex: reflorestamento, criação de unidade de conservação).`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.10. Neurociência Básica',
        description: 'Foco: Comportamento e Aprendizado.',
        content: `Contexto: Atue como um Neurocientista Cognitivo. Queremos desenvolver um método de ensino ou um produto para pessoas com [INSERIR CONDIÇÃO: ex: TDAH / Ansiedade / Dislexia].

Tarefa: Explique o funcionamento cerebral e proponha a solução.

Neuroanatomia: Quais áreas do cérebro (Córtex Pré-frontal, Amígdala, Hipocampo) estão hipoativas ou hiperativas nessa condição?

Neurotransmissores: Explique o papel da Dopamina, Serotonina ou Noradrenalina no foco e na motivação deste perfil.

Neuroplasticidade: Como nossa solução (seja um app, um jogo ou um método de estudo) vai treinar o cérebro para criar novas conexões sinápticas e contornar a dificuldade?`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.11. Farmacologia Básica',
        description: 'Foco: Segurança e Mecanismo.',
        content: `Contexto: Atue como um Farmacêutico Hospitalar. Um paciente idoso toma múltiplos remédios (polifarmácia) para [INSERIR CONDIÇÕES: ex: Pressão Alta e Diabetes] e agora precisa tomar um antibiótico/anti-inflamatório novo.

Tarefa: Avalie a interação medicamentosa.

Farmacodinâmica: Explique como o novo remédio age no corpo (mecanismo de ação). Ele compete pelos mesmos receptores dos remédios antigos?

Farmacocinética (Metabolismo): Ambos os remédios são metabolizados pelo fígado (Enzima P450)? Existe risco de um remédio inibir a eliminação do outro, causando overdose tóxica?

Orientação ao Paciente: Quais sinais de alerta (ex: tontura, sangramento, dor estomacal) o paciente deve monitorar? O remédio deve ser tomado com ou sem comida?`
    },
    {
        category: '12. Biologia & Saúde',
        title: '12.12. Primeiros Socorros',
        description: 'Foco: Protocolo de Emergência.',
        content: `Contexto: Atue como um Socorrista do SAMU/Paramédico. Você chegou à cena de um acidente onde a vítima sofreu [INSERIR TRAUMA: ex: Queimadura de 3º Grau / Parada Cardíaca / Corte Profundo com Hemorragia].

Tarefa: Execute o protocolo de salvamento passo a passo.

Avaliação da Cena e Segurança: Antes de tocar na vítima, o que você verifica para garantir que você não será a próxima vítima (ex: fios elétricos, vazamento de gás)?

Protocolo XABCDE: Aplique o protocolo de trauma. * X (Hemorragia Exsanguinante): Como conter o sangramento massivo descrito? (Torniquete? Compressão direta?). * A (Vias Aéreas): A vítima respira? Se não, inicie a RCP.

Estabilização: O que fazer enquanto a ambulância não chega para evitar o Choque Hipovolêmico ou a infecção da área queimada? O que NUNCA fazer (ex: passar pasta de dente em queimadura)?`
    },


    // --- 13. LINGUAGENS E COMUNICAÇÃO ---
    {
        category: '13. Linguagens & Comunicação',
        title: '13.1. Gramática Normativa',
        description: 'Foco: Revisão Editorial de Alto Nível.',
        content: `Contexto: Atue como um Editor-Chefe de uma Publicação de Prestígio (jurídica, acadêmica ou literária). Recebi um texto bruto que precisa ser elevado ao padrão da norma culta, mas sem perder a voz do autor. O texto é um [INSERIR TIPO: ex: Artigo de Opinião / Tese de Mestrado / Contrato Social].

Tarefa: Realize uma revisão cirúrgica e explicativa.

Correção Sintática e Morfológica: Identifique erros de concordância, regência (crase) e pontuação. Para cada correção, cite brevemente a regra gramatical violada (ex: "Uso proibido de crase antes de verbo").

Refinamento de Coesão: Melhore os conectivos (conjunções) para que os parágrafos fluam melhor. Substitua repetições de palavras por sinônimos mais precisos ou pronomes.

Adequação de Registro: O texto está muito [INSERIR PROBLEMA: ex: coloquial / prolixo / agressivo]. Reescreva os trechos problemáticos para torná-los mais [INSERIR TOM DESEJADO: ex: formais / concisos / diplomáticos].`
    },
    {
        category: '13. Linguagens & Comunicação',
        title: '13.2. Interpretação de Texto',
        description: 'Foco: Análise de Discurso e Mídia.',
        content: `Contexto: Atue como um Analista Político ou Investigativo. Tenho em mãos um [INSERIR TEXTO: ex: Discurso de um CEO / Notícia de Jornal / Manifesto Partidário] e preciso entender o que está nas entrelinhas.

Tarefa: Desconstrua o texto usando Análise Crítica do Discurso.

Identificação de Viés: Quais adjetivos e advérbios o autor escolheu para qualificar os fatos? Isso indica um viés positivo, negativo ou neutro sobre o tema [INSERIR TEMA]?

Detecção de Falácias: Identifique se há falácias lógicas no argumento (ex: Ad Hominem, Espantalho, Falsa Equivalência). Onde o autor tenta manipular a emoção do leitor em vez de usar a razão?

O "Não-Dito" (Subtexto): O que o autor omitiu propositalmente? A quem esse texto beneficia e quem ele silencia? Resuma a verdadeira intenção por trás das palavras.`
    },
    {
        category: '13. Linguagens & Comunicação',
        title: '13.3. Redação e Estilo',
        description: 'Foco: Copywriting e Ghostwriting.',
        content: `Contexto: Atue como um Ghostwriter Sênior. Preciso escrever um [INSERIR FORMATO: ex: E-mail de Vendas / Artigo para LinkedIn / Carta de Pedido de Desculpas] em nome de um [INSERIR PERFIL: ex: CEO de Startup / Político / Influenciador].

Tarefa: Escreva o texto focando em conversão e engajamento.

Estrutura Persuasiva: Utilize o framework [ESCOLHER UM: AIDA (Atenção, Interesse, Desejo, Ação) / PAS (Problema, Agitação, Solução)] para estruturar o texto.

Tom de Voz (Tone of Voice): O público-alvo é [INSERIR PÚBLICO: ex: Jovens da Gen Z / Investidores Conservadores]. Adapte o vocabulário e o ritmo das frases para ressoar com esse grupo (gírias vs. termos técnicos).

Ganchos e CTAs: Crie 3 opções de títulos/assuntos magnéticos e uma "Chamada para Ação" (Call to Action) irresistível no final.`
    },
    {
        category: '13. Linguagens & Comunicação',
        title: '13.4. Literatura Mundial',
        description: 'Foco: Análise Comparada e Relevância.',
        content: `Contexto: Atue como um Crítico Literário e Professor de Literatura Comparada. Estou estudando a obra [INSERIR LIVRO: ex: 1984 de Orwell / Dom Casmurro / A Metamorfose] e quero conectá-la com o mundo atual.

Tarefa: Produza um ensaio analítico profundo.

Análise Temática: Como o tema central de [INSERIR TEMA: ex: Vigilância Estatal / Ciúme / Alienação no Trabalho] é tratado no livro? Cite passagens chaves.

Contexto Histórico vs. Atual: O livro foi escrito em [INSERIR ANO/ÉPOCA]. Compare o medo daquela sociedade com os medos da sociedade atual. A obra foi profética ou datada?

Arquétipos: Analise o protagonista sob a ótica da Jornada do Herói ou dos Arquétipos Junguianos. O que ele representa na psique humana universal?`
    },
    {
        category: '13. Linguagens & Comunicação',
        title: '13.5. Inglês Instrumental',
        description: 'Foco: Técnico e Acadêmico.',
        content: `Contexto: Atue como um Tradutor Técnico Especialista em [INSERIR ÁREA: ex: TI / Medicina / Engenharia]. Tenho um paper/manual em inglês com o título [INSERIR TÍTULO] e preciso extrair o conhecimento prático dele.

Tarefa: Facilite a compreensão técnica (Skimming e Scanning).

Glossário Terminológico: Identifique os 10 termos técnicos (keywords) mais importantes do texto e forneça a tradução contextualizada (não a literal), explicando o conceito brevemente.

Resumo Executivo (Abstract): Traduza e sintetize a ideia central, a metodologia usada e a conclusão principal em um parágrafo de português claro.

Tradução de Trecho Complexo: Traduza o seguinte parágrafo difícil [COLAR PARÁGRAFO] desmembrando as orações longas e voz passiva para tornar a leitura fluida em português.`
    },
    {
        category: '13. Linguagens & Comunicação',
        title: '13.6. Oratória e Retórica',
        description: 'Foco: Preparação de Discurso.',
        content: `Contexto: Atue como um Coach de Oratória e Speechwriter. Tenho que fazer uma apresentação de [INSERIR TEMPO: ex: 5 minutos / 1 hora] para uma plateia de [INSERIR PÚBLICO: ex: Acionistas / Alunos / Convidados de Casamento]. O objetivo é [INSERIR OBJETIVO: ex: Conseguir Investimento / Emocionar / Ensinar].

Tarefa: Roteirize minha fala usando técnicas retóricas clássicas.

Ethos, Pathos, Logos: Estruture o discurso para estabelecer minha credibilidade (Ethos), conectar emocionalmente (Pathos) e usar dados lógicos (Logos). Onde entra cada um?

Storytelling: Crie uma anedota ou metáfora de abertura para capturar a atenção nos primeiros 30 segundos (The Hook).

Recursos Estilísticos: Insira no texto técnicas como a "Regra de Três" (listar 3 coisas para impacto), anáforas (repetição no início das frases) ou perguntas retóricas para dar ritmo à fala.`
    },
    {
        category: '13. Linguagens & Comunicação',
        title: '13.7. Comunicação Não-Violenta',
        description: 'Foco: Gestão de Conflitos (CNV).',
        content: `Contexto: Atue como um Mediador de Conflitos. Estou prestes a ter uma conversa difícil com [INSERIR PESSOA: ex: Meu Chefe / Minha Esposa / Um Cliente Irritado] sobre o problema: [INSERIR SITUAÇÃO: ex: Atrasos na entrega / Falta de reconhecimento / Gastos excessivos].

Tarefa: Crie um roteiro de diálogo baseado nos 4 pilares da CNV de Marshall Rosenberg.

Observação (Sem Julgamento): Como descrever o fato ocorrido sem usar adjetivos acusatórios como "você é preguiçoso" ou "você errou"? (Ex: "Quando vi que o relatório não chegou às 14h...").

Sentimento: Identifique e nomeie como me sinto (Frustrado? Preocupado? Inseguro?).

Necessidade: Conecte o sentimento a uma necessidade humana universal não atendida (Necessidade de confiança? De ordem? De apoio?).

Pedido Claro: Formule um pedido de ação concreto e positivo para o futuro (não o que você não quer, mas o que você quer).`
    },
    {
        category: '13. Linguagens & Comunicação',
        title: '13.8. Linguagem Corporal',
        description: 'Foco: Performance e Leitura.',
        content: `Contexto: Atue como um Especialista em Linguagem Não-Verbal. Tenho uma situação de alta pressão: [INSERIR SITUAÇÃO: ex: Entrevista de Emprego / Negociação Salarial / Primeiro Encontro].

Tarefa: Prepare minha comunicação não-verbal.

Postura de Poder (Power Posing): Como devo me posicionar na cadeira ou em pé para transmitir confiança e autoridade sem parecer arrogante? O que fazer com as mãos?

Leitura do Outro (Calibragem): Quais microexpressões ou gestos (ex: coçar o nariz, cruzar braços, desviar olhar) devo observar na outra pessoa para saber se ela está desconfortável ou mentindo?

Paralinguagem: Como devo modular o tom, o volume e a velocidade da minha voz para passar credibilidade neste contexto específico? (Falar mais grave? Fazer pausas?).`
    },



    // --- 14. CIÊNCIAS HUMANAS E SOCIEDADE ---
    {
        category: '14. Humanas & Sociedade',
        title: '14.1. História Antiga',
        description: 'Foco: Liderança e Estratégia.',
        content: `Contexto: Atue como um Consultor de Estratégia Política. Estamos analisando a ascensão e queda de grandes impérios para aplicar lições a uma corporação multinacional moderna ou um governo atual.

Tarefa: Realize uma análise comparativa histórica.

Estudo de Caso: Analise a estrutura de governança de [ESCOLHER: Roma Imperial / Democracia Ateniense / Egito dos Faraós]. Como eles lidavam com a [INSERIR DESAFIO: Centralização do Poder / Gestão de Crises / Sucessão de Liderança]?

Paralelo Moderno: Compare esse cenário antigo com a situação atual da [INSERIR EMPRESA OU PAÍS]. Estamos cometendo os mesmos erros que levaram ao colapso daquela civilização (ex: expansão excessiva, corrupção interna)?

Conselho do Oráculo: Se você fosse um conselheiro de César ou Péricles transportado para hoje, qual seria sua recomendação estratégica para o líder atual evitar a ruína?`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.2. História Medieval',
        description: 'Foco: Economia e Estrutura Social.',
        content: `Contexto: Atue como um Economista Histórico e Roteirista. Estamos criando uma série ou jogo ambientado na Idade Média (Alta ou Baixa) e precisamos de precisão absoluta na construção do mundo (Worldbuilding).

Tarefa: Descreva o funcionamento da sociedade feudal.

Hierarquia e Poder: Explique a relação de suserania e vassalagem na região de [INSERIR REGIÃO: ex: França / Sacro Império / Japão Feudal]. Quem detém o poder real: o Rei, a Igreja ou os Senhores Locais?

Economia de Subsistência: Como funciona o comércio na vila? É baseada em escambo ou moeda? Descreva o papel das "Guildas" de ofício na regulação dos preços de [INSERIR PRODUTO: ex: Tecidos / Armas / Pão].

A Peste e a Crise: Simule o impacto da Peste Negra nesta sociedade. Como a escassez de mão de obra altera o poder de barganha dos camponeses contra os senhores feudais?`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.3. Geografia Física',
        description: 'Foco: Planejamento Ambiental.',
        content: `Contexto: Atue como um Geógrafo e Planejador Ambiental. Temos um projeto de infraestrutura ([INSERIR OBRA: ex: Hidrelétrica / Rodovia / Condomínio]) para ser realizado em uma área de [INSERIR RELEVO: ex: Serra / Planície Alagável / Caatinga].

Tarefa: Avalie a viabilidade física do terreno.

Análise Hidrográfica: Mapeie a bacia hidrográfica local. A impermeabilização do solo pela obra causará enchentes a jusante? Como preservar as matas ciliares?

Geomorfologia: O relevo apresenta riscos de deslizamento de massa (landslides)? Identifique se é uma área de "Escudos Cristalinos" (estável) ou "Bacias Sedimentares" (risco de erosão).

Climatologia Local: Como o regime de chuvas da região e o fenômeno de "Ilhas de Calor" podem afetar o conforto térmico e a segurança do empreendimento?`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.4. Geografia Humana',
        description: 'Foco: Urbanismo e Demografia.',
        content: `Contexto: Atue como um Demógrafo e Urbanista. A cidade de [INSERIR NOME] está passando por um processo rápido de [INSERIR FENÔMENO: Gentrificação / Favelização / Envelhecimento Populacional].

Tarefa: Proponha soluções de política pública.

Análise da Pirâmide Etária: Os dados mostram um estreitamento da base (menos natalidade) e alargamento do topo. O que isso significa para o sistema de previdência e saúde da cidade nos próximos 20 anos?

Mobilidade e Segregação: Analise o movimento pendular (casa-trabalho). A população pobre está sendo empurrada para a periferia? Como isso impacta o tempo de transporte e a qualidade de vida?

Plano Diretor: Sugira 3 alterações no Plano Diretor da cidade para mitigar esses problemas (ex: Uso misto do solo, Densificação próxima ao metrô).`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.5. Geopolítica',
        description: 'Foco: Relações Internacionais e Conflito.',
        content: `Contexto: Atue como um Analista de Inteligência Internacional. Existe uma tensão crescente entre o País A ([INSERIR PAÍS: ex: EUA / China / Rússia]) e o País B ([INSERIR PAÍS]) disputando o controle de [INSERIR RECURSO: ex: Semicondutores / Petróleo / Água Potável].

Tarefa: Elabore um relatório de cenários futuros.

Soft Power vs Hard Power: Quais ferramentas cada país está usando? (Sanções econômicas? Diplomacia cultural? Ameaça militar?).

Alianças Regionais: Como a OTAN, o BRICS ou a União Europeia se posicionariam neste conflito? Quem são os "Proxies" (procuradores) que poderiam lutar no lugar das potências?

Teoria do Heartland/Rimland: Aplique conceitos clássicos da geopolítica (Mackinder ou Spykman) para explicar por que esse território específico é tão estratégico geograficamente.`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.6. Filosofia Antiga',
        description: 'Foco: Ética Empresarial e Pessoal.',
        content: `Contexto: Atue como um Consultor Filosófico (Chief Philosophy Officer). Nossa empresa ou líder está enfrentando um dilema: [INSERIR DILEMA: ex: Demitir funcionários para salvar a empresa / Priorizar lucro ou sustentabilidade].

Tarefa: Aplique a sabedoria clássica para resolver a questão.

Virtude Aristotélica: Onde estaria o "Justo Meio" (Golden Mean) nessa situação? Evite os extremos da covardia e da temeridade. Qual é a ação virtuosa?

Mito da Caverna (Platão): Estamos olhando para a realidade ou apenas para sombras (métricas de vaidade, aparências)? O que seria "sair da caverna" e ver a verdade sobre esse negócio?

Maiêutica Socrática: Faça 5 perguntas incômodas e profundas que o CEO deve responder para descobrir se sua decisão é justa.`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.7. Ética e Moral',
        description: 'Foco: Bioética e IA.',
        content: `Contexto: Atue como um Especialista em Ética da IA ou Bioética. Estamos programando um carro autônomo ou um algoritmo de triagem médica que deve tomar uma decisão de vida ou morte: [INSERIR CENÁRIO TROLLEY PROBLEM: ex: Salvar o passageiro ou atropelar 3 pedestres].

Tarefa: Analise a decisão sob diferentes óticas morais.

Utilitarismo (Bentham/Mill): Qual decisão maximiza o bem-estar do maior número de pessoas? Calcule o "cálculo felicífico".

Deontologia (Kant): Existe uma regra universal (Imperativo Categórico) que deve ser seguida, independentemente das consequências? (Ex: "Não matarás inocentes", mesmo que isso salve outros).

Programação Final: Como você traduziria esse debate filosófico em uma linha de código "If/Else" para a máquina? Qual viés ético a empresa deve assumir publicamente?`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.8. Sociologia Clássica',
        description: 'Foco: Cultura Corporativa.',
        content: `Contexto: Atue como um Sociólogo Organizacional. A empresa [INSERIR NOME] está sofrendo com altas taxas de Burnout e falta de propósito entre os funcionários.

Tarefa: Diagnostique a doença social da empresa.

Marx e a Alienação: O funcionário enxerga o fruto do seu trabalho ou é apenas uma peça na engrenagem? Como a separação entre o trabalhador e o produto final está gerando desmotivação?

Weber e a Burocracia: A "Jaula de Ferro" da burocracia excessiva está matando a criatividade? Identifique onde as regras racionais se tornaram irracionais.

Durkheim e a Anomia: Existe um estado de "Anomia" (falta de normas claras ou perda de valores coletivos)? Como reconstruir a "Solidariedade Orgânica" dentro da equipe?`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.9. Antropologia',
        description: 'Foco: Marketing e UX.',
        content: `Contexto: Atue como um Antropólogo Digital. Queremos lançar nosso produto [INSERIR PRODUTO] em um novo mercado cultural: [INSERIR PAÍS OU TRIBO URBANA: ex: Japão / Gamers Gen Z / Idosos Rurais].

Tarefa: Realize uma pesquisa etnográfica rápida.

Rituais e Tabus: Quais são os rituais diários desse grupo que nosso produto deve respeitar? O que é considerado ofensivo ou "tabu" para eles (cores, símbolos, gestos)?

Símbolos de Status: O que confere prestígio social dentro dessa cultura? Como nosso produto pode se alinhar a esses símbolos?

Alteridade: Como evitar o "Etnocentrismo" (julgar a cultura deles pela régua da nossa) na campanha de marketing? Dê um exemplo prático de adaptação necessária.`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.10. Psicologia Comportamental',
        description: 'Foco: Mudança de Hábitos.',
        content: `Contexto: Atue como um Designer Comportamental. Estamos criando um aplicativo para ajudar as pessoas a [INSERIR HÁBITO: ex: Parar de Fumar / Economizar Dinheiro / Estudar Todos os Dias].

Tarefa: Desenhe o sistema de engajamento baseado no Behaviorismo.

Condicionamento Operante (Skinner): Defina qual será o "Reforço Positivo" (recompensa) imediato após o usuário completar a tarefa. E qual será a "Punição Negativa" (retirada de algo bom) se ele falhar?

Gatilhos e Dicas: Identifique os gatilhos ambientais que iniciam o mau hábito atual e como vamos substituí-los por novos gatilhos no app.

Modelagem (Shaping): Como vamos dividir o objetivo grande em pequenos passos sucessivos para que o usuário não desista no início?`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.11. Psicanálise',
        description: 'Foco: Branding e Narrativa.',
        content: `Contexto: Atue como um Especialista em Arquétipos de Marca. Estamos definindo a personalidade da marca [INSERIR MARCA] que atua no setor de [INSERIR SETOR: ex: Motocicletas / Seguros / Chocolate].

Tarefa: Mergulhe no inconsciente do consumidor.

Arquétipos Junguianos: Qual é o arquétipo dominante da marca? (O Herói, O Fora da Lei, O Cuidador, O Mago?). Justifique a escolha baseada no desejo oculto do cliente.

Mecanismos de Defesa: O que o cliente está tentando reprimir ou compensar ao comprar esse produto? (Ex: Compra um carro esportivo para compensar o medo do envelhecimento/impotência?).

A Sombra: Qual é o lado sombrio da marca que não deve ser revelado, mas que dá profundidade à narrativa?`
    },
    {
        category: '14. Humanas & Sociedade',
        title: '14.12. Teologia e Ciência da Religião',
        description: 'Foco: Diversidade e Conflito.',
        content: `Contexto: Atue como um Historiador das Religiões. Estou escrevendo um livro ou roteiro que envolve o encontro entre duas crenças distintas: [INSERIR CRENÇA A: ex: Cristianismo] e [INSERIR CRENÇA B: ex: Budismo / Paganismo].

Tarefa: Analise as tensões e as pontes possíveis.

Doutrina Comparada: Compare o conceito de [INSERIR CONCEITO: ex: Vida após a Morte / Salvação / O Mal] nas duas visões. Onde elas colidem frontalmente?

Sincretismo: Historicamente, como essas religiões se misturaram? Dê exemplos de como rituais ou santos foram adaptados de uma para a outra para facilitar a conversão ou convivência.

Função Social: Além da fé, qual função social cada uma desempenha na sua comunidade (coesão, caridade, controle social)? Como isso afeta o enredo?`
    },



    // --- 15. DIREITO, CIDADANIA E POLÍTICA ---
    {
        category: '15. Direito & Política',
        title: '15.1. Direito Constitucional',
        description: 'Foco: Controle de Constitucionalidade.',
        content: `Contexto: Atue como um Ministro do Supremo Tribunal Federal (STF) ou um Constitucionalista Sênior. Foi aprovada uma nova lei ([INSERIR LEI: ex: Bloqueio de Redes Sociais / Obrigatoriedade de Voto Impresso / Restrição de Cultos Religiosos na Pandemia]) que está sendo questionada.

Tarefa: Analise a constitucionalidade da norma.

Colisão de Direitos Fundamentais: Identifique quais direitos estão em conflito (ex: Liberdade de Expressão vs. Segurança Nacional; Direito à Vida vs. Liberdade de Culto).

Princípio da Proporcionalidade: Aplique o "Teste de Proporcionalidade" em suas três etapas: Adequação (o meio serve para o fim?), Necessidade (não há meio menos gravoso?) e Proporcionalidade em sentido estrito (os benefícios superam os danos?).

Veredito: Com base na Constituição Federal de 1988 e em precedentes históricos, declare a lei Inconstitucional ou Constitucional, fundamentando seu voto.`
    },
    {
        category: '15. Direito & Política',
        title: '15.2. Direito Civil',
        description: 'Foco: Contratos e Responsabilidade.',
        content: `Contexto: Atue como um Advogado Civilista. Meu cliente ([INSERIR CLIENTE: ex: Uma Construtora / Um Locatário Comercial / Um Influenciador Digital]) assinou um contrato de [INSERIR TIPO: ex: Prestação de Serviços / Aluguel] e agora deseja rescindir ou revisar o contrato devido a [INSERIR FATO: ex: Aumento excessivo do IGPM / Falha na entrega / Pandemia].

Tarefa: Elabore a tese jurídica para a defesa do cliente.

Teoria da Imprevisão: É possível aplicar a cláusula Rebus Sic Stantibus (alteração fundamental das circunstâncias)? Prove que o evento foi imprevisível e gerou onerosidade excessiva.

Cláusulas Abusivas: Analise o contrato em busca de cláusulas leoninas (que favorecem desproporcionalmente uma parte) que possam ser anuladas pelo Código Civil.

Danos Morais e Materiais: Calcule e justifique se cabe pedido de indenização. Ocorreu "Lucros Cessantes" (o que ele deixou de ganhar)?`
    },
    {
        category: '15. Direito & Política',
        title: '15.3. Direito do Consumidor',
        description: 'Foco: Práticas Abusivas.',
        content: `Contexto: Atue como um Defensor Público ou Promotor do Consumidor. Um grande número de reclamações surgiu contra a empresa [INSERIR EMPRESA: ex: Operadora de Telefonia / Companhia Aérea / E-commerce] devido à prática de [INSERIR PRÁTICA: ex: Venda Casada / Publicidade Enganosa / Cancelamento Unilateral].

Tarefa: Fundamente uma Ação Civil Pública.

Inversão do Ônus da Prova: Explique por que, neste caso, a empresa é quem deve provar que não errou, devido à hipossuficiência técnica do consumidor (Art. 6º do CDC).

Responsabilidade Objetiva: Demonstre que a empresa deve responder pelos danos independentemente de culpa ou dolo, focando no "Risco do Empreendimento".

Dano Moral Coletivo: Argumente por que essa prática não afetou apenas um indivíduo, mas feriu a confiança de toda a sociedade, exigindo uma indenização punitiva (punitive damages).`
    },
    {
        category: '15. Direito & Política',
        title: '15.4. Direito Trabalhista',
        description: 'Foco: Novas Relações de Trabalho.',
        content: `Contexto: Atue como um Juiz do Trabalho ou Advogado Trabalhista. Estamos analisando o caso de um profissional [INSERIR PROFISSÃO: ex: Motorista de App / Desenvolvedor de Software PJ / Entregador] que pede reconhecimento de vínculo empregatício com a plataforma/empresa.

Tarefa: Analise os requisitos do Art. 3º da CLT.

Subordinação Jurídica: O trabalhador tinha autonomia real ou era controlado por algoritmos/chefes (horários, metas, punições)? Existe "subordinação algorítmica"?

Habitualidade e Onerosidade: O trabalho era eventual ou constante? Havia dependência econômica?

Pejotização: Verifique se a contratação como PJ (Pessoa Jurídica) foi uma fraude para mascarar a relação de emprego. Se reconhecido o vínculo, quais verbas (13º, Férias, FGTS) devem ser pagas retroativamente?`
    },
    {
        category: '15. Direito & Política',
        title: '15.5. Direito Penal',
        description: 'Foco: Teoria do Delito e Tribunal do Júri.',
        content: `Contexto: Atue como um Advogado Criminalista de Defesa. Seu cliente está sendo acusado de [INSERIR CRIME: ex: Homicídio / Legítima Defesa / Furto Famélico] nas seguintes circunstâncias: [DESCREVER O FATO BREVEMENTE].

Tarefa: Construa a tese de defesa usando a Teoria do Crime.

Excludente de Ilicitude: É possível alegar Legítima Defesa, Estado de Necessidade ou Estrito Cumprimento do Dever Legal? Prove que a reação foi proporcional à agressão.

Ausência de Dolo: O cliente teve a intenção de cometer o crime? É possível desclassificar para a modalidade "Culposa" (sem intenção), reduzindo a pena?

Retórica para o Júri: Escreva o parágrafo de encerramento da sua sustentação oral, apelando para o senso de justiça e a dúvida razoável (In dubio pro reo) dos jurados.`
    },
    {
        category: '15. Direito & Política',
        title: '15.6. Estrutura do Estado',
        description: 'Foco: Crise Institucional.',
        content: `Contexto: Atue como um Analista Político Institucional. O país está vivendo uma crise onde o Poder [INSERIR PODER: ex: Executivo] está tentando interferir nas atribuições do Poder [INSERIR PODER: ex: Judiciário], alegando [INSERIR MOTIVO: ex: Ativismo Judicial / Obstrução de Governo].

Tarefa: Explique o mecanismo de Freios e Contrapesos (Checks and Balances).

Competências Constitucionais: Delimite claramente o que a Constituição diz ser função de cada um. Onde houve o excesso?

Remédios Constitucionais: Quais ferramentas legais o poder atacado possui para se defender? (Impeachment? Mandado de Segurança? ADI?).

Consequências: Analise o risco de ruptura democrática. O que acontece se uma ordem judicial deixar de ser cumprida pelo Executivo?`
    },
    {
        category: '15. Direito & Política',
        title: '15.7. Ciência Política',
        description: 'Foco: Ideologias e Políticas Públicas.',
        content: `Contexto: Atue como um Cientista Político. O governo acabou de lançar um programa de [INSERIR PROGRAMA: ex: Renda Básica Universal / Privatização de Estatais / Reforma Agrária].

Tarefa: Analise essa política sob a ótica de duas ideologias opostas.

Visão Liberal (Direita/Centro-Direita): Analise a política focando em: eficiência econômica, redução do tamanho do Estado, meritocracia e liberdade individual. Quais seriam as críticas ou elogios?

Visão Social-Democrata/Socialista (Esquerda/Centro-Esquerda): Analise a mesma política focando em: justiça social, redução da desigualdade, papel do Estado como protetor e direitos coletivos.

Síntese: Qual das duas visões prevalece na implementação prática desse programa específico? É uma política populista ou estrutural?`
    },
    {
        category: '15. Direito & Política',
        title: '15.8. Direito Digital e LGPD',
        description: 'Foco: Privacidade de Dados.',
        content: `Contexto: Atue como um DPO (Data Protection Officer) ou Advogado Digital. Uma empresa de [INSERIR SETOR: ex: Saúde / Marketing / Finanças] sofreu um vazamento de dados ou quer coletar dados sensíveis de seus usuários.

Tarefa: Garanta a conformidade com a LGPD (Lei Geral de Proteção de Dados).

Bases Legais: Qual é a base legal para tratar esses dados? É "Consentimento" (o usuário autorizou), "Legítimo Interesse" ou "Cumprimento de Obrigação Legal"? Justifique.

Dados Sensíveis: Se houver dados de saúde, biometria ou religião, quais são as camadas extras de proteção exigidas pela lei?

Plano de Resposta a Incidentes: Ocorreu um vazamento. Escreva o comunicado oficial que deve ser enviado à ANPD (Autoridade Nacional) e aos usuários afetados, conforme o prazo legal, minimizando danos à reputação.`
    },


    // --- 16. ECONOMIA E NEGÓCIOS ---
    {
        category: '16. Economia & Negócios',
        title: '16.1. Microeconomia',
        description: 'Foco: Estratégia de Preços e Elasticidade.',
        content: `Contexto: Atue como um Economista Sênior de Pricing (Precificação). Minha empresa vende [INSERIR PRODUTO: ex: Café Gourmet / Software por Assinatura / Passagens Aéreas] e estamos considerando aumentar o preço em [INSERIR % DE AUMENTO].

Tarefa: Analise a Elasticidade-Preço da Demanda e o impacto na receita.

Cenário de Elasticidade: Baseado no tipo de produto (essencial vs. supérfluo) e na concorrência, você estima que a demanda seja Elástica (vendas caem muito com aumento de preço) ou Inelástica (vendas caem pouco)? Justifique economicamente.

Ponto de Maximização: Explique o conceito de "Receita Marginal = Custo Marginal". Até que ponto podemos aumentar o preço antes que a queda no volume de vendas prejudique o lucro total?

Estratégia de Discriminação de Preços: Sugira formas de cobrar preços diferentes para clientes diferentes (ex: descontos para estudantes, versão premium, preços dinâmicos por horário) para capturar o máximo do "Excedente do Consumidor".`
    },
    {
        category: '16. Economia & Negócios',
        title: '16.2. Macroeconomia',
        description: 'Foco: Cenários e Planejamento Estratégico.',
        content: `Contexto: Atue como um Estrategista Econômico Global. Sou CEO de uma empresa que pretende [INSERIR AÇÃO: ex: Exportar para a Europa / Importar Peças da China / Contrair Empréstimo de Longo Prazo].

Tarefa: Analise os indicadores macroeconômicos de risco.

Câmbio e Inflação: Como a atual volatilidade da taxa de câmbio e a inflação projetada para o país [INSERIR PAÍS] afetam minha margem de lucro? Devo fazer um "Hedge" (proteção cambial)?

Taxa de Juros (Selic/Fed Funds): O Banco Central está com viés de alta ou baixa nos juros? Explique como isso impacta o custo do meu capital de giro e o consumo das famílias.

PIB e Setor: Dado que o PIB está projetado para crescer/encolher [INSERIR %], o meu setor ([INSERIR SETOR]) costuma crescer acima ou abaixo da média da economia (é cíclico ou anticíclico)?`
    },
    {
        category: '16. Economia & Negócios',
        title: '16.3. Contabilidade Básica',
        description: 'Foco: Saúde Financeira Real.',
        content: `Contexto: Atue como um Auditor Contábil e Analista de M&A (Fusões e Aquisições). Estou avaliando comprar ou investir na empresa [INSERIR NOME/TIPO], mas preciso saber se ela é saudável ou uma "bomba relógio".

Tarefa: Interprete as demonstrações financeiras além do óbvio.

Lucro vs. Caixa: O DRE mostra lucro líquido, mas o Fluxo de Caixa Operacional está negativo. Explique para um leigo o que isso significa (ex: a empresa vende mas não recebe? O estoque está encalhado?).

EBITDA: Calcule ou estime o EBITDA (Lucros antes de juros, impostos, depreciação e amortização). Por que esse indicador é melhor que o Lucro Líquido para medir a eficiência operacional pura do negócio?

Índices de Liquidez e Endividamento: A empresa tem capacidade de pagar suas dívidas de curto prazo (Liquidez Corrente)? O nível de alavancagem é perigoso para o setor de [INSERIR SETOR]?`
    },
    {
        category: '16. Economia & Negócios',
        title: '16.4. Empreendedorismo',
        description: 'Foco: Modelagem e Pitch.',
        content: `Contexto: Atue como um Investidor de Venture Capital (VC). Tenho uma ideia de startup: [DESCREVER IDEIA: ex: Uber para Passeadores de Cães / Marketplace de Obras de Arte].

Tarefa: Valide o modelo de negócio e crie a estrutura do Pitch Deck.

Value Proposition Canvas: Defina claramente qual é a "Dor do Cliente" (Pain) e qual é o "Analgésico" (Gain Creator) que seu produto oferece. Por que ninguém resolveu isso antes?

Business Model: Como essa empresa ganha dinheiro (Monetização)? É assinatura, comissão, freemium ou venda direta? Calcule o Unit Economics básico (quanto custa adquirir um cliente vs. quanto ele gasta).

Vantagem Injusta (Moat): O que impede o Google ou a Amazon de copiar sua ideia amanhã e te destruir? (Efeito de Rede? Propriedade Intelectual? Contratos Exclusivos?).`
    },
    {
        category: '16. Economia & Negócios',
        title: '16.5. Marketing e Vendas',
        description: 'Foco: Funil e Conversão.',
        content: `Contexto: Atue como um CMO (Chief Marketing Officer) e Especialista em Growth Hacking. Precisamos lançar o produto [INSERIR PRODUTO] com um orçamento limitado de [INSERIR ORÇAMENTO].

Tarefa: Desenhe a estratégia Go-To-Market (GTM).

Definição de Persona (ICP): Crie o perfil detalhado do cliente ideal. Onde ele consome conteúdo? Quais são seus medos e objeções de compra?

Funil de Vendas: Estruture a jornada do cliente: * Topo (Atração): Qual conteúdo viral ou anúncio usaremos? * Meio (Consideração): Qual "isca digital" ou demonstração faremos para capturar o lead? * Fundo (Decisão): Qual será a oferta irresistível e o gatilho de urgência para fechar a venda?

Métricas Chave (KPIs): Defina o CAC (Custo de Aquisição de Cliente) máximo aceitável e o LTV (Lifetime Value) esperado. A conta fecha?`
    },
    {
        category: '16. Economia & Negócios',
        title: '16.6. Investimentos',
        description: 'Foco: Alocação de Ativos e Risco.',
        content: `Contexto: Atue como um Consultor Financeiro de Wealth Management. O cliente tem [INSERIR IDADE] anos, patrimônio de [INSERIR VALOR] e perfil de risco [INSERIR PERFIL: ex: Conservador / Moderado / Arrojado]. O objetivo é [INSERIR META: ex: Independência Financeira em 10 anos].

Tarefa: Monte a carteira de investimentos ideal.

Asset Allocation: Defina a porcentagem ideal para Renda Fixa (Pós/Pré/Inflação), Ações Nacionais, Ações Internacionais (Dolarizadas) e Ativos Alternativos (FIIs/Cripto). Justifique cada fatia.

Seleção de Ativos: Quais tipos de ativos específicos (ex: Tesouro IPCA+, ETFs como IVVB11) você recomenda para compor essas fatias hoje, considerando o cenário econômico atual?

Rebalanceamento: Crie uma regra clara para quando o cliente deve vender o que subiu e comprar o que caiu para manter o risco controlado.`
    },
    {
        category: '16. Economia & Negócios',
        title: '16.7. Gestão de Pessoas / Liderança',
        description: 'Foco: Cultura e Conflito.',
        content: `Contexto: Atue como um Coach Executivo e Especialista em RH. Um gestor recém-promovido está enfrentando problemas com a equipe: [INSERIR PROBLEMA: ex: Baixa produtividade / Conflito entre gerações / Resistência ao retorno presencial].

Tarefa: Crie um plano de ação de liderança.

Diagnóstico de Cultura: O problema é de competência técnica (Hard Skill) ou comportamental (Soft Skill)? A cultura da empresa incentiva a competição tóxica ou a colaboração?

Feedback Estruturado (SCI): Escreva um roteiro de feedback para o líder usar com o funcionário problemático usando a técnica Situação-Comportamento-Impacto.

Segurança Psicológica: Como o líder pode criar um ambiente onde a equipe se sinta segura para errar e inovar (baseado no Projeto Aristóteles do Google), em vez de apenas obedecer ordens?`
    },
    {
        category: '16. Economia & Negócios',
        title: '16.8. Administração do Tempo',
        description: 'Foco: Produtividade Executiva.',
        content: `Contexto: Atue como um Mentor de Alta Performance. O cliente é um executivo C-Level ou Empreendedor que trabalha 14h por dia, está à beira do Burnout e sente que não produz nada estratégico, apenas "apaga incêndios".

Tarefa: Reorganize a rotina e o sistema de trabalho.

Matriz de Priorização: Ajude-o a classificar as tarefas da semana na Matriz de Eisenhower (Urgente vs Importante). O que deve ser delegado imediatamente?

Deep Work (Trabalho Profundo): Desenhe um bloco de agenda ideal. Como blindar 2 a 4 horas do dia para trabalho estratégico sem interrupções de Slack/E-mail?

Sistemas de Delegação: Crie um checklist para ele delegar tarefas. Não basta dizer "faça isso". Defina: O que é sucesso? Qual o prazo? Quais recursos estão disponíveis? Qual a autonomia dada?`
    },


    // --- 17. TECNOLOGIA E DIGITAL ---
    {
        category: '17. Tecnologia & Digital',
        title: '17.1. Lógica de Programação',
        description: 'Foco: Algoritmos e Otimização.',
        content: `Contexto: Atue como um Engenheiro de Software Sênior. Estamos enfrentando um problema de performance no nosso sistema de [INSERIR SISTEMA: ex: E-commerce / Logística de Entregas / Processamento de Dados].

Tarefa: Projete um algoritmo eficiente para resolver o gargalo.

Análise de Complexidade (Big O): O algoritmo atual de busca/ordenação está rodando em O(n²) e travando com muitos dados. Escreva (em pseudocódigo ou Python) uma solução otimizada que rode em O(n log n) ou O(n).

Estrutura de Dados: Qual estrutura é a mais adequada para armazenar esses dados em memória: Array, Lista Ligada, Tabela Hash ou Árvore Binária? Justifique a escolha baseada na velocidade de acesso e inserção necessária.

Edge Cases: Identifique 3 casos extremos (ex: entrada nula, lista vazia, números negativos) que poderiam quebrar o código e explique como tratá-los defensivamente.`
    },
    {
        category: '17. Tecnologia & Digital',
        title: '17.2. Hardware e Montagem',
        description: 'Foco: Arquitetura de Hardware e Gargalos.',
        content: `Contexto: Atue como um Arquiteto de Hardware e Sistemas. O cliente ([INSERIR PERFIL: ex: Estúdio de Renderização 3D / Gamer Competitivo / Data Center de IA]) tem um orçamento de [INSERIR VALOR] para montar uma máquina de alta performance.

Tarefa: Selecione os componentes e justifique a arquitetura.

Lista de Componentes (BOM): Especifique CPU, GPU, Placa-mãe (Chipset), RAM (Frequência/Latência) e Armazenamento (NVMe).

Análise de Gargalo (Bottleneck): Explique por que a CPU escolhida não vai limitar a performance da GPU (ou vice-versa) neste caso de uso específico.

Refrigeração e Energia: Calcule o TDP total do sistema. Indique se é necessário Water Cooler ou Air Cooler e qual a potência da fonte (PSU) necessária para manter a curva de eficiência energética segura.`
    },
    {
        category: '17. Tecnologia & Digital',
        title: '17.3. Redes e Internet',
        description: 'Foco: Infraestrutura e Troubleshooting.',
        content: `Contexto: Atue como um Engenheiro de Redes (CCNA/CCNP). Uma empresa de [INSERIR TAMANHO: ex: 50 funcionários] está reclamando de lentidão e quedas constantes na conexão Wi-Fi e cabeada.

Tarefa: Diagnostique e redesenhe a topologia de rede.

Modelo OSI: Utilize as camadas do Modelo OSI para isolar o problema. É um problema Físico (cabo ruim), de Enlace (Switch saturado), de Rede (Roteamento/IP) ou de Aplicação (DNS lento)?

Subnetting e DHCP: Projete o esquema de endereçamento IP. Como você dividiria as sub-redes para separar o tráfego do Financeiro, do Wi-Fi de Convidados e dos Servidores, garantindo segurança e performance?

Wi-Fi Corporativo: Explique a diferença entre usar vários Roteadores domésticos versus um sistema Mesh ou Access Points (APs) corporativos com Roaming gerenciado. Qual a solução ideal aqui?`
    },
    {
        category: '17. Tecnologia & Digital',
        title: '17.4. Segurança Digital',
        description: 'Foco: Defesa Cibernética e Prevenção.',
        content: `Contexto: Atue como um Especialista em Cibersegurança (Blue Team). Nossa empresa vai adotar o modelo de trabalho "Home Office" ou "BYOD" (Bring Your Own Device).

Tarefa: Crie a política de segurança para mitigar riscos.

Criptografia: Explique como implementar criptografia de disco (BitLocker/FileVault) e VPN para garantir que os dados não sejam interceptados em Wi-Fis públicos.

Engenharia Social: Crie um roteiro de treinamento para os funcionários identificarem um e-mail de Phishing sofisticado (Spear Phishing). Quais são os sinais de alerta no cabeçalho, link e remetente?

Autenticação (MFA): Por que senhas fortes não são mais suficientes? Defina a obrigatoriedade de Múltiplo Fator de Autenticação (MFA) e explique por que SMS é menos seguro que Apps Autenticadores ou chaves físicas (YubiKey).`
    },
    {
        category: '17. Tecnologia & Digital',
        title: '17.5. Inteligência Artificial',
        description: 'Foco: Implementação de Negócios.',
        content: `Contexto: Atue como um Arquiteto de Soluções de IA. Uma empresa de [INSERIR SETOR: ex: Atendimento ao Cliente / Jurídico / Marketing] quer usar IA Generativa (LLMs) para automatizar processos.

Tarefa: Desenhe a solução técnica e ética.

Prompt Engineering vs. Fine-Tuning: Para o problema de [INSERIR PROBLEMA: ex: Responder dúvidas frequentes], devemos apenas criar bons prompts num modelo pronto (GPT-4) ou treinar/ajustar um modelo próprio? Analise custo x benefício.

RAG (Retrieval-Augmented Generation): Explique como conectar a IA à base de dados interna da empresa para que ela não alucine informações, mas responda com base nos manuais reais da companhia.

Ética e Viés: Como garantiremos que a IA não dê respostas preconceituosas ou revele dados sensíveis dos clientes? Quais filtros de segurança devem ser implementados?`
    },
    {
        category: '17. Tecnologia & Digital',
        title: '17.6. Pacote Office / Produtividade',
        description: 'Foco: Análise de Dados e Automação.',
        content: `Contexto: Atue como um Analista de Business Intelligence (BI). Recebi uma planilha bruta com 50.000 linhas de vendas de uma rede de lojas desorganizada.

Tarefa: Transforme dados em decisão.

Limpeza de Dados (ETL): Descreva os passos para padronizar os dados (ex: remover duplicatas, corrigir nomes de cidades escritos errados, formatar datas) usando Power Query ou funções de texto.

Dashboard Dinâmico: Quais os 3 KPIs (Indicadores Chave) mais importantes para um Gerente de Vendas visualizar? Descreva como montar um gráfico dinâmico (Tabela Dinâmica) que permita filtrar por Região e Vendedor.

Automação: Como poderíamos usar uma Macro (VBA) ou Script para automatizar o envio desse relatório por e-mail toda segunda-feira de manhã?`
    },
    {
        category: '17. Tecnologia & Digital',
        title: '17.7. Design Gráfico',
        description: 'Foco: Identidade Visual e Psicologia.',
        content: `Contexto: Atue como um Diretor de Arte. Uma marca de [INSERIR TIPO: ex: Cosméticos Naturais / Banco Digital / Fast Food] quer fazer um Rebranding total para atingir um público mais [INSERIR PÚBLICO: ex: Sofisticado / Jovem / Consciente].

Tarefa: Construa o sistema de identidade visual.

Psicologia das Cores: Escolha a paleta de cores primária e secundária. Explique cientificamente por que essas cores despertam a emoção desejada (ex: Azul para confiança, Laranja para fome/impulso).

Tipografia e Hierarquia: Selecione uma família tipográfica (Serifa, Sans Serif, Manuscrita). Ela deve transmitir modernidade ou tradição? Como a hierarquia visual guiará o olhar do consumidor na embalagem ou no site?

Gestalt: Aplique um princípio da Gestalt (ex: Fechamento, Proximidade, Semelhança) na criação do novo logotipo para torná-lo memorável e simples.`
    },


    // --- 18. ARTES E CULTURA ---
    {
        category: '18. Artes & Cultura',
        title: '18.1. História da Arte',
        description: 'Foco: Curadoria e Análise Simbólica.',
        content: `Contexto: Atue como um Curador de Arte de um Museu Internacional. Estamos organizando uma exposição que conecta o movimento [INSERIR MOVIMENTO A: ex: Renascimento Italiano] com o [INSERIR MOVIMENTO B: ex: Modernismo Brasileiro].

Tarefa: Escreva o texto do catálogo da exposição comparando duas obras.

Análise Comparativa: Compare a obra [INSERIR OBRA A] com a obra [INSERIR OBRA B]. Como cada uma trata a luz, a perspectiva e a figura humana?

Contexto Histórico-Social: Como o contexto político/religioso da época de cada artista influenciou a mensagem da obra? O que a obra dizia sobre a sociedade daquele tempo?

Legado: Explique por que essas obras são consideradas "divisores de águas" na história da arte e como elas influenciam artistas visuais até hoje.`
    },
    {
        category: '18. Artes & Cultura',
        title: '18.2. Teoria Musical',
        description: 'Foco: Composição e Emoção.',
        content: `Contexto: Atue como um Produtor Musical e Compositor. Quero compor uma trilha sonora ou canção para [INSERIR FINALIDADE: ex: Uma Cena Triste de Filme / Um Jogo de Ação / Um Hit Pop]. A emoção desejada é [INSERIR EMOÇÃO: ex: Melancolia / Tensão / Euforia].

Tarefa: Estruture a harmonia e a dinâmica da música.

Progressão Harmônica: Sugira uma progressão de acordes (ex: ii-V-I) na tonalidade de [INSERIR TOM] que evoque essa emoção específica. Explique o uso de dissonâncias ou modulações.

Ritmo e Tempo: Qual deve ser o BPM (Batidas Por Minuto) e a fórmula de compasso (4/4, 6/8)? O ritmo deve ser síncopado ou direto?

Arranjo e Instrumentação: Quais instrumentos (Cordas, Sintetizadores, Percussão) devem entrar em qual momento para criar o clímax da música (crescendo)?`
    },
    {
        category: '18. Artes & Cultura',
        title: '18.3. Cinema e Audiovisual',
        description: 'Foco: Roteiro e Narrativa.',
        content: `Contexto: Atue como um Roteirista de Cinema (Screenwriter). Tenho uma ideia de filme do gênero [INSERIR GÊNERO: ex: Terror Psicológico / Comédia Romântica] sobre [INSERIR TEMA: ex: Inteligência Artificial / Primeiro Amor].

Tarefa: Desenvolva a estrutura narrativa usando o método "Save the Cat" ou "Jornada do Herói".

Logline: Crie uma frase de uma linha que resuma o filme e venda a ideia (o gancho).

Estrutura de Atos: * Ato 1: Qual é o "Incidente Incitante" que tira o protagonista da zona de conforto? * Ato 2: Quais são os obstáculos crescentes e o "Ponto Médio" (falsa vitória ou derrota)? * Ato 3: Como é o Clímax e a resolução final?

Arco do Personagem: Descreva a "Falha Trágica" (Fatal Flaw) do protagonista e como ele muda do início ao fim do filme.`
    },
    {
        category: '18. Artes & Cultura',
        title: '18.4. Cinema e Audiovisual',
        description: 'Foco: Direção e Mise-en-scène.',
        content: `Contexto: Atue como um Diretor de Cinema. Vamos filmar a cena crucial onde [DESCREVER AÇÃO: ex: O detetive descobre o assassino / O casal se separa]. O ambiente é [INSERIR LOCAL: ex: Um beco chuvoso / Um jantar de luxo].

Tarefa: Planeje a decupagem (Shot List) e a encenação.

Plano e Enquadramento: Liste os 3 planos principais para cobrir a cena (ex: Plano Geral para estabelecer, Plano Detalhe na mão tremendo, Plano Holandês para tensão). Justifique a escolha psicológica de cada ângulo.

Movimento de Câmera: A câmera deve estar estática (tripé), na mão (handheld) ou em trilho (dolly)? O que o movimento diz sobre o estado mental do personagem?

Direção de Atores: Qual é o "Subtexto" da cena? O que os personagens não estão dizendo, mas estão pensando? Dê uma instrução de atuação para o ator principal.`
    },
    {
        category: '18. Artes & Cultura',
        title: '18.5. Fotografia',
        description: 'Foco: Iluminação e Composição.',
        content: `Contexto: Atue como um Diretor de Fotografia. Vou realizar um ensaio fotográfico de [INSERIR TIPO: ex: Retrato Corporativo / Fotografia de Comida / Paisagem Urbana] no horário [INSERIR HORÁRIO: ex: Golden Hour / Meio-dia / Noite].

Tarefa: Desenhe o esquema de luz e composição.

Esquema de Luz: Descreva o setup de iluminação. Usaremos luz natural ou artificial (Flash/LED)? Se for estúdio, desenhe o esquema "Três Pontos de Luz" (Principal, Preenchimento, Recorte). Onde cada luz fica?

Composição: Como aplicar a "Regra dos Terços", "Linhas Guia" ou "Espaço Negativo" para tornar essa foto visualmente equilibrada?

Configuração da Câmera (Triângulo de Exposição): Sugira os valores ideais de ISO, Abertura (f/) e Velocidade do Obturador para obter [INSERIR EFEITO: ex: Fundo Desfocado (Bokeh) / Congelar Movimento / Rastro de Luz].`
    },
    {
        category: '18. Artes & Cultura',
        title: '18.6. Arquitetura e Urbanismo',
        description: 'Foco: História e Estilo.',
        content: `Contexto: Atue como um Historiador da Arquitetura. Estou diante de um edifício famoso: [INSERIR NOME OU ESTILO: ex: Catedral de Notre Dame / Edifício Copan / Uma Casa Modernista].

Tarefa: Analise a obra arquitetônica.

Identificação de Estilo: Quais elementos visuais (arcos, colunas, materiais, uso de vidro) definem esse prédio como pertencente ao estilo [INSERIR ESTILO: ex: Gótico / Brutalista / Art Déco]?

Função e Forma: Analise como a forma do edifício serve à sua função original. (Ex: As paredes grossas da igreja românica para proteção vs. As janelas em fita do modernismo para luz).

Impacto Urbano: Como esse edifício dialoga com a rua e a cidade ao redor? Ele é convidativo ou imponente/fechado?`
    },
    {
        category: '18. Artes & Cultura',
        title: '18.7. Arquitetura e Urbanismo',
        description: 'Foco: Projeto e Humanização.',
        content: `Contexto: Atue como um Urbanista e Paisagista. A prefeitura quer revitalizar uma praça ou área degradada em [INSERIR CIDADE/BAIRRO]. O objetivo é tornar o local seguro e conviviane.

Tarefa: Proponha um conceito de intervenção urbana.

Escala Humana: Como o projeto pode priorizar o pedestre em vez do carro? Sugira mudanças no calçamento, mobiliário urbano (bancos, lixeiras) e iluminação.

Fachada Ativa: Explique o conceito de "Olhos da Rua" de Jane Jacobs. Como incentivar comércios no térreo para aumentar a segurança natural?

Sustentabilidade: Proponha soluções de drenagem (jardins de chuva) e vegetação nativa para reduzir a temperatura local e evitar enchentes.`
    },
    {
        category: '18. Artes & Cultura',
        title: '18.8. Artes Visuais e Design',
        description: 'Foco: Psicologia da Imagem.',
        content: `Contexto: Atue como um Crítico de Cinema ou Designer Visual. Analise a paleta de cores e a estética do filme/obra [INSERIR NOME: ex: O Grande Hotel Budapeste / Matrix / Pinturas de Frida Kahlo].

Tarefa: Desconstrua a linguagem visual.

Paleta de Cores: Quais são as cores dominantes? Elas são complementares (opostas) ou análogas (vizinhas)? O que o uso do [INSERIR COR: ex: Verde / Vermelho] comunica sobre o sentimento da cena?

Simbolismo: Identifique um objeto ou elemento visual recorrente (Leitmotif visual) na obra e explique seu significado metafórico.

Composição Estática vs. Dinâmica: A imagem transmite calma e ordem (simetria) ou caos e energia (assimetria)? Como isso afeta a percepção do espectador?`
    },


    // --- 19. CRIAÇÃO DE GAMES ---
    {
        category: '19. Criação de Games',
        title: '19.1. Game Design e Mecânicas',
        description: 'Foco: Diversão e Retenção.',
        content: `Contexto: Atue como um Lead Game Designer Sênior (ex-Blizzard ou Riot). Tenho uma ideia de jogo do gênero [INSERIR GÊNERO: ex: MMORPG, Sobrevivência, Plataforma] com a temática [INSERIR TEMA: ex: Cyberpunk, Fantasia Medieval]. Preciso transformar essa ideia vaga em um sistema viciante e equilibrado. Tarefa: Desenhe o "Core Loop" (Loop Central) e o sistema de progressão.

O Loop Central (Core Loop): Todo jogo de sucesso tem um ciclo básico (ex: Matar Monstro -> Ganhar Ouro -> Comprar Espada Melhor -> Matar Monstro Maior). Desenhe o diagrama do ciclo de jogabilidade minuto-a-minuto do meu jogo. O que o jogador faz repetidamente que é divertido e gratificante?

Balanceamento e Economia (Game Economy): Como evitar que a economia do jogo quebre (inflação de ouro/itens)? Crie uma estrutura de "Sinks" (onde o jogador gasta dinheiro) e "Faucets" (onde o jogador ganha dinheiro) para manter o jogo desafiador a longo prazo.

Design de Recompensas (Psicologia): Como usar a psicologia comportamental (Skinner Box) para manter o jogador engajado? Defina os tipos de recompensas intrínsecas (maestria, diversão) e extrínsecas (skins, níveis, placares) que usaremos.`
    },
    {
        category: '19. Criação de Games',
        title: '19.2. Desenvolvimento de Jogos',
        description: 'Foco: Arquitetura Técnica e Multiplayer.',
        content: `Contexto: Atue como um Engenheiro de Gameplay e Redes. Estou desenvolvendo um jogo [INSERIR TIPO: Multiplayer Online / Single Player] usando a engine [INSERIR ENGINE: Unity, Unreal, Godot, Web/Three.js]. Preciso garantir que o jogo rode liso e, se for online, que não tenha "lag" ou trapaças. Tarefa: Defina a arquitetura técnica do jogo.

Arquitetura de Rede (Networking): (Se for Multiplayer) Devemos usar arquitetura Client-Server (seguro, anti-cheat) ou Peer-to-Peer (barato)? Explique como implementar "Client-Side Prediction" e "Lag Compensation" para que o jogador não sinta o atraso da internet.

Otimização de Performance: O jogo terá muitos objetos na tela. Quais técnicas de Culling (não renderizar o que não é visto), LOD (Level of Detail) e Object Pooling (reaproveitar memória) devo implementar para manter 60 FPS mesmo em PCs fracos?

Sistema de Saves e Persistência: Como salvar o progresso do jogador de forma segura? Desenhe a estrutura do JSON ou Banco de Dados para guardar inventário, posição e status, prevenindo que o jogador edite o arquivo localmente para trapacear.`
    }
];

module.exports = prompts;