import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, User } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { SeloConfiabilidade, Tag } from '../components/ui/Primitivos'
import { MODULO_LABEL } from '../data/modulos'
import { EstadoVazio } from '../components/EstadoVazio'

function formatarData(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function ArtigoDetalhe() {
  const { id } = useParams()
  const { artigos } = useData()
  const navigate = useNavigate()
  const artigo = artigos.find((a) => a.id === id)

  if (!artigo) {
    return <EstadoVazio titulo="Artigo não encontrado" descricao="Ele pode ter sido removido ou o link está incorreto." />
  }

  const relacionados = artigos.filter((a) => artigo.relacionados.includes(a.id))

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={15} /> Voltar
      </button>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--accent)]">
          {MODULO_LABEL[artigo.modulo]}
        </span>
        <SeloConfiabilidade nivel={artigo.nivelConfiabilidade} />
      </div>

      <h1 className="font-[var(--font-display)] text-4xl leading-tight tracking-wide text-[var(--text-primary)] sm:text-5xl">
        {artigo.titulo}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">{artigo.resumo}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-[var(--border)] py-4 text-sm text-[var(--text-tertiary)]">
        <span className="flex items-center gap-1.5">
          <User size={14} /> {artigo.autor}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} /> Atualizado em {formatarData(artigo.ultimaAtualizacao)}
        </span>
      </div>

      <section className="mt-8">
        <h2 className="mb-2 font-[var(--font-condensed)] text-sm font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
          Objetivo
        </h2>
        <p className="leading-relaxed text-[var(--text-primary)]">{artigo.objetivo}</p>
      </section>

      <section className="mt-8">
        <h2 className="mb-2 font-[var(--font-condensed)] text-sm font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
          Conteúdo
        </h2>
        <p className="whitespace-pre-line leading-[1.8] text-[var(--text-primary)]">{artigo.conteudo}</p>
      </section>

      {artigo.checklist.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-[var(--font-condensed)] text-sm font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            Checklist
          </h2>
          <ul className="space-y-2">
            {artigo.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[var(--text-primary)]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {artigo.boasPraticas.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-[var(--font-condensed)] text-sm font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            Boas práticas
          </h2>
          <ul className="space-y-2">
            {artigo.boasPraticas.map((item, i) => (
              <li key={i} className="text-[var(--text-primary)]">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {artigo.errosComuns.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-[var(--font-condensed)] text-sm font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            Erros comuns
          </h2>
          <ul className="space-y-2">
            {artigo.errosComuns.map((item, i) => (
              <li key={i} className="text-[var(--color-couro-600)] dark:text-[var(--color-couro-400)]">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(artigo.referencias.length > 0 || artigo.fontes.length > 0) && (
        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          {artigo.referencias.length > 0 && (
            <div>
              <h2 className="mb-2 font-[var(--font-condensed)] text-sm font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
                Referências
              </h2>
              <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                {artigo.referencias.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
          {artigo.fontes.length > 0 && (
            <div>
              <h2 className="mb-2 font-[var(--font-condensed)] text-sm font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
                Fontes
              </h2>
              <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                {artigo.fontes.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <div className="mt-8 flex flex-wrap gap-1.5">
        {artigo.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {relacionados.length > 0 && (
        <section className="mt-12 border-t border-[var(--border)] pt-6">
          <h2 className="mb-3 font-[var(--font-condensed)] text-sm font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            Relacionados
          </h2>
          <div className="flex flex-col gap-2">
            {relacionados.map((r) => (
              <Link
                key={r.id}
                to={`/artigo/${r.id}`}
                className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-elevated)]"
              >
                {r.titulo}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
