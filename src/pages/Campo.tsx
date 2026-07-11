import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Sparkles, MapPin } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { PageHeader } from '../components/PageHeader'
import { Card, NotaBadge, Pill } from '../components/ui/Primitivos'
import { EstadoVazio } from '../components/EstadoVazio'
import { CATEGORIA_LABEL } from '../types'
import type { CategoriaObservacao } from '../types'

function formatarData(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function Campo() {
  const { observacoes, setObservacoes } = useData()
  const navigate = useNavigate()
  const [categoria, setCategoria] = useState<CategoriaObservacao | 'todas'>('todas')

  const filtradas = useMemo(() => {
    const lista = categoria === 'todas' ? observacoes : observacoes.filter((o) => o.categoria === categoria)
    return [...lista].sort((a, b) => (a.data < b.data ? 1 : -1))
  }, [observacoes, categoria])

  function promover(id: string) {
    setObservacoes((prev) => prev.map((o) => (o.id === id ? { ...o, promovidaAIdeia: true } : o)))
  }

  return (
    <div>
      <PageHeader
        eyebrow="Referências visitadas"
        title="Observações de Campo"
        description="Toda visita a barbearias, hotéis, cafeterias, restaurantes, lojas e empresas que possa inspirar a FADE House."
        action={
          <Pill onClick={() => navigate('/campo/novo')}>
            <Plus size={16} /> Nova observação
          </Pill>
        }
      />

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setCategoria('todas')}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            categoria === 'todas'
              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
              : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
          }`}
        >
          Todas
        </button>
        {(Object.keys(CATEGORIA_LABEL) as CategoriaObservacao[]).map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              categoria === c
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            {CATEGORIA_LABEL[c]}
          </button>
        ))}
      </div>

      {filtradas.length === 0 ? (
        <EstadoVazio titulo="Nenhuma observação ainda" descricao="Registre a primeira visita que pode inspirar a FADE." />
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filtradas.map((o) => (
            <Card key={o.id} className="flex flex-col gap-4 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-[var(--font-condensed)] text-xl font-semibold text-[var(--text-primary)]">
                    {o.local}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-[var(--text-tertiary)]">
                    <MapPin size={13} /> {o.cidade} · {CATEGORIA_LABEL[o.categoria]}
                  </p>
                </div>
                <NotaBadge nota={o.nota} />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Campo2 titulo="O que gostei" texto={o.gostei} />
                <Campo2 titulo="O que não gostei" texto={o.naoGostei} />
                <Campo2 titulo="Pode inspirar a FADE" texto={o.podeInspirar} destaque />
                <Campo2 titulo="Jamais faria" texto={o.jamaisFaria} />
              </div>

              <div className="mt-1 flex items-center justify-between border-t border-[var(--border)] pt-3">
                <span className="text-xs text-[var(--text-tertiary)]">{formatarData(o.data)} · {o.autor}</span>
                {o.promovidaAIdeia ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)]">
                    <Sparkles size={13} /> Promovida a ideia
                  </span>
                ) : (
                  <button
                    onClick={() => promover(o.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                  >
                    <Sparkles size={13} /> Transformar em ideia
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function Campo2({ titulo, texto, destaque }: { titulo: string; texto: string; destaque?: boolean }) {
  if (!texto) return null
  return (
    <div>
      <p className={`text-xs font-medium uppercase tracking-wide ${destaque ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'}`}>
        {titulo}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--text-primary)]">{texto}</p>
    </div>
  )
}
