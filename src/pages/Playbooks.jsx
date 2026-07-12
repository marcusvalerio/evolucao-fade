import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, ClipboardList } from 'lucide-react'
import { ETAPAS_PLAYBOOK } from '../data/seed.js'
import { pageVariants, Reveal, RevealItem, cardHover } from '../components/motion.jsx'

export default function Playbooks({ playbooks }) {
  const [etapa, setEtapa] = useState('Todas')
  const filtered = etapa === 'Todas' ? playbooks : playbooks.filter((p) => p.etapa === etapa)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-7">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Procedimentos da FADE</p>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">Playbooks</h1>
          <p className="text-sm text-graphite-500 mt-2 max-w-lg">
            Cada procedimento — do primeiro atendimento ao desligamento — documentado passo a passo.
          </p>
        </div>
        <Link to="/playbooks/novo" className="btn-primary">
          <Plus size={16} /> Novo playbook
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setEtapa('Todas')}
          className={`tag-chip transition-colors ${etapa === 'Todas' ? '!bg-imperio-tint !text-imperio-dark !border-imperio/30' : ''}`}
        >
          Todas
        </button>
        {ETAPAS_PLAYBOOK.map((e) => (
          <button
            key={e}
            onClick={() => setEtapa(e)}
            className={`tag-chip transition-colors ${etapa === e ? '!bg-imperio-tint !text-imperio-dark !border-imperio/30' : ''}`}
          >
            {e}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <ClipboardList size={22} className="mx-auto text-graphite-500 mb-3" strokeWidth={1.5} />
          <p className="text-sm text-graphite-500">Nenhum playbook nessa etapa ainda.</p>
        </div>
      ) : (
        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" key={etapa}>
          {filtered.map((p) => (
            <RevealItem key={p.id} {...cardHover}>
              <Link to={`/playbooks/${p.id}`} className="card p-5 flex flex-col gap-3 h-full">
                <span className="eyebrow !text-imperio">{p.etapa}</span>
                <h3 className="font-display text-xl tracking-wide leading-tight">{p.titulo}</h3>
                <p className="text-sm text-graphite-500 line-clamp-2">{p.quandoUsar}</p>
                <p className="text-xs text-graphite-500 mt-auto pt-1">{p.passos.length} passos · {p.responsavel}</p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      )}
    </motion.div>
  )
}
