import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { CATEGORIAS_PRODUTO } from '../data/seed.js'

const empty = {
  nome: '', categoria: CATEGORIAS_PRODUTO[0], descricao: '', ingredientes: '',
  comoUtilizar: '', comoVender: '', indicacao: '', contraindicacoes: '',
  fragrancia: '', referenciaOficial: '',
}

export default function ProdutoForm({ produtos, setProdutos }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const editing = produtos.find((p) => p.id === id)
  const [form, setForm] = useState(editing || empty)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const payload = { ...form, ultimaAtualizacao: new Date().toISOString().slice(0, 10) }
    if (editing) {
      setProdutos(produtos.map((p) => (p.id === id ? { ...p, ...payload } : p)))
      navigate(`/produtos/${id}`)
    } else {
      const newId = `prod-${Date.now()}`
      setProdutos([...produtos, { ...payload, id: newId }])
      navigate(`/produtos/${newId}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to={editing ? `/produtos/${id}` : '/produtos'} className="btn-ghost !px-0 gap-1.5">
        <ArrowLeft size={15} /> Cancelar
      </Link>
      <h1 className="font-display text-3xl tracking-wide">{editing ? 'Editar produto' : 'Novo produto'}</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Nome">
            <input required className="input" value={form.nome} onChange={(e) => update('nome', e.target.value)} />
          </Field>
          <Field label="Categoria">
            <select className="input" value={form.categoria} onChange={(e) => update('categoria', e.target.value)}>
              {CATEGORIAS_PRODUTO.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Descrição">
          <textarea rows={2} className="input" value={form.descricao} onChange={(e) => update('descricao', e.target.value)} />
        </Field>
        <Field label="Ingredientes">
          <textarea rows={2} className="input" value={form.ingredientes} onChange={(e) => update('ingredientes', e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Como utilizar">
            <textarea rows={3} className="input" value={form.comoUtilizar} onChange={(e) => update('comoUtilizar', e.target.value)} />
          </Field>
          <Field label="Como vender">
            <textarea rows={3} className="input" value={form.comoVender} onChange={(e) => update('comoVender', e.target.value)} />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Indicação">
            <textarea rows={2} className="input" value={form.indicacao} onChange={(e) => update('indicacao', e.target.value)} />
          </Field>
          <Field label="Contraindicações">
            <textarea rows={2} className="input" value={form.contraindicacoes} onChange={(e) => update('contraindicacoes', e.target.value)} />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Fragrância">
            <input className="input" value={form.fragrancia} onChange={(e) => update('fragrancia', e.target.value)} />
          </Field>
          <Field label="Referência oficial">
            <input className="input" value={form.referenciaOficial} onChange={(e) => update('referenciaOficial', e.target.value)} />
          </Field>
        </div>
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Save size={16} /> Salvar produto
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
