import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EASE } from './motion.jsx'

export default function Onboarding({ onComplete }) {
  const [nome, setNome] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = nome.trim()
    if (!trimmed) return
    onComplete(trimmed)
  }

  return (
    <AnimatePresence>
      <motion.div
        key="onboarding"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-cream dark:bg-graphite-900 px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="w-full max-w-sm text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="font-display text-3xl tracking-wide text-graphite-900 dark:text-cream mb-1"
          >
            EVOLUÇÃO <span className="text-imperio">FADE</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            className="eyebrow mb-10"
          >
            Cérebro operacional da FADE House
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            className="space-y-5"
          >
            <div>
              <h1 className="font-display text-2xl tracking-wide mb-2">Como podemos te chamar?</h1>
              <p className="text-sm text-graphite-500">Isso deixa a plataforma mais sua.</p>
            </div>
            <input
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="input !text-center !text-base !py-3"
            />
            <button type="submit" className="btn-primary w-full" disabled={!nome.trim()}>
              Entrar <ArrowRight size={16} />
            </button>
          </motion.form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
