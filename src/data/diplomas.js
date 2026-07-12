import { CATEGORIAS_BIBLIOTECA } from './seed.js'

// Cada diploma define seu próprio critério de conquista com base nos dados reais
// da plataforma — nada é fixo ou fake, tudo é calculado a partir do uso.
export function computeDiplomas({ articles, observations, playbooks, produtos, readIds }) {
  const totalLidos = readIds.length

  const diplomas = [
    {
      id: 'primeira-leitura',
      titulo: 'Primeira Leitura',
      descricao: 'Leu o primeiro artigo da Biblioteca.',
      conquistado: totalLidos >= 1,
    },
    {
      id: 'explorador',
      titulo: 'Explorador da Biblioteca',
      descricao: 'Leu 5 artigos ou mais.',
      conquistado: totalLidos >= 5,
    },
    {
      id: 'observador-de-campo',
      titulo: 'Observador de Campo',
      descricao: 'Registrou 3 observações de campo ou mais.',
      conquistado: observations.length >= 3,
    },
    {
      id: 'gerador-de-ideias',
      titulo: 'Gerador de Ideias',
      descricao: 'Transformou uma observação em ideia para a FADE.',
      conquistado: observations.some((o) => o.promovidoAIdeia),
    },
    {
      id: 'primeiro-playbook',
      titulo: 'Arquiteto de Processos',
      descricao: 'Criou o primeiro playbook.',
      conquistado: playbooks.length >= 1,
    },
    {
      id: 'ficha-tecnica',
      titulo: 'Especialista em Produto',
      descricao: 'Cadastrou a ficha técnica do primeiro produto.',
      conquistado: produtos.length >= 1,
    },
    {
      id: 'biblioteca-completa',
      titulo: 'Biblioteca Dominada',
      descricao: 'Leu todos os artigos disponíveis na Biblioteca.',
      conquistado: articles.length > 0 && totalLidos >= articles.length,
    },
  ]

  CATEGORIAS_BIBLIOTECA.forEach((cat) => {
    const daCategoria = articles.filter((a) => a.categoria === cat)
    if (daCategoria.length === 0) return
    const lidosDaCategoria = daCategoria.filter((a) => readIds.includes(a.id))
    diplomas.push({
      id: `categoria-${cat}`,
      titulo: `Referência em ${cat}`,
      descricao: `Leu todo o conteúdo de ${cat} na Biblioteca.`,
      conquistado: lidosDaCategoria.length === daCategoria.length,
    })
  })

  return diplomas
}
