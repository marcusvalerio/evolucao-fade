import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, CartesianGrid,
} from 'recharts'
import { BookOpen, MapPinned, Award, Lock } from 'lucide-react'
import { CATEGORIAS_BIBLIOTECA } from '../data/seed.js'
import { computeDiplomas } from '../data/diplomas.js'
import { pageVariants, Reveal, RevealItem } from '../components/motion.jsx'

const IMPERIO = '#2F4B3C'
const GRAPHITE = '#C7C3BA'

export default function MinhaEvolucao({ articles, observations, playbooks, produtos, readArticles = {}, setReadArticles }) {
  const readIds = useMemo(() => Object.keys(readArticles), [readArticles])
  const total = articles.length
  const lidos = readIds.length
  const progresso = total ? Math.round((lidos / total) * 100) : 0

  const porCategoria = useMemo(() => {
    return CATEGORIAS_BIBLIOTECA.map((cat) => {
      const daCategoria = articles.filter((a) => a.categoria === cat)
      const lidosDaCategoria = daCategoria.filter((a) => readIds.includes(a.id))
      const pct = daCategoria.length ? Math.round((lidosDaCategoria.length / daCategoria.length) * 100) : 0
      return { categoria: cat, progresso: pct, total: daCategoria.length }
    }).filter((c) => c.total > 0)
  }, [articles, readIds])

  const atividade = useMemo(() => {
    const eventos = [
      ...readIds.map((id) => readArticles[id]),
      ...observations.map((o) => o.data),
    ].filter(Boolean).sort()

    if (eventos.length === 0) return []

    const porDia = {}
    eventos.forEach((d) => { porDia[d] = (porDia[d] || 0) + 1 })

    let acumulado = 0
    return Object.keys(porDia).sort().map((dia) => {
      acumulado += porDia[dia]
      return { dia: dia.slice(5), total: acumulado }
    })
  }, [readIds, readArticles, observations])

  const diplomas = useMemo(
    () => computeDiplomas({ articles, observations, playbooks, produtos, readIds }),
    [articles, observations, playbooks, produtos, readIds]
  )
  const conquistados = diplomas.filter((d) => d.conquistado)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="eyebrow mb-2">Sua trilha</p>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">Minha Evolução</h1>
      </div>

      <section className="card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl tracking-wide">Progresso geral</h2>
          <span className="text-sm font-medium text-imperio">{progresso}%</span>
        </div>
        <div className="h-2 rounded-pill bg-graphite-100 dark:bg-graphite-700 overflow-hidden">
          <motion.div
            className="h-full bg-imperio rounded-pill"
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="text-xs text-graphite-500 mt-3">{lidos} de {total} artigos lidos</p>
      </section>

      {porCategoria.length > 0 && (
        <section className="card p-5 sm:p-6">
          <h2 className="font-display text-xl tracking-wide mb-4">Progresso por categoria</h2>
          <div className="h-[260px] sm:h-[300px] -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={porCategoria} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#8B877E' }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="categoria"
                  width={100}
                  tick={{ fontSize: 11, fill: '#4A473F' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(47,75,60,0.06)' }}
                  contentStyle={{ borderRadius: 12, border: '1px solid #E8E6E1', fontSize: 12 }}
                  formatter={(value) => [`${value}%`, 'Progresso']}
                />
                <Bar dataKey="progresso" radius={[0, 6, 6, 0]} maxBarSize={18}>
                  {porCategoria.map((entry, i) => (
                    <Cell key={i} fill={entry.progresso === 100 ? IMPERIO : GRAPHITE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {atividade.length > 1 && (
        <section className="card p-5 sm:p-6">
          <h2 className="font-display text-xl tracking-wide mb-4">Atividade acumulada</h2>
          <div className="h-[200px] -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={atividade} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAtividade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={IMPERIO} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={IMPERIO} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E6E1" />
                <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#8B877E' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#8B877E' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E8E6E1', fontSize: 12 }} />
                <Area type="monotone" dataKey="total" stroke={IMPERIO} strokeWidth={2} fill="url(#colorAtividade)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl tracking-wide">Diplomas</h2>
          <span className="text-xs text-graphite-500">{conquistados.length} de {diplomas.length}</span>
        </div>
        <Reveal className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {diplomas.map((d) => (
            <RevealItem key={d.id}>
              <div className={`card p-4 flex flex-col items-center text-center gap-2 h-full ${d.conquistado ? '' : 'opacity-50'}`}>
                {d.conquistado ? (
                  <Award size={22} className="text-imperio" strokeWidth={1.5} />
                ) : (
                  <Lock size={20} className="text-graphite-400" strokeWidth={1.5} />
                )}
                <p className="font-display text-sm tracking-wide leading-tight">{d.titulo}</p>
                <p className="text-[11px] text-graphite-500 leading-snug">{d.descricao}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="grid sm:grid-cols-2 gap-3">
        <div className="card p-4 flex items-center gap-3">
          <BookOpen size={16} className="text-imperio shrink-0" />
          <span className="text-sm">{articles.length} artigos na Biblioteca</span>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <MapPinned size={16} className="text-leather shrink-0" />
          <span className="text-sm">{observations.length} observações registradas</span>
        </div>
      </section>
    </motion.div>
  )
}
