import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { pageVariants } from '../components/motion.jsx'

export default function ProdutoDetalhe({ produtos, setProdutos }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const p = produtos.find((x) => x.id === id)

  if (!p) {
    return (
      <div className="text-center py-16">
        <p className="text-graphite-500 mb-4">Produto não encontrado.</p>
        <Link to="/produtos" className="btn-secondary">Voltar</Link>
      </div>
    )
  }

  function excluir() {
    if (confirm(`Excluir "${p.nome}"?`)) {
      setProdutos(produtos.filter((x) => x.id !== id))
      navigate('/produtos')
    }
  }

  return (
    <motion.article variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/produtos" className="btn-ghost !px-0 gap-1.5">
          <ArrowLeft size={15} /> Produtos
        </Link>
        <div className="flex gap-2">
          <Link to={`/produtos/${id}/editar`} className="btn-secondary !py-2">
            <Pencil size={14} /> Editar
          </Link>
          <button onClick={excluir} className="btn-ghost !py-2 !text-leather">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <header className="space-y-3">
        <span className="eyebrow !text-leather">{p.categoria}</span>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide leading-tight">{p.nome}</h1>
        <p className="text-lg text-graphite-500 leading-relaxed">{p.descricao}</p>
      </header>

      <div className="grid sm:grid-cols-2 gap-6">
        <section>
          <h2 className="font-display text-lg tracking-wide mb-2">Ingredientes</h2>
          <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed">{p.ingredientes || '—'}</p>
        </section>
        <section>
          <h2 className="font-display text-lg tracking-wide mb-2">Fragrância</h2>
          <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed">{p.fragrancia || '—'}</p>
        </section>
        <section>
          <h2 className="font-display text-lg tracking-wide mb-2">Como utilizar</h2>
          <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed">{p.comoUtilizar || '—'}</p>
        </section>
        <section>
          <h2 className="font-display text-lg tracking-wide mb-2">Como vender</h2>
          <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed">{p.comoVender || '—'}</p>
        </section>
        <section>
          <h2 className="font-display text-lg tracking-wide mb-2">Indicação</h2>
          <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed">{p.indicacao || '—'}</p>
        </section>
        <section>
          <h2 className="font-display text-lg tracking-wide mb-2">Contraindicações</h2>
          <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed">{p.contraindicacoes || '—'}</p>
        </section>
      </div>

      <section className="pt-2 border-t border-graphite-100 dark:border-graphite-700">
        <p className="text-sm text-graphite-500">
          <span className="font-medium text-graphite-700 dark:text-graphite-300">Referência oficial: </span>
          {p.referenciaOficial || '—'}
        </p>
      </section>
    </motion.article>
  )
}
