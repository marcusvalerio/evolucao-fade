import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Plus } from 'lucide-react'
import { NIVEIS_CONFIABILIDADE } from '../data/seed.js'
import { pageVariants, Reveal, RevealItem, cardHover } from '../components/motion.jsx'

export default function CategoriaModulo({ categoria, titulo, descricao, icon: Icon, articles }) {
  const filtrados = articles.filter((a) => a.categoria === categoria)
  const nivelInfo = (id) => NIVEIS_CONFIABILIDADE.find((n) => n.id === id)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-7">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-2 flex items-center gap-1.5">{Icon && <Icon size={12} />} Módulo</p>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">{titulo}</h1>
          <p className="text-sm text-graphite-500 mt-2 max-w-lg">{descricao}</p>
        </div>
        <Link to="/biblioteca/novo" className="btn-primary">
          <Plus size={16} /> Novo artigo
        </Link>
      </div>

      {filtrados.length === 0 ? (
        <div className="card p-10 text-center">
          <BookOpen size={22} className="mx-auto text-graphite-500 mb-3" strokeWidth={1.5} />
          <p className="text-sm text-graphite-500">Nenhum conteúdo em {titulo} ainda. Crie o primeiro artigo desta categoria na Biblioteca.</p>
        </div>
      ) : (
        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtrados.map((a) => {
            const nivel = nivelInfo(a.confiabilidade)
            return (
              <RevealItem key={a.id} {...cardHover}>
                <Link to={`/biblioteca/${a.id}`} className="card p-5 flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between">
                    <span className={`badge ${nivel?.badge}`}>{nivel?.label}</span>
                  </div>
                  <h3 className="font-display text-xl tracking-wide leading-tight">{a.titulo}</h3>
                  <p className="text-sm text-graphite-500 line-clamp-2">{a.resumo}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                    {a.tags.slice(0, 3).map((t) => <span key={t} className="tag-chip">#{t}</span>)}
                  </div>
                </Link>
              </RevealItem>
            )
          })}
        </Reveal>
      )}
    </motion.div>
  )
}
