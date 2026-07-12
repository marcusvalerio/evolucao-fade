import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, MapPinned, ArrowRight, Sparkles } from 'lucide-react'
import { pageVariants, Reveal, RevealItem, cardHover } from '../components/motion.jsx'
import AnimatedNumber from '../components/AnimatedNumber.jsx'

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  if (diff <= 0) return 'hoje'
  if (diff === 1) return 'ontem'
  return `${diff} dias atrás`
}

export default function Dashboard({ articles, observations, nome }) {
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.ultimaAtualizacao) - new Date(a.ultimaAtualizacao))
    .slice(0, 4)
  const recentObservations = [...observations]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 4)

  const hour = new Date().getHours()
  const saudacao = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  const primeiroNome = nome ? nome.trim().split(' ')[0] : ''

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <p className="eyebrow mb-2">{saudacao}{primeiroNome ? `, ${primeiroNome}` : ''}!</p>
        <h1 className="font-display text-3xl sm:text-5xl tracking-wide text-graphite-900 dark:text-cream">
          O que você quer evoluir hoje?
        </h1>
      </motion.div>

      <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { to: '/biblioteca', label: 'Biblioteca', icon: BookOpen },
          { to: '/observacoes', label: 'Observações', icon: MapPinned },
          { to: '/evolucao', label: 'Minha Evolução', icon: Sparkles },
          { to: '/playbooks', label: 'Playbooks', icon: ArrowRight },
        ].map(({ to, label, icon: Icon }) => (
          <RevealItem key={to} {...cardHover}>
            <Link to={to} className="card p-5 flex flex-col gap-3 h-full">
              <Icon size={18} className="text-imperio" strokeWidth={1.75} />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          </RevealItem>
        ))}
      </Reveal>

      <Reveal className="grid grid-cols-2 gap-3">
        <RevealItem className="card p-4 flex items-center gap-3">
          <BookOpen size={16} className="text-imperio shrink-0" />
          <span className="text-sm"><AnimatedNumber value={articles.length} /> artigos na Biblioteca</span>
        </RevealItem>
        <RevealItem className="card p-4 flex items-center gap-3">
          <MapPinned size={16} className="text-leather shrink-0" />
          <span className="text-sm"><AnimatedNumber value={observations.length} /> observações registradas</span>
        </RevealItem>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl tracking-wide">Últimos na Biblioteca</h2>
            <Link to="/biblioteca" className="text-xs text-imperio hover:underline">ver tudo</Link>
          </div>
          <div className="space-y-2">
            {recentArticles.map((a) => (
              <Link
                key={a.id}
                to={`/biblioteca/${a.id}`}
                className="card p-4 flex items-center gap-3 hover:shadow-softer transition-shadow duration-300"
              >
                <BookOpen size={16} className="text-imperio shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{a.titulo}</p>
                  <p className="text-xs text-graphite-500">{a.categoria} · {timeAgo(a.ultimaAtualizacao)}</p>
                </div>
              </Link>
            ))}
            {recentArticles.length === 0 && (
              <p className="text-sm text-graphite-500">Nenhum artigo ainda.</p>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl tracking-wide">Últimas Observações</h2>
            <Link to="/observacoes" className="text-xs text-imperio hover:underline">ver tudo</Link>
          </div>
          <div className="space-y-2">
            {recentObservations.map((o) => (
              <div key={o.id} className="card p-4 flex items-center gap-3">
                <MapPinned size={16} className="text-leather shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{o.local}</p>
                  <p className="text-xs text-graphite-500">{o.cidade} · {timeAgo(o.data)}</p>
                </div>
              </div>
            ))}
            {recentObservations.length === 0 && (
              <p className="text-sm text-graphite-500">Nenhuma observação ainda.</p>
            )}
          </div>
        </section>
      </div>

      <section className="card p-6">
        <h2 className="font-display text-xl tracking-wide mb-1">Sua trilha</h2>
        <p className="text-sm text-graphite-500 mb-4">
          Acompanhe o que já aprendeu e o que falta em <Link to="/evolucao" className="text-imperio hover:underline">Minha Evolução</Link>.
        </p>
      </section>
    </motion.div>
  )
}
