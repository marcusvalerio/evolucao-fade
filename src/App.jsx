import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import CommandSearch from './components/CommandSearch.jsx'
import { useLocalStore, useTheme } from './hooks/useLocalStore.js'
import { seedArticles, seedObservations } from './data/seed.js'

import Dashboard from './pages/Dashboard.jsx'
import Biblioteca from './pages/Biblioteca.jsx'
import ArtigoDetalhe from './pages/ArtigoDetalhe.jsx'
import ArtigoForm from './pages/ArtigoForm.jsx'
import ObservacoesDeCampo from './pages/ObservacoesDeCampo.jsx'
import ModuloEmConstrucao from './pages/ModuloEmConstrucao.jsx'
import MinhaEvolucao from './pages/MinhaEvolucao.jsx'

export default function App() {
  const [theme, setTheme] = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [articles, setArticles] = useLocalStore('fade-articles', seedArticles)
  const [observations, setObservations] = useLocalStore('fade-observations', seedObservations)

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

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onOpenSidebar={() => setSidebarOpen(true)}
          theme={theme}
          setTheme={setTheme}
        />

        <main className="flex-1 px-4 sm:px-8 py-8 max-w-6xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard articles={articles} observations={observations} />} />
            <Route
              path="/biblioteca"
              element={<Biblioteca articles={articles} />}
            />
            <Route
              path="/biblioteca/novo"
              element={<ArtigoForm articles={articles} setArticles={setArticles} />}
            />
            <Route
              path="/biblioteca/:id"
              element={<ArtigoDetalhe articles={articles} setArticles={setArticles} />}
            />
            <Route
              path="/biblioteca/:id/editar"
              element={<ArtigoForm articles={articles} setArticles={setArticles} />}
            />
            <Route
              path="/observacoes"
              element={<ObservacoesDeCampo observations={observations} setObservations={setObservations} />}
            />
            <Route path="/evolucao" element={<MinhaEvolucao articles={articles} observations={observations} />} />

            <Route path="/playbooks" element={<ModuloEmConstrucao nome="Playbooks" descricao="Procedimentos passo a passo da FADE: primeiro atendimento, recepção, venda consultiva, uso de pomadas, finalização, feedback, contratação, onboarding, desligamento e treinamentos." />} />
            <Route path="/produtos" element={<ModuloEmConstrucao nome="Produtos" descricao="Ficha técnica de cada produto: descrição, ingredientes, como utilizar, como vender, indicação, contraindicações, fragrância e referência oficial." />} />
            <Route path="/treinamentos" element={<ModuloEmConstrucao nome="Treinamentos" descricao="Conteúdos formativos estruturados por trilha e nível." />} />
            <Route path="/lideranca" element={<ModuloEmConstrucao nome="Liderança" descricao="Conhecimento sobre gestão de pessoas, cultura e decisões de liderança na FADE." />} />
            <Route path="/hospitalidade" element={<ModuloEmConstrucao nome="Hospitalidade" descricao="Padrões de acolhimento e experiência do cliente." />} />
            <Route path="/operacao" element={<ModuloEmConstrucao nome="Operação" descricao="Processos operacionais do dia a dia das unidades." />} />
            <Route path="/marketing" element={<ModuloEmConstrucao nome="Marketing" descricao="Estratégia de marca, comunicação e aquisição." />} />
            <Route path="/arquitetura" element={<ModuloEmConstrucao nome="Arquitetura" descricao="Diretrizes de ambiente físico e identidade visual das unidades." />} />
            <Route path="/laboratorio" element={<ModuloEmConstrucao nome="Laboratório" descricao="Experimentos e hipóteses em teste antes de virarem procedimento oficial." />} />
          </Routes>
        </main>
      </div>

      <CommandSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={articles}
        observations={observations}
      />
    </div>
  )
}
