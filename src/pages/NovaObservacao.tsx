import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImagePlus, X } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { PageHeader } from '../components/PageHeader'
import { Pill } from '../components/ui/Primitivos'
import { CATEGORIA_LABEL, NOTA_LABEL } from '../types'
import type { CategoriaObservacao, NotaObservacao } from '../types'

const inputClasses =
  'w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[15px] text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent)]'
const labelClasses = 'mb-1.5 block text-sm font-medium text-[var(--text-secondary)]'

function fileParaDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function NovaObservacao() {
  const { setObservacoes } = useData()
  const navigate = useNavigate()
  const [fotos, setFotos] = useState<string[]>([])
  const [form, setForm] = useState({
    local: '',
    cidade: '',
    categoria: 'barbearia' as CategoriaObservacao,
    gostei: '',
    naoGostei: '',
    podeInspirar: '',
    jamaisFaria: '',
    nota: 'interessante' as NotaObservacao,
    autor: '',
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleFotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const urls = await Promise.all(files.map(fileParaDataUrl))
    setFotos((prev) => [...prev, ...urls])
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.local.trim() || !form.cidade.trim()) return
    const nova = {
      id: `o-${Date.now()}`,
      ...form,
      autor: form.autor || 'Você',
      fotos,
      data: new Date().toISOString().slice(0, 10),
      promovidaAIdeia: false,
    }
    setObservacoes((prev) => [nova, ...prev])
    navigate('/campo')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        eyebrow="Observações de Campo"
        title="Nova observação"
        description="Registre o que viu, para alimentar futuras ideias da FADE House."
      />

      <form onSubmit={salvar} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Local</label>
            <input className={inputClasses} value={form.local} onChange={(e) => set('local', e.target.value)} required />
          </div>
          <div>
            <label className={labelClasses}>Cidade</label>
            <input className={inputClasses} value={form.cidade} onChange={(e) => set('cidade', e.target.value)} required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Categoria</label>
            <select className={inputClasses} value={form.categoria} onChange={(e) => set('categoria', e.target.value as CategoriaObservacao)}>
              {(Object.keys(CATEGORIA_LABEL) as CategoriaObservacao[]).map((c) => (
                <option key={c} value={c}>{CATEGORIA_LABEL[c]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Nota</label>
            <select className={inputClasses} value={form.nota} onChange={(e) => set('nota', e.target.value as NotaObservacao)}>
              {(Object.keys(NOTA_LABEL) as NotaObservacao[]).map((n) => (
                <option key={n} value={n}>{NOTA_LABEL[n]}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Fotos</label>
          <div className="flex flex-wrap gap-3">
            {fotos.map((f, i) => (
              <div key={i} className="relative h-20 w-20 overflow-hidden rounded-xl border border-[var(--border)]">
                <img src={f} className="h-full w-full object-cover" alt="" />
                <button
                  type="button"
                  onClick={() => setFotos((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[var(--border)] text-[var(--text-tertiary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
              <ImagePlus size={18} />
              <span className="text-[10px]">Adicionar</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleFotos} />
            </label>
          </div>
        </div>

        <div>
          <label className={labelClasses}>O que gostei</label>
          <textarea className={inputClasses} rows={2} value={form.gostei} onChange={(e) => set('gostei', e.target.value)} />
        </div>
        <div>
          <label className={labelClasses}>O que não gostei</label>
          <textarea className={inputClasses} rows={2} value={form.naoGostei} onChange={(e) => set('naoGostei', e.target.value)} />
        </div>
        <div>
          <label className={labelClasses}>O que pode inspirar a FADE</label>
          <textarea className={inputClasses} rows={2} value={form.podeInspirar} onChange={(e) => set('podeInspirar', e.target.value)} />
        </div>
        <div>
          <label className={labelClasses}>O que jamais faria</label>
          <textarea className={inputClasses} rows={2} value={form.jamaisFaria} onChange={(e) => set('jamaisFaria', e.target.value)} />
        </div>
        <div>
          <label className={labelClasses}>Autor</label>
          <input className={inputClasses} value={form.autor} onChange={(e) => set('autor', e.target.value)} />
        </div>

        <div className="mt-2 flex gap-3">
          <Pill type="submit">Salvar observação</Pill>
          <Pill type="button" variant="ghost" onClick={() => navigate(-1)}>Cancelar</Pill>
        </div>
      </form>
    </div>
  )
}
