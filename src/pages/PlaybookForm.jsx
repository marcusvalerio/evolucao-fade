import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { ETAPAS_PLAYBOOK } from '../data/seed.js'

const empty = {
  titulo: '', etapa: ETAPAS_PLAYBOOK[0], quandoUsar: '', responsavel: '',
  passos: '', checklist: '', errosComuns: '',
}

export default function PlaybookForm({ playbooks, setPlaybooks }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const editing = playbooks.find((p) => p.id === id)

  const [form, setForm] = useState(() => {
    if (!editing) return empty
    return { ...editing, passos: editing.passos.join('\n'), checklist: editing.checklist.join('\n') }
  })

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const today = new Date().toISOString().slice(0, 10)
    const payload = {
      ...form,
      passos: form.passos.split('\n').map((s) => s.trim()).filter(Boolean),
      checklist: form.checklist.split('\n').map((s) => s.trim()).filter(Boolean),
      ultimaAtualizacao: today,
    }
    if (editing) {
      setPlaybooks(playbooks.map((p) => (p.id === id ? { ...p, ...payload } : p)))
      navigate(`/playbooks/${id}`)
    } else {
      const newId = `pb-${Date.now()}`
      setPlaybooks([...playbooks, { ...payload, id: newId }])
      navigate(`/playbooks/${newId}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to={editing ? `/playbooks/${id}` : '/playbooks'} className="btn-ghost !px-0 gap-1.5">
        <ArrowLeft size={15} /> Cancelar
      </Link>
      <h1 className="font-display text-3xl tracking-wide">{editing ? 'Editar playbook' : 'Novo playbook'}</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Título">
          <input required className="input" value={form.titulo} onChange={(e) => update('titulo', e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Etapa do processo">
            <select className="input" value={form.etapa} onChange={(e) => update('etapa', e.target.value)}>
              {ETAPAS_PLAYBOOK.map((e) => <option key={e}>{e}</option>)}
            </select>
          </Field>
          <Field label="Responsável">
            <input className="input" value={form.responsavel} onChange={(e) => update('responsavel', e.target.value)} />
          </Field>
        </div>
        <Field label="Quando usar">
          <textarea rows={2} className="input" value={form.quandoUsar} onChange={(e) => update('quandoUsar', e.target.value)} />
        </Field>
        <Field label="Passos (um por linha, na ordem)">
          <textarea rows={6} className="input" value={form.passos} onChange={(e) => update('passos', e.target.value)} />
        </Field>
        <Field label="Checklist (um item por linha)">
          <textarea rows={3} className="input" value={form.checklist} onChange={(e) => update('checklist', e.target.value)} />
        </Field>
        <Field label="Erros comuns">
          <textarea rows={2} className="input" value={form.errosComuns} onChange={(e) => update('errosComuns', e.target.value)} />
        </Field>
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Save size={16} /> Salvar playbook
        </button>
      </form>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-graphite-500 mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}
