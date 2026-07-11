import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useData } from '../lib/DataContext'
import { PageHeader } from '../components/PageHeader'
import { Pill } from '../components/ui/Primitivos'
import { MODULOS_COM_CONTEUDO, MODULO_LABEL } from '../data/modulos'
import type { Modulo, NivelConfiabilidade } from '../types'
import { NIVEL_LABEL } from '../types'

function campoMultilinha(valor: string): string[] {
  return valor
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

const inputClasses =
  'w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[15px] text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent)]'

const labelClasses = 'mb-1.5 block text-sm font-medium text-[var(--text-secondary)]'

export function NovoArtigo() {
  const { setArtigos } = useData()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const moduloInicial = (params.get('modulo') as Modulo) || 'biblioteca'

  const [form, setForm] = useState({
    titulo: '',
    modulo: (MODULOS_COM_CONTEUDO.includes(moduloInicial) ? moduloInicial : 'playbooks') as Modulo,
    resumo: '',
    objetivo: '',
    conteudo: '',
    checklist: '',
    boasPraticas: '',
    errosComuns: '',
    referencias: '',
    fontes: '',
    autor: '',
    tags: '',
    nivelConfiabilidade: 'procedimento' as NivelConfiabilidade,
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo.trim()) return
    const hoje = new Date().toISOString().slice(0, 10)
    const novo = {
      id: `a-${Date.now()}`,
      modulo: form.modulo,
      titulo: form.titulo,
      resumo: form.resumo,
      objetivo: form.objetivo,
      conteudo: form.conteudo,
      checklist: campoMultilinha(form.checklist),
      boasPraticas: campoMultilinha(form.boasPraticas),
      errosComuns: campoMultilinha(form.errosComuns),
      referencias: campoMultilinha(form.referencias),
      fontes: campoMultilinha(form.fontes),
      autor: form.autor || 'Você',
      data: hoje,
      ultimaAtualizacao: hoje,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      relacionados: [],
      nivelConfiabilidade: form.nivelConfiabilidade,
    }
    setArtigos((prev) => [novo, ...prev])
    navigate(`/artigo/${novo.id}`)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Biblioteca" title="Novo artigo" description="Documente conhecimento com clareza sobre sua origem e confiabilidade." />

      <form onSubmit={salvar} className="flex flex-col gap-5">
        <div>
          <label className={labelClasses}>Título</label>
          <input className={inputClasses} value={form.titulo} onChange={(e) => set('titulo', e.target.value)} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Módulo</label>
            <select className={inputClasses} value={form.modulo} onChange={(e) => set('modulo', e.target.value as Modulo)}>
              {MODULOS_COM_CONTEUDO.map((m) => (
                <option key={m} value={m}>{MODULO_LABEL[m]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Nível de confiabilidade</label>
            <select
              className={inputClasses}
              value={form.nivelConfiabilidade}
              onChange={(e) => set('nivelConfiabilidade', e.target.value as NivelConfiabilidade)}
            >
              {(Object.keys(NIVEL_LABEL) as NivelConfiabilidade[]).map((n) => (
                <option key={n} value={n}>{NIVEL_LABEL[n]}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Resumo</label>
          <textarea className={inputClasses} rows={2} value={form.resumo} onChange={(e) => set('resumo', e.target.value)} />
        </div>

        <div>
          <label className={labelClasses}>Objetivo</label>
          <textarea className={inputClasses} rows={2} value={form.objetivo} onChange={(e) => set('objetivo', e.target.value)} />
        </div>

        <div>
          <label className={labelClasses}>Conteúdo</label>
          <textarea className={inputClasses} rows={6} value={form.conteudo} onChange={(e) => set('conteudo', e.target.value)} />
        </div>

        <div>
          <label className={labelClasses}>Checklist <span className="text-[var(--text-tertiary)]">(um item por linha)</span></label>
          <textarea className={inputClasses} rows={3} value={form.checklist} onChange={(e) => set('checklist', e.target.value)} />
        </div>

        <div>
          <label className={labelClasses}>Boas práticas <span className="text-[var(--text-tertiary)]">(um item por linha)</span></label>
          <textarea className={inputClasses} rows={3} value={form.boasPraticas} onChange={(e) => set('boasPraticas', e.target.value)} />
        </div>

        <div>
          <label className={labelClasses}>Erros comuns <span className="text-[var(--text-tertiary)]">(um item por linha)</span></label>
          <textarea className={inputClasses} rows={3} value={form.errosComuns} onChange={(e) => set('errosComuns', e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Referências <span className="text-[var(--text-tertiary)]">(uma por linha)</span></label>
            <textarea className={inputClasses} rows={2} value={form.referencias} onChange={(e) => set('referencias', e.target.value)} />
          </div>
          <div>
            <label className={labelClasses}>Fontes <span className="text-[var(--text-tertiary)]">(uma por linha)</span></label>
            <textarea className={inputClasses} rows={2} value={form.fontes} onChange={(e) => set('fontes', e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Autor</label>
            <input className={inputClasses} value={form.autor} onChange={(e) => set('autor', e.target.value)} />
          </div>
          <div>
            <label className={labelClasses}>Tags <span className="text-[var(--text-tertiary)]">(separadas por vírgula)</span></label>
            <input className={inputClasses} value={form.tags} onChange={(e) => set('tags', e.target.value)} />
          </div>
        </div>

        <div className="mt-2 flex gap-3">
          <Pill type="submit">Salvar artigo</Pill>
          <Pill type="button" variant="ghost" onClick={() => navigate(-1)}>Cancelar</Pill>
        </div>
      </form>
    </div>
  )
}
