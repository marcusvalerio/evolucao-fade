import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FlaskConical, Lightbulb, MapPin } from 'lucide-react'
import { pageVariants, Reveal, RevealItem, cardHover } from '../components/motion.jsx'

export default function Laboratorio({ articles, observations }) {
  const hipoteses = articles.filter((a) => a.confiabilidade === 'hipotese')
  const ideias = observations.filter((o) => o.promovidoAIdeia)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-10">
      <div>
        <p className="eyebrow mb-2 flex items-center gap-1.5"><FlaskConical size={12} /> Experimentação</p>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">Laboratório</h1>
        <p className="text-sm text-graphite-500 mt-2 max-w-lg">
          Hipóteses em teste antes de virarem procedimento oficial, e ideias nascidas de Observações de Campo.
        </p>
      </div>

      <section>
        <h2 className="font-display text-xl tracking-wide mb-4">Hipóteses em teste</h2>
        {hipoteses.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-sm text-graphite-500">Nenhuma hipótese registrada. Artigos marcados como "Hipótese" na Biblioteca aparecem aqui.</p>
          </div>
        ) : (
          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hipoteses.map((a) => (
              <RevealItem key={a.id} {...cardHover}>
                <Link to={`/biblioteca/${a.id}`} className="card p-5 flex flex-col gap-3 h-full">
                  <span className="badge badge-hipotese self-start">Hipótese</span>
                  <h3 className="font-display text-lg tracking-wide leading-tight">{a.titulo}</h3>
                  <p className="text-sm text-graphite-500 line-clamp-2">{a.resumo}</p>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide mb-4 flex items-center gap-2">
          <Lightbulb size={17} className="text-imperio" /> Backlog de ideias
        </h2>
        {ideias.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-sm text-graphite-500">
              Nenhuma ideia ainda. Em <Link to="/observacoes" className="text-imperio hover:underline">Observações de Campo</Link>, use "Transformar em ideia" para alimentar este backlog.
            </p>
          </div>
        ) : (
          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ideias.map((o) => (
              <RevealItem key={o.id} {...cardHover}>
                <div className="card p-5 flex flex-col gap-2 h-full">
                  <span className="eyebrow !text-leather">{o.categoria}</span>
                  <h3 className="font-display text-lg tracking-wide leading-tight">{o.local}</h3>
                  <p className="text-xs text-graphite-500 flex items-center gap-1"><MapPin size={11} /> {o.cidade}</p>
                  <p className="text-sm text-graphite-700 dark:text-graphite-300 line-clamp-2">{o.podeInspirar}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </section>
    </motion.div>
  )
}
