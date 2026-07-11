import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutGrid, BookOpen, ClipboardList, Package, GraduationCap,
  Compass, Coffee, Settings2, Megaphone, Building2, FlaskConical,
  MapPinned, TrendingUp, X,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/biblioteca', label: 'Biblioteca', icon: BookOpen },
  { to: '/playbooks', label: 'Playbooks', icon: ClipboardList },
  { to: '/produtos', label: 'Produtos', icon: Package },
  { to: '/treinamentos', label: 'Treinamentos', icon: GraduationCap },
  { to: '/lideranca', label: 'Liderança', icon: Compass },
  { to: '/hospitalidade', label: 'Hospitalidade', icon: Coffee },
  { to: '/operacao', label: 'Operação', icon: Settings2 },
  { to: '/marketing', label: 'Marketing', icon: Megaphone },
  { to: '/arquitetura', label: 'Arquitetura', icon: Building2 },
  { to: '/laboratorio', label: 'Laboratório', icon: FlaskConical },
  { to: '/observacoes', label: 'Observações de Campo', icon: MapPinned },
  { to: '/evolucao', label: 'Minha Evolução', icon: TrendingUp },
]

function isActivePath(pathname, to, end) {
  if (end) return pathname === to
  return pathname === to || pathname.startsWith(to + '/')
}

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-graphite-900/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 shrink-0 z-40
          bg-cream-soft/95 dark:bg-graphite-900/95 backdrop-blur-md
          border-r border-graphite-100 dark:border-graphite-700
          flex flex-col transition-transform duration-300 ease-smooth
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 pt-7 pb-5">
          <div>
            <p className="font-display text-2xl leading-none tracking-wide text-graphite-900 dark:text-cream">
              EVOLUÇÃO <span className="text-imperio">FADE</span>
            </p>
            <p className="eyebrow mt-1.5">Cérebro operacional</p>
          </div>
          <button className="lg:hidden btn-ghost !px-2" onClick={onClose} aria-label="Fechar menu">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-0.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => {
            const active = isActivePath(pathname, to, end)
            return (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className="relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium focus-ring"
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-xl bg-imperio-tint dark:bg-imperio/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  size={17}
                  strokeWidth={1.75}
                  className={`relative shrink-0 transition-colors duration-300 ${
                    active ? 'text-imperio-dark dark:text-imperio-light' : 'text-graphite-700 dark:text-graphite-300'
                  }`}
                />
                <span
                  className={`relative truncate transition-colors duration-300 ${
                    active
                      ? 'text-imperio-dark dark:text-imperio-light'
                      : 'text-graphite-700 dark:text-graphite-300 hover:text-graphite-900 dark:hover:text-cream'
                  }`}
                >
                  {label}
                </span>
              </NavLink>
            )
          })}
        </nav>

        <div className="px-6 py-5 border-t border-graphite-100 dark:border-graphite-700">
          <p className="text-xs text-graphite-500 leading-relaxed">
            Ela nunca estará pronta. Ela cresce junto com a FADE House.
          </p>
        </div>
      </aside>
    </>
  )
}
