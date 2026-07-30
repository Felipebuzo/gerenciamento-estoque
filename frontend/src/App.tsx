import Produtos from './pages/Produtos'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white p-4 shadow">
        <h1 className="text-xl font-bold">📦 Gerenciamento de Estoque</h1>
      </nav>
      <main>
        <Produtos />
      </main>
    </div>
  )
}

export default App