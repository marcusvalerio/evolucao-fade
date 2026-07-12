import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MapPin, Star, Lightbulb, X, ImageOff } from 'lucide-react'
import { CATEGORIAS_OBSERVACAO } from '../data/seed.js'
import { pageVariants, Reveal, RevealItem, cardHover } from '../components/motion.jsx'

const emptyForm = {
  local: '', cidade: '', categoria: CATEGORIAS_OBSERVACAO[0], nota: 3,
  gostei: '', naoGostei: '', podeInspirar: '', jamaisFaria: '', fotos: [],
}

export default function ObservacoesDeCampo({ observations, setObservations }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [filterCidade, setFilterCidade] = useState('Todas')
  const [filterCategoria, setFilterCategoria] = useState('Todas')

  const cidades = useMemo(
    () => Array.from(new Set(observations.map((o) => o.cidade))).filter(Boolean),
    [observations]
  )

  const filtered = observations.filter((o) => {
    if (filterCidade !== 'Todas' && o.cidade !== filterCidade) return false
    if (filterCategoria !== 'Todas' && o.categoria !== filterCategoria) return false
    return true
  }).sort((a, b) => new Date(b.data) - new Date(a.data))

  const ideias = observations.filter((o) => o.promovidoAIdeia)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handlePhotos(fileList) {
    const files = Array.from(fileList).slice(0, 4)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => update('fotos', [...form.fotos, reader.result])
      reader.readAsDataURL(file)
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newObs = {
      ...form,
      id: `obs-${Date.now()}`,
      data: new Date().toISOString().slice(0, 10),
      autor: 'Você',
      promovidoAIdeia: false,
    }
    setObservations([newObs, ...observations])
    setForm(emptyForm)
    setShowForm(false)
  }

  function togglePromover(id) {
    setObservations(observations.map((o) => o.id === id ? { ...o, promovidoAIdeia: !o.promovidoAIdeia } : o))
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-7">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Referências de campo</p>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">Observações de Campo</h1>
          <p className="text-sm text-graphite-500 mt-2 max-w-lg">
            Registre o que você vê em barbearias, hotéis, cafeterias, restaurantes, lojas e empresas de referência.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Fechar' : 'Nova observação'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="card p-6 space-y-5 overflow-hidden"
          >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Local">
              <input required className="input" value={form.local} onChange={(e) => update('local', e.target.value)} />
            </Field>
            <Field label="Cidade">
              <input required className="input" value={form.cidade} onChange={(e) => update('cidade', e.target.value)} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Categoria">
              <select className="input" value={form.categoria} onChange={(e) => update('categoria', e.target.value)}>
                {CATEGORIAS_OBSERVACAO.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Nota">
              <div className="flex gap-1 pt-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} onClick={() => update('nota', n)}>
                    <Star
                      size={22}
                      className={n <= form.nota ? 'text-imperio fill-imperio' : 'text-graphite-300'}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <Field label="Fotos">
            <input type="file" accept="image/*" multiple onChange={(e) => handlePhotos(e.target.files)} className="text-sm" />
            {form.fotos.length > 0 && (
              <div className="flex gap-2 mt-2">
                {form.fotos.map((f, i) => (
                  <img key={i} src={f} alt="" className="w-16 h-16 object-cover rounded-lg" />
                ))}
              </div>
            )}
          </Field>

          <Field label="O que gostei">
            <textarea rows={2} className="input" value={form.gostei} onChange={(e) => update('gostei', e.target.value)} />
          </Field>
          <Field label="O que não gostei">
            <textarea rows={2} className="input" value={form.naoGostei} onChange={(e) => update('naoGostei', e.target.value)} />
          </Field>
          <Field label="O que pode inspirar a FADE">
            <textarea rows={2} className="input" value={form.podeInspirar} onChange={(e) => update('podeInspirar', e.target.value)} />
          </Field>
          <Field label="O que jamais faria">
            <textarea rows={2} className="input" value={form.jamaisFaria} onChange={(e) => update('jamaisFaria', e.target.value)} />
          </Field>

          <button type="submit" className="btn-primary">Salvar observação</button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        <select value={filterCidade} onChange={(e) => setFilterCidade(e.target.value)} className="input !w-auto py-2">
          <option>Todas</option>
          {cidades.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)} className="input !w-auto py-2">
          <option value="Todas">Todas as categorias</option>
          {CATEGORIAS_OBSERVACAO.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {ideias.length > 0 && (
        <section className="card p-5 !bg-imperio-tint dark:!bg-imperio/10 !border-imperio/20">
          <p className="eyebrow !text-imperio-dark dark:!text-imperio-light mb-2 flex items-center gap-1.5">
            <Lightbulb size={13} /> Backlog de ideias
          </p>
          <div className="flex flex-wrap gap-2">
            {ideias.map((i) => (
              <span key={i.id} className="tag-chip !bg-white/60 dark:!bg-graphite-800/60">{i.local}</span>
            ))}
          </div>
        </section>
      )}

      <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" key={filtered.length + filterCidade + filterCategoria}>
        {filtered.map((o) => (
          <RevealItem key={o.id} {...cardHover}>
            <div className="card overflow-hidden flex flex-col h-full">
            {o.fotos?.length > 0 ? (
              <img src={o.fotos[0]} alt={o.local} className="h-36 w-full object-cover" />
            ) : (
              <div className="h-36 w-full bg-graphite-100 dark:bg-graphite-700/50 flex items-center justify-center">
                <ImageOff size={20} className="text-graphite-300" />
              </div>
            )}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="eyebrow !text-leather">{o.categoria}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={12} className={n <= o.nota ? 'text-imperio fill-imperio' : 'text-graphite-200'} />
                  ))}
                </div>
              </div>
              <h3 className="font-display text-lg tracking-wide leading-tight">{o.local}</h3>
              <p className="text-xs text-graphite-500 flex items-center gap-1">
                <MapPin size={11} /> {o.cidade}
              </p>
              {o.gostei && <p className="text-xs text-graphite-700 dark:text-graphite-300 line-clamp-2 mt-1">{o.gostei}</p>}
              <button
                onClick={() => togglePromover(o.id)}
                className={`mt-auto pt-2 text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  o.promovidoAIdeia ? 'text-imperio' : 'text-graphite-500 hover:text-imperio'
                }`}
              >
                <Lightbulb size={13} /> {o.promovidoAIdeia ? 'Na lista de ideias' : 'Transformar em ideia'}
              </button>
            </div>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </motion.div>
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
