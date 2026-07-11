import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { CATEGORIAS_BIBLIOTECA, NIVEIS_CONFIABILIDADE } from '../data/seed.js'

const empty = {
  titulo: '', resumo: '', objetivo: '', conteudo: '',
  checklist: '', boasPraticas: '', errosComuns: '', referencias: '',
  fontes: '', autor: '', tags: '', categoria: CATEGORIAS_BIBLIOTECA[0],
  confiabilidade: 'hipotese',
}

export default function ArtigoForm({ articles, setArticles }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const editing = articles.find((a) => a.id === id)

  const [form, setForm] = useState(() => {
    if (!editing) return empty
    return {
      ...editing,
      checklist: editing.checklist.join('\n'),
      tags: editing.tags.join(', '),
    }
  })

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const today = new Date().toISOString().slice(0, 10)
    const payload = {
      ...form,
      checklist: form.checklist.split('\n').map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      ultimaAtualizacao: today,
    }

    if (editing) {
      setArticles(articles.map((a) => (a.id === id ? { ...a, ...payload } : a)))
      navigate(`/biblioteca/${id}`)
    } else {
      const newId = `art-${Date.now()}`
      setArticles([...articles, { ...payload, id: newId, data: today, relacionamentos: [] }])
      navigate(`/biblioteca/${newId}`)
    }
  }

  return (
    <div className="fade-in max-w-2xl mx-auto space-y-6">
      <Link to={editing ? `/biblioteca/${id}` : '/biblioteca'} className="btn-ghost !px-0 gap-1.5">
        <ArrowLeft size={15} /> Cancelar
      </Link>

      <h1 className="font-display text-3xl tracking-wide">
        {editing ? 'Editar artigo' : 'Novo artigo'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Título">
          <input required className="input" value={form.titulo} onChange={(e) => update('titulo', e.target.value)} />
        </Field>

        <Field label="Resumo">
          <textarea required rows={2} className="input" value={form.resumo} onChange={(e) => update('resumo', e.target.value)} />
        </Field>

        <Field label="Objetivo">
          <textarea rows={2} className="input" value={form.objetivo} onChange={(e) => update('objetivo', e.target.value)} />
        </Field>

        <Field label="Conteúdo">
          <textarea rows={6} className="input" value={form.conteudo} onChange={(e) => update('conteudo', e.target.value)} />
        </Field>

        <Field label="Checklist (um item por linha)">
          <textarea rows={4} className="input" value={form.checklist} onChange={(e) => update('checklist', e.target.value)} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Boas práticas">
            <textarea rows={3} className="input" value={form.boasPraticas} onChange={(e) => update('boasPraticas', e.target.value)} />
          </Field>
          <Field label="Erros comuns">
            <textarea rows={3} className="input" value={form.errosComuns} onChange={(e) => update('errosComuns', e.target.value)} />
          </Field>
        </div>

        <Field label="Referências">
          <input className="input" value={form.referencias} onChange={(e) => update('referencias', e.target.value)} />
        </Field>
        <Field label="Fontes">
          <input className="input" value={form.fontes} onChange={(e) => update('fontes', e.target.value)} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Autor">
            <input className="input" value={form.autor} onChange={(e) => update('autor', e.target.value)} />
          </Field>
          <Field label="Tags (separadas por vírgula)">
            <input className="input" value={form.tags} onChange={(e) => update('tags', e.target.value)} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Categoria">
            <select className="input" value={form.categoria} onChange={(e) => update('categoria', e.target.value)}>
              {CATEGORIAS_BIBLIOTECA.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Nível de confiabilidade">
            <select className="input" value={form.confiabilidade} onChange={(e) => update('confiabilidade', e.target.value)}>
              {NIVEIS_CONFIABILIDADE.map((n) => <option key={n.id} value={n.id}>{n.label}</option>)}
            </select>
          </Field>
        </div>

        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Save size={16} /> Salvar artigo
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
