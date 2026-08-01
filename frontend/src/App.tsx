import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Produtos from './pages/Produtos'
import Movimentacoes from './pages/Movimentacoes'

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation()
  const ativo = location.pathname === to
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded font-medium transition ${
        ativo ? 'bg-white text-blue-700' : 'text-white hover:bg-blue-600'
      }`}
    >
      {children}
    </Link>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-700 text-white p-4 shadow flex items-center gap-6">
          <h1 className="text-xl font-bold mr-4">📦 Gerenciamento de Estoque</h1>
          <NavLink to="/">Produtos</NavLink>
          <NavLink to="/movimentacoes">Movimentações</NavLink>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Produtos />} />
            <Route path="/movimentacoes" element={<Movimentacoes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App