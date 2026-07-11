import { BookOpen, MapPinned, CircleCheck, Circle } from 'lucide-react'

export default function MinhaEvolucao({ articles, observations }) {
  const total = articles.length
  const lidos = Math.min(total, Math.max(1, Math.floor(total * 0.4)))
  const progresso = total ? Math.round((lidos / total) * 100) : 0

  return (
    <div className="fade-in space-y-8 max-w-2xl">
      <div>
        <p className="eyebrow mb-2">Sua trilha</p>
        <h1 className="font-display text-4xl tracking-wide">Minha Evolução</h1>
      </div>

      <section className="card p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl tracking-wide">Progresso na Biblioteca</h2>
          <span className="text-sm font-medium text-imperio">{progresso}%</span>
        </div>
        <div className="h-2 rounded-pill bg-graphite-100 dark:bg-graphite-700 overflow-hidden">
          <div
            className="h-full bg-imperio rounded-pill transition-all duration-700 ease-smooth"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <p className="text-xs text-graphite-500 mt-3">{lidos} de {total} artigos explorados</p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide mb-4">Já explorado</h2>
        <div className="space-y-2">
          {articles.slice(0, lidos).map((a) => (
            <div key={a.id} className="card p-3.5 flex items-center gap-3">
              <CircleCheck size={16} className="text-imperio shrink-0" />
              <span className="text-sm">{a.titulo}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide mb-4">Ainda por explorar</h2>
        <div className="space-y-2">
          {articles.slice(lidos).map((a) => (
            <div key={a.id} className="card p-3.5 flex items-center gap-3 opacity-70">
              <Circle size={16} className="text-graphite-400 shrink-0" />
              <span className="text-sm">{a.titulo}</span>
            </div>
          ))}
          {articles.slice(lidos).length === 0 && (
            <p className="text-sm text-graphite-500">Você explorou tudo o que existe até agora — sua trilha crescerá com a plataforma.</p>
          )}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-3">
        <div className="card p-4 flex items-center gap-3">
          <BookOpen size={16} className="text-imperio" />
          <span className="text-sm">{articles.length} artigos na Biblioteca</span>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <MapPinned size={16} className="text-leather" />
          <span className="text-sm">{observations.length} observações registradas</span>
        </div>
      </section>
    </div>
  )
}
