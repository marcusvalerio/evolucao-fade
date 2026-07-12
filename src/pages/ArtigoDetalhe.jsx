import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, CheckSquare, BookCheck, Circle } from 'lucide-react'
import { NIVEIS_CONFIABILIDADE } from '../data/seed.js'

export default function ArtigoDetalhe({ articles, setArticles, readArticles = {}, setReadArticles }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const artigo = articles.find((a) => a.id === id)
  const lido = Boolean(readArticles[id])

  function toggleLido() {
    if (!setReadArticles) return
    setReadArticles((prev) => {
      const next = { ...prev }
      if (next[id]) delete next[id]
      else next[id] = new Date().toISOString().slice(0, 10)
      return next
    })
  }

  if (!artigo) {
    return (
      <div className="fade-in text-center py-16">
        <p className="text-graphite-500 mb-4">Artigo não encontrado.</p>
        <Link to="/biblioteca" className="btn-secondary">Voltar à Biblioteca</Link>
      </div>
    )
  }

  const nivel = NIVEIS_CONFIABILIDADE.find((n) => n.id === artigo.confiabilidade)
  const relacionados = articles.filter((a) => artigo.relacionamentos?.includes(a.id))

  function excluir() {
    if (confirm(`Excluir "${artigo.titulo}"? Esta ação não pode ser desfeita.`)) {
      setArticles(articles.filter((a) => a.id !== id))
      navigate('/biblioteca')
    }
  }

  return (
    <article className="fade-in max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link to="/biblioteca" className="btn-ghost !px-0 gap-1.5">
          <ArrowLeft size={15} /> Biblioteca
        </Link>
        <div className="flex gap-2">
          <button
            onClick={toggleLido}
            className={lido ? 'btn-primary !py-2' : 'btn-secondary !py-2'}
          >
            {lido ? <BookCheck size={14} /> : <Circle size={14} />}
            <span className="hidden sm:inline">{lido ? 'Lido' : 'Marcar como lido'}</span>
          </button>
          <Link to={`/biblioteca/${id}/editar`} className="btn-secondary !py-2">
            <Pencil size={14} /> <span className="hidden sm:inline">Editar</span>
          </Link>
          <button onClick={excluir} className="btn-ghost !py-2 !text-leather">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="eyebrow !text-imperio">{artigo.categoria}</span>
          <span className={`badge ${nivel?.badge}`}>{nivel?.label}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide leading-tight">{artigo.titulo}</h1>
        <p className="text-lg text-graphite-500 leading-relaxed">{artigo.resumo}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {artigo.tags.map((t) => <span key={t} className="tag-chip">#{t}</span>)}
        </div>
      </header>

      <div className="grid sm:grid-cols-3 gap-4 py-4 border-y border-graphite-100 dark:border-graphite-700 text-sm">
        <div><p className="eyebrow mb-1">Autor</p><p>{artigo.autor}</p></div>
        <div><p className="eyebrow mb-1">Publicado</p><p>{artigo.data}</p></div>
        <div><p className="eyebrow mb-1">Atualizado</p><p>{artigo.ultimaAtualizacao}</p></div>
      </div>

      <section>
        <h2 className="font-display text-xl tracking-wide mb-2">Objetivo</h2>
        <p className="text-graphite-700 dark:text-graphite-300 leading-relaxed">{artigo.objetivo}</p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide mb-2">Conteúdo</h2>
        <p className="text-graphite-700 dark:text-graphite-300 leading-relaxed whitespace-pre-wrap">{artigo.conteudo}</p>
      </section>

      {artigo.checklist?.length > 0 && (
        <section>
          <h2 className="font-display text-xl tracking-wide mb-3">Checklist</h2>
          <ul className="space-y-2">
            {artigo.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <CheckSquare size={16} className="text-imperio shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <section>
          <h2 className="font-display text-lg tracking-wide mb-2">Boas práticas</h2>
          <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed">{artigo.boasPraticas || '—'}</p>
        </section>
        <section>
          <h2 className="font-display text-lg tracking-wide mb-2">Erros comuns</h2>
          <p className="text-sm text-graphite-700 dark:text-graphite-300 leading-relaxed">{artigo.errosComuns || '—'}</p>
        </section>
      </div>

      <section className="text-sm text-graphite-500 space-y-1 pt-2">
        <p><span className="font-medium text-graphite-700 dark:text-graphite-300">Referências: </span>{artigo.referencias || '—'}</p>
        <p><span className="font-medium text-graphite-700 dark:text-graphite-300">Fontes: </span>{artigo.fontes || '—'}</p>
      </section>

      {relacionados.length > 0 && (
        <section>
          <h2 className="font-display text-lg tracking-wide mb-3">Relacionados</h2>
          <div className="flex flex-wrap gap-2">
            {relacionados.map((r) => (
              <Link key={r.id} to={`/biblioteca/${r.id}`} className="tag-chip hover:border-imperio/50">
                {r.titulo}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
