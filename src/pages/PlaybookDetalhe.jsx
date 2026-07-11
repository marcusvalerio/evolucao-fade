import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Pencil, Trash2, CheckSquare } from 'lucide-react'
import { pageVariants, Reveal, RevealItem } from '../components/motion.jsx'

export default function PlaybookDetalhe({ playbooks, setPlaybooks }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const pb = playbooks.find((p) => p.id === id)

  if (!pb) {
    return (
      <div className="text-center py-16">
        <p className="text-graphite-500 mb-4">Playbook não encontrado.</p>
        <Link to="/playbooks" className="btn-secondary">Voltar</Link>
      </div>
    )
  }

  function excluir() {
    if (confirm(`Excluir "${pb.titulo}"?`)) {
      setPlaybooks(playbooks.filter((p) => p.id !== id))
      navigate('/playbooks')
    }
  }

  return (
    <motion.article variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/playbooks" className="btn-ghost !px-0 gap-1.5">
          <ArrowLeft size={15} /> Playbooks
        </Link>
        <div className="flex gap-2">
          <Link to={`/playbooks/${id}/editar`} className="btn-secondary !py-2">
            <Pencil size={14} /> Editar
          </Link>
          <button onClick={excluir} className="btn-ghost !py-2 !text-leather">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <header className="space-y-3">
        <span className="eyebrow !text-imperio">{pb.etapa}</span>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide leading-tight">{pb.titulo}</h1>
        <p className="text-lg text-graphite-500 leading-relaxed">{pb.quandoUsar}</p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4 py-4 border-y border-graphite-100 dark:border-graphite-700 text-sm">
        <div><p className="eyebrow mb-1">Responsável</p><p>{pb.responsavel}</p></div>
        <div><p className="eyebrow mb-1">Atualizado</p><p>{pb.ultimaAtualizacao}</p></div>
      </div>

      <section>
        <h2 className="font-display text-xl tracking-wide mb-4">Passo a passo</h2>
        <Reveal className="space-y-3">
          {pb.passos.map((passo, i) => (
            <RevealItem key={i} className="flex items-start gap-4">
              <span className="shrink-0 w-7 h-7 rounded-full bg-imperio-tint dark:bg-imperio/20 text-imperio-dark dark:text-imperio-light text-xs font-display flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed pt-0.5">{passo}</p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {pb.checklist?.length > 0 && (
        <section>
          <h2 className="font-display text-xl tracking-wide mb-3">Checklist</h2>
          <ul className="space-y-2">
            {pb.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <CheckSquare size={16} className="text-imperio shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="font-display text-lg tracking-wide mb-2">Erros comuns</h2>
        <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed">{pb.errosComuns || '—'}</p>
      </section>
    </motion.article>
  )
}
