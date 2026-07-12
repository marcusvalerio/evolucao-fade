import { Search, Sun, Moon, Menu } from 'lucide-react'

export default function Header({ onOpenSearch, onOpenSidebar, theme, setTheme }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 sm:gap-3 px-3 sm:px-8 py-3.5 sm:py-4 bg-cream/80 dark:bg-graphite-900/80 backdrop-blur-md border-b border-graphite-100 dark:border-graphite-700">
      <button className="lg:hidden btn-ghost !px-2 !min-w-[40px] !min-h-[40px]" onClick={onOpenSidebar} aria-label="Abrir menu">
        <Menu size={19} />
      </button>

      <button
        onClick={onOpenSearch}
        className="flex-1 min-w-0 max-w-md flex items-center gap-2.5 rounded-pill border border-graphite-100 dark:border-graphite-700 bg-white/60 dark:bg-graphite-700/30 px-3.5 sm:px-4 py-2 text-sm text-graphite-500 hover:border-imperio/40 transition-colors duration-300 focus-ring"
      >
        <Search size={15} className="shrink-0" />
        <span className="flex-1 text-left truncate">Buscar...</span>
        <kbd className="hidden sm:inline text-[10px] border border-graphite-300 dark:border-graphite-600 rounded px-1.5 py-0.5 shrink-0">
          ⌘K
        </kbd>
      </button>

      <div className="flex-1" />

      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="btn-ghost !px-2.5 !min-w-[40px] !min-h-[40px]"
        aria-label="Alternar tema"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  )
}
