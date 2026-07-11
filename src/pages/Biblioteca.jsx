import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, BookOpen } from 'lucide-react'
import { CATEGORIAS_BIBLIOTECA, NIVEIS_CONFIABILIDADE } from '../data/seed.js'

export default function Biblioteca({ articles }) {
  const [categoria, setCategoria] = useState('Todas')
  const [confiabilidade, setConfiabilidade] = useState('Todas')
  const [tagFilter, setTagFilter] = useState(null)

  const allTags = useMemo(() => {
    const set = new Set()
    articles.forEach((a) => a.tags.forEach((t) => set.add(t)))
    return Array.from(set).slice(0, 12)
  }, [articles])

  const filtered = articles.filter((a) => {
    if (categoria !== 'Todas' && a.categoria !== categoria) return false
    if (confiabilidade !== 'Todas' && a.confiabilidade !== confiabilidade) return false
    if (tagFilter && !a.tags.includes(tagFilter)) return false
    return true
  })

  const nivelInfo = (id) => NIVEIS_CONFIABILIDADE.find((n) => n.id === id)

  return (
    <div className="fade-in space-y-7">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Sistema de conhecimento</p>
          <h1 className="font-display text-4xl tracking-wide">Biblioteca</h1>
        </div>
        <Link to="/biblioteca/novo" className="btn-primary">
          <Plus size={16} /> Novo artigo
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="input !w-auto py-2"
        >
          <option>Todas</option>
          {CATEGORIAS_BIBLIOTECA.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          value={confiabilidade}
          onChange={(e) => setConfiabilidade(e.target.value)}
          className="input !w-auto py-2"
        >
          <option value="Todas">Todos os níveis</option>
          {NIVEIS_CONFIABILIDADE.map((n) => <option key={n.id} value={n.id}>{n.label}</option>)}
        </select>
        {tagFilter && (
          <button onClick={() => setTagFilter(null)} className="tag-chip !bg-imperio-tint !text-imperio-dark">
            #{tagFilter} ✕
          </button>
        )}
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((t) => (
            <button key={t} onClick={() => setTagFilter(t)} className="tag-chip hover:border-imperio/50 transition-colors">
              #{t}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <BookOpen size={22} className="mx-auto text-graphite-500 mb-3" strokeWidth={1.5} />
          <p className="text-sm text-graphite-500">Nenhum artigo encontrado com esses filtros.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a) => {
            const nivel = nivelInfo(a.confiabilidade)
            return (
              <Link
                key={a.id}
                to={`/biblioteca/${a.id}`}
                className="card p-5 flex flex-col gap-3 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 ease-smooth"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow !text-imperio">{a.categoria}</span>
                  <span className={`badge ${nivel?.badge}`}>{nivel?.label}</span>
                </div>
                <h3 className="font-display text-xl tracking-wide leading-tight">{a.titulo}</h3>
                <p className="text-sm text-graphite-500 line-clamp-2">{a.resumo}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {a.tags.slice(0, 3).map((t) => (
                    <span key={t} className="tag-chip">#{t}</span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
