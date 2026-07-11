import { CheckCircle2, Circle } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { PageHeader } from '../components/PageHeader'
import { Card, SeloConfiabilidade } from '../components/ui/Primitivos'
import { MODULO_LABEL } from '../data/modulos'
import type { Artigo } from '../types'

export function Evolucao() {
  const { artigos, trilha, setTrilha } = useData()

  function toggle(artigoId: string) {
    setTrilha((prev) => {
      const existe = prev.find((t) => t.artigoId === artigoId)
      if (existe) {
        return prev.map((t) =>
          t.artigoId === artigoId
            ? { ...t, concluido: !t.concluido, concluidoEm: !t.concluido ? new Date().toISOString().slice(0, 10) : undefined }
            : t
        )
      }
      return [...prev, { artigoId, concluido: true, concluidoEm: new Date().toISOString().slice(0, 10) }]
    })
  }

  const concluidosIds = new Set(trilha.filter((t) => t.concluido).map((t) => t.artigoId))
  const pendentes = artigos.filter((a) => !concluidosIds.has(a.id))
  const concluidos = artigos.filter((a) => concluidosIds.has(a.id))

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Sua trilha"
        title="Minha Evolução"
        description="O que você já aprendeu, o que falta, e o que a FADE recomenda a seguir."
      />

      <Section titulo="Recomendado a seguir" itens={pendentes.slice(0, 3)} concluido={false} onToggle={toggle} />
      <Section titulo={`A aprender (${pendentes.length})`} itens={pendentes} concluido={false} onToggle={toggle} />
      <Section titulo={`Concluído (${concluidos.length})`} itens={concluidos} concluido onToggle={toggle} />
    </div>
  )
}

function Section({
  titulo,
  itens,
  concluido,
  onToggle,
}: {
  titulo: string
  itens: Artigo[]
  concluido: boolean
  onToggle: (id: string) => void
}) {
  if (itens.length === 0) return null
  return (
    <div className="mb-8">
      <h2 className="mb-3 font-[var(--font-condensed)] text-sm font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
        {titulo}
      </h2>
      <div className="flex flex-col gap-2.5">
        {itens.map((a) => (
          <Card key={a.id} className="flex items-center gap-4 p-4">
            <button onClick={() => onToggle(a.id)} className="shrink-0 text-[var(--accent)]">
              {concluido ? <CheckCircle2 size={20} /> : <Circle size={20} className="text-[var(--text-tertiary)]" />}
            </button>
            <div className="min-w-0 flex-1">
              <p className={`truncate font-[var(--font-condensed)] text-base font-medium ${concluido ? 'text-[var(--text-tertiary)] line-through' : 'text-[var(--text-primary)]'}`}>
                {a.titulo}
              </p>
              <p className="text-xs text-[var(--text-tertiary)]">{MODULO_LABEL[a.modulo]}</p>
            </div>
            <SeloConfiabilidade nivel={a.nivelConfiabilidade} />
          </Card>
        ))}
      </div>
    </div>
  )
}
