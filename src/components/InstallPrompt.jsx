import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Share, SquarePlus, X } from 'lucide-react'
import { EASE } from './motion.jsx'
import { useLocalStore } from '../hooks/useLocalStore.js'

function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}

export default function InstallPrompt() {
  const [dismissed, setDismissed] = useLocalStore('fade-install-dismissed', false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showIosTip, setShowIosTip] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isStandalone() || dismissed) return

    function onBeforeInstall(e) {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    let iosTimer
    if (isIos()) {
      iosTimer = setTimeout(() => setVisible(true), 2500)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      clearTimeout(iosTimer)
    }
  }, [dismissed])

  function dismiss() {
    setVisible(false)
    setDismissed(true)
  }

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
      setVisible(false)
      setDismissed(true)
    } else if (isIos()) {
      setShowIosTip(true)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.3, ease: EASE } }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 z-50 card !bg-white dark:!bg-graphite-800 shadow-soft p-4"
        >
          {!showIosTip ? (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-imperio flex items-center justify-center shrink-0">
                <span className="font-display text-cream text-sm">FD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Instalar Evolução FADE</p>
                <p className="text-xs text-graphite-500 mt-0.5 mb-3">Acesse direto da tela inicial, como um app.</p>
                <div className="flex gap-2">
                  <button onClick={handleInstall} className="btn-primary !py-1.5 !px-4 !text-xs">
                    <Download size={13} /> Instalar
                  </button>
                  <button onClick={dismiss} className="btn-ghost !py-1.5 !px-3 !text-xs">
                    Agora não
                  </button>
                </div>
              </div>
              <button onClick={dismiss} className="text-graphite-400 hover:text-graphite-700 dark:hover:text-cream shrink-0" aria-label="Fechar">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Adicionar à Tela de Início</p>
                <button onClick={dismiss} className="text-graphite-400 hover:text-graphite-700 dark:hover:text-cream" aria-label="Fechar">
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-graphite-500 leading-relaxed flex flex-col gap-2">
                <span className="flex items-center gap-2">
                  1. Toque em <Share size={14} className="text-imperio" /> (Compartilhar) na barra do Safari
                </span>
                <span className="flex items-center gap-2">
                  2. Escolha <SquarePlus size={14} className="text-imperio" /> "Adicionar à Tela de Início"
                </span>
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
