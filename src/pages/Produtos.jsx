import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Package } from 'lucide-react'
import { CATEGORIAS_PRODUTO } from '../data/seed.js'
import { pageVariants, Reveal, RevealItem, cardHover } from '../components/motion.jsx'
import { motion } from 'framer-motion'

export default function Produtos({ produtos }) {
  const [categoria, setCategoria] = useState('Todas')
  const filtered = categoria === 'Todas' ? produtos : produtos.filter((p) => p.categoria === categoria)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-7">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Ficha técnica</p>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">Produtos</h1>
          <p className="text-sm text-graphite-500 mt-2 max-w-lg">
            Descrição, ingredientes, indicação e como vender cada produto da FADE.
          </p>
        </div>
        <Link to="/produtos/novo" className="btn-primary">
          <Plus size={16} /> Novo produto
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setCategoria('Todas')} className={`tag-chip ${categoria === 'Todas' ? '!bg-imperio-tint !text-imperio-dark !border-imperio/30' : ''}`}>Todas</button>
        {CATEGORIAS_PRODUTO.map((c) => (
          <button key={c} onClick={() => setCategoria(c)} className={`tag-chip ${categoria === c ? '!bg-imperio-tint !text-imperio-dark !border-imperio/30' : ''}`}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <Package size={22} className="mx-auto text-graphite-500 mb-3" strokeWidth={1.5} />
          <p className="text-sm text-graphite-500">Nenhum produto nessa categoria ainda.</p>
        </div>
      ) : (
        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" key={categoria}>
          {filtered.map((p) => (
            <RevealItem key={p.id} {...cardHover}>
              <Link to={`/produtos/${p.id}`} className="card p-5 flex flex-col gap-3 h-full">
                <span className="eyebrow !text-leather">{p.categoria}</span>
                <h3 className="font-display text-xl tracking-wide leading-tight">{p.nome}</h3>
                <p className="text-sm text-graphite-500 line-clamp-2">{p.descricao}</p>
                <p className="text-xs text-graphite-500 mt-auto pt-1">Fragrância: {p.fragrancia}</p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      )}
    </motion.div>
  )
}
