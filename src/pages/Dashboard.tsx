import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { Card, NotaBadge, SeloConfiabilidade } from '../components/ui/Primitivos'
import { MODULOS, MODULO_LABEL } from '../data/modulos'
import { ARTIGOS_SEED } from '../data/artigosSeed'

function saudacao() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function Dashboard() {
  const { artigos, observacoes, trilha } = useData()
  const recentesArtigos = [...artigos]
    .sort((a, b) => (a.ultimaAtualizacao < b.ultimaAtualizacao ? 1 : -1))
    .slice(0, 4)
  const recentesObs = [...observacoes].sort((a, b) => (a.data < b.data ? 1 : -1)).slice(0, 3)
  const concluidos = trilha.filter((t) => t.concluido).length
  const total = ARTIGOS_SEED.length
  const atalhos = MODULOS.filter((m) => ['biblioteca', 'playbooks', 'campo', 'evolucao'].includes(m.key))

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
        </p>
        <h1 className="mt-1.5 font-[var(--font-display)] text-4xl tracking-wide text-[var(--text-primary)] sm:text-5xl">
          {saudacao()}.
        </h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[var(--text-secondary)]">
          O cérebro operacional da FADE House. Tudo o que a casa sabe, vive aqui.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {atalhos.map((a) => (
          <Link
            key={a.key}
            to={a.path}
            className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-[0_8px_24px_rgba(20,18,15,0.06)]"
          >
            <a.icon size={20} className="text-[var(--accent)]" strokeWidth={1.75} />
            <span className="font-[var(--font-condensed)] text-base font-medium text-[var(--text-primary)]">
              {a.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-[var(--font-condensed)] text-lg font-semibold text-[var(--text-primary)]">
              Adicionado recentemente
            </h2>
            <Link to="/biblioteca" className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
              ver biblioteca <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentesArtigos.map((a) => (
              <Link key={a.id} to={`/artigo/${a.id}`}>
                <Card className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-[var(--font-condensed)] text-base font-medium text-[var(--text-primary)]">
                      {a.titulo}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">{MODULO_LABEL[a.modulo]}</p>
                  </div>
                  <SeloConfiabilidade nivel={a.nivelConfiabilidade} />
                </Card>
              </Link>
            ))}
          </div>

          <div className="mb-3 mt-8 flex items-center justify-between">
            <h2 className="font-[var(--font-condensed)] text-lg font-semibold text-[var(--text-primary)]">
              Últimas observações de campo
            </h2>
            <Link to="/campo" className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
              ver todas <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentesObs.map((o) => (
              <Card key={o.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate font-[var(--font-condensed)] text-base font-medium text-[var(--text-primary)]">
                    {o.local}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">{o.cidade}</p>
                </div>
                <NotaBadge nota={o.nota} />
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-[var(--font-condensed)] text-lg font-semibold text-[var(--text-primary)]">
            Sua evolução
          </h2>
          <Card className="p-5">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="font-[var(--font-display)] text-4xl tracking-wide text-[var(--accent)]">
                {concluidos}
              </span>
              <span className="text-sm text-[var(--text-tertiary)]">de {total} conteúdos concluídos</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-elevated)]">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all duration-700"
                style={{ width: `${total ? (concluidos / total) * 100 : 0}%` }}
              />
            </div>
            <Link
              to="/evolucao"
              className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:opacity-80"
            >
              Continuar trilha <ArrowUpRight size={14} />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
