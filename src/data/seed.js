// Conteúdo de demonstração — substitua pelos artigos, playbooks e observações
// reais da FADE House. Cada item de exemplo está marcado com nível de
// confiabilidade "Hipótese" ou "Procedimento interno" para deixar claro
// que é conteúdo placeholder, nunca "Conhecimento verificado".

export const CATEGORIAS_BIBLIOTECA = [
  'Hospitalidade',
  'Operação',
  'Liderança',
  'Marketing',
  'Produtos',
  'Arquitetura',
  'Treinamentos',
]

export const NIVEIS_CONFIABILIDADE = [
  { id: 'verificado', label: 'Conhecimento verificado', badge: 'badge-verificado' },
  { id: 'procedimento', label: 'Procedimento interno', badge: 'badge-procedimento' },
  { id: 'hipotese', label: 'Hipótese', badge: 'badge-hipotese' },
]

export const CATEGORIAS_OBSERVACAO = [
  'Barbearia',
  'Hotel',
  'Cafeteria',
  'Restaurante',
  'Loja',
  'Empresa',
]

export const seedArticles = [
  {
    id: 'art-demo-1',
    titulo: 'Exemplo — Estrutura de um bom primeiro atendimento',
    resumo: 'Modelo de artigo para você editar: como estruturar o roteiro do primeiro contato com o cliente.',
    objetivo: 'Servir de modelo de formatação. Substitua por conteúdo real da FADE.',
    conteudo: 'Este é um artigo de exemplo criado para demonstrar a estrutura da Biblioteca. Edite ou exclua este conteúdo e crie os artigos reais da FADE House aqui.',
    checklist: ['Recepcionar o cliente pelo nome', 'Oferecer água ou café', 'Confirmar o serviço agendado'],
    boasPraticas: 'Mantenha contato visual e tom de voz calmo durante todo o atendimento.',
    errosComuns: 'Deixar o cliente esperando sem sinalizar o tempo estimado.',
    referencias: 'Baseado em práticas gerais de hospitalidade — validar com a liderança da FADE.',
    fontes: 'Conteúdo de demonstração, sem fonte externa real.',
    autor: 'Equipe FADE',
    data: new Date().toISOString().slice(0, 10),
    ultimaAtualizacao: new Date().toISOString().slice(0, 10),
    tags: ['exemplo', 'atendimento', 'hospitalidade'],
    relacionamentos: [],
    categoria: 'Hospitalidade',
    confiabilidade: 'hipotese',
  },
]

export const seedObservations = [
  {
    id: 'obs-demo-1',
    local: 'Exemplo — Barbearia de referência',
    cidade: 'Rio de Janeiro',
    categoria: 'Barbearia',
    fotos: [],
    gostei: 'Este é um registro de exemplo. Edite ou exclua e crie suas observações reais aqui.',
    naoGostei: '—',
    podeInspirar: '—',
    jamaisFaria: '—',
    nota: 4,
    data: new Date().toISOString().slice(0, 10),
    autor: 'Equipe FADE',
    promovidoAIdeia: false,
  },
]
