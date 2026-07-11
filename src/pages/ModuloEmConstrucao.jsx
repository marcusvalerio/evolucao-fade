import { Construction } from 'lucide-react'

export default function ModuloEmConstrucao({ nome, descricao }) {
  return (
    <div className="fade-in max-w-lg mx-auto text-center py-20">
      <Construction size={26} className="mx-auto text-graphite-400 mb-5" strokeWidth={1.5} />
      <p className="eyebrow mb-2">Próxima etapa</p>
      <h1 className="font-display text-3xl tracking-wide mb-3">{nome}</h1>
      <p className="text-sm text-graphite-500 leading-relaxed">{descricao}</p>
    </div>
  )
}
