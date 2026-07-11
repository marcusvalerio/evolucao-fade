import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, BookOpen, MapPinned, CornerDownLeft } from 'lucide-react'

export default function CommandSearch({ open, onClose, articles, observations }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { articles: [], observations: [] }
    const matchArticle = (a) =>
      a.titulo.toLowerCase().includes(q) ||
      a.resumo.toLowerCase().includes(q) ||
      a.categoria.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
    const matchObs = (o) =>
      o.local.toLowerCase().includes(q) ||
      o.cidade.toLowerCase().includes(q) ||
      o.categoria.toLowerCase().includes(q) ||
      o.gostei.toLowerCase().includes(q)
    return {
      articles: articles.filter(matchArticle).slice(0, 6),
      observations: observations.filter(matchObs).slice(0, 6),
    }
  }, [query, articles, observations])

  if (!open) return null

  const hasResults = results.articles.length > 0 || results.observations.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-graphite-900/40 backdrop-blur-sm fade-in" onClick={onClose}>
      <div
        className="w-full max-w-xl card !bg-white dark:!bg-graphite-800 shadow-soft overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-graphite-100 dark:border-graphite-700">
          <Search size={18} className="text-graphite-500 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artigos, observações, tags..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-graphite-500/70"
          />
          <kbd className="hidden sm:inline text-[10px] text-graphite-500 border border-graphite-300 dark:border-graphite-600 rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {!query && (
            <p className="text-sm text-graphite-500 px-3 py-6 text-center">
              Digite para buscar em toda a plataforma.
            </p>
          )}

          {query && !hasResults && (
            <p className="text-sm text-graphite-500 px-3 py-6 text-center">
              Nada encontrado para "{query}".
            </p>
          )}

          {results.articles.length > 0 && (
            <div className="mb-1">
              <p className="eyebrow px-3 py-2">Biblioteca</p>
              {results.articles.map((a) => (
                <button
                  key={a.id}
                  onClick={() => { navigate(`/biblioteca/${a.id}`); onClose() }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-imperio-tint dark:hover:bg-imperio/10 transition-colors duration-200 group"
                >
                  <BookOpen size={16} className="text-imperio shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium truncate">{a.titulo}</span>
                    <span className="block text-xs text-graphite-500 truncate">{a.categoria}</span>
                  </span>
                  <CornerDownLeft size={13} className="opacity-0 group-hover:opacity-50 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {results.observations.length > 0 && (
            <div>
              <p className="eyebrow px-3 py-2">Observações de Campo</p>
              {results.observations.map((o) => (
                <button
                  key={o.id}
                  onClick={() => { navigate('/observacoes'); onClose() }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-imperio-tint dark:hover:bg-imperio/10 transition-colors duration-200 group"
                >
                  <MapPinned size={16} className="text-leather shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium truncate">{o.local}</span>
                    <span className="block text-xs text-graphite-500 truncate">{o.cidade} · {o.categoria}</span>
                  </span>
                  <CornerDownLeft size={13} className="opacity-0 group-hover:opacity-50 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
