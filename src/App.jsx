import { useEffect, useState, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import CommandSearch from './components/CommandSearch.jsx'
import Onboarding from './components/Onboarding.jsx'
import InstallPrompt from './components/InstallPrompt.jsx'
import { useLocalStore, useTheme } from './hooks/useLocalStore.js'
import { seedArticles, seedObservations, seedPlaybooks, seedProdutos } from './data/seed.js'
import { GraduationCap, Compass, Coffee, Settings2, Megaphone, Building2 } from 'lucide-react'

import Dashboard from './pages/Dashboard.jsx'
import Biblioteca from './pages/Biblioteca.jsx'
import ArtigoDetalhe from './pages/ArtigoDetalhe.jsx'
import ArtigoForm from './pages/ArtigoForm.jsx'
import Playbooks from './pages/Playbooks.jsx'
import PlaybookDetalhe from './pages/PlaybookDetalhe.jsx'
import PlaybookForm from './pages/PlaybookForm.jsx'
import Produtos from './pages/Produtos.jsx'
import ProdutoDetalhe from './pages/ProdutoDetalhe.jsx'
import ProdutoForm from './pages/ProdutoForm.jsx'
import CategoriaModulo from './pages/CategoriaModulo.jsx'
import Laboratorio from './pages/Laboratorio.jsx'
import ObservacoesDeCampo from './pages/ObservacoesDeCampo.jsx'

// recharts só é necessário aqui — carregado sob demanda para não pesar o bundle inicial
const MinhaEvolucao = lazy(() => import('./pages/MinhaEvolucao.jsx'))

export default function App() {
  const [theme, setTheme] = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [articles, setArticles] = useLocalStore('fade-articles', seedArticles)
  const [observations, setObservations] = useLocalStore('fade-observations', seedObservations)
  const [playbooks, setPlaybooks] = useLocalStore('fade-playbooks', seedPlaybooks)
  const [produtos, setProdutos] = useLocalStore('fade-produtos', seedProdutos)
  const [readArticles, setReadArticles] = useLocalStore('fade-read-articles', {})
  const [nome, setNome] = useLocalStore('fade-user-name', '')
  const location = useLocation()

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen">
      {!nome && <Onboarding onComplete={setNome} />}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onOpenSidebar={() => setSidebarOpen(true)}
          theme={theme}
          setTheme={setTheme}
        />

        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-6xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard articles={articles} observations={observations} nome={nome} />} />

              <Route path="/biblioteca" element={<Biblioteca articles={articles} />} />
              <Route path="/biblioteca/novo" element={<ArtigoForm articles={articles} setArticles={setArticles} />} />
              <Route path="/biblioteca/:id" element={<ArtigoDetalhe articles={articles} setArticles={setArticles} readArticles={readArticles} setReadArticles={setReadArticles} />} />
              <Route path="/biblioteca/:id/editar" element={<ArtigoForm articles={articles} setArticles={setArticles} />} />

              <Route path="/playbooks" element={<Playbooks playbooks={playbooks} />} />
              <Route path="/playbooks/novo" element={<PlaybookForm playbooks={playbooks} setPlaybooks={setPlaybooks} />} />
              <Route path="/playbooks/:id" element={<PlaybookDetalhe playbooks={playbooks} setPlaybooks={setPlaybooks} />} />
              <Route path="/playbooks/:id/editar" element={<PlaybookForm playbooks={playbooks} setPlaybooks={setPlaybooks} />} />

              <Route path="/produtos" element={<Produtos produtos={produtos} />} />
              <Route path="/produtos/novo" element={<ProdutoForm produtos={produtos} setProdutos={setProdutos} />} />
              <Route path="/produtos/:id" element={<ProdutoDetalhe produtos={produtos} setProdutos={setProdutos} />} />
              <Route path="/produtos/:id/editar" element={<ProdutoForm produtos={produtos} setProdutos={setProdutos} />} />

              <Route path="/observacoes" element={<ObservacoesDeCampo observations={observations} setObservations={setObservations} />} />
              <Route path="/evolucao" element={
                <Suspense fallback={<div className="text-sm text-graphite-500 py-10 text-center">Carregando...</div>}>
                  <MinhaEvolucao articles={articles} observations={observations} playbooks={playbooks} produtos={produtos} readArticles={readArticles} setReadArticles={setReadArticles} />
                </Suspense>
              } />
              <Route path="/laboratorio" element={<Laboratorio articles={articles} observations={observations} />} />

              <Route path="/treinamentos" element={
                <CategoriaModulo categoria="Treinamentos" titulo="Treinamentos" icon={GraduationCap} articles={articles}
                  descricao="Conteúdos formativos estruturados por trilha e nível de senioridade." />
              } />
              <Route path="/lideranca" element={
                <CategoriaModulo categoria="Liderança" titulo="Liderança" icon={Compass} articles={articles}
                  descricao="Gestão de pessoas, cultura e decisões de liderança na FADE." />
              } />
              <Route path="/hospitalidade" element={
                <CategoriaModulo categoria="Hospitalidade" titulo="Hospitalidade" icon={Coffee} articles={articles}
                  descricao="Padrões de acolhimento e experiência do cliente." />
              } />
              <Route path="/operacao" element={
                <CategoriaModulo categoria="Operação" titulo="Operação" icon={Settings2} articles={articles}
                  descricao="Processos operacionais do dia a dia das unidades." />
              } />
              <Route path="/marketing" element={
                <CategoriaModulo categoria="Marketing" titulo="Marketing" icon={Megaphone} articles={articles}
                  descricao="Estratégia de marca, comunicação e aquisição." />
              } />
              <Route path="/arquitetura" element={
                <CategoriaModulo categoria="Arquitetura" titulo="Arquitetura" icon={Building2} articles={articles}
                  descricao="Diretrizes de ambiente físico e identidade visual das unidades." />
              } />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <CommandSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={articles}
        observations={observations}
        playbooks={playbooks}
        produtos={produtos}
      />
      {nome && <InstallPrompt />}
    </div>
  )
}
