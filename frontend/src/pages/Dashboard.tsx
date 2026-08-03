import { useEffect, useState } from 'react'
import { getDashboard, type DashboardData } from '../services/dashboardService'

export default function Dashboard() {
  const [dados, setDados] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard()
      .then(setDados)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-4">Carregando...</p>
  if (!dados) return <p className="p-4">Erro ao carregar dashboard.</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-gray-500 text-sm">Total de Produtos</p>
          <p className="text-3xl font-bold text-blue-600">{dados.totalProdutos}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-gray-500 text-sm">Valor Total em Estoque</p>
          <p className="text-3xl font-bold text-green-600">
            R$ {dados.valorTotalEstoque.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-gray-500 text-sm">Produtos com Estoque Baixo</p>
          <p className="text-3xl font-bold text-red-600">{dados.totalEstoqueBaixo}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alertas de estoque baixo */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-bold mb-4 text-red-600">⚠️ Estoque Baixo</h2>
          {dados.produtosEstoqueBaixo.length === 0 ? (
            <p className="text-gray-500">Nenhum produto com estoque baixo.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-2">Produto</th>
                  <th className="pb-2">Categoria</th>
                  <th className="pb-2">Qtd</th>
                  <th className="pb-2">Mínimo</th>
                </tr>
              </thead>
              <tbody>
                {dados.produtosEstoqueBaixo.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="py-2">{p.nome}</td>
                    <td className="py-2">{p.categoria.nome}</td>
                    <td className="py-2 text-red-600 font-bold">{p.quantidade}</td>
                    <td className="py-2">{p.estoqueMinimo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Últimas movimentações */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-bold mb-4">🔄 Últimas Movimentações</h2>
          {dados.ultimasMovimentacoes.length === 0 ? (
            <p className="text-gray-500">Nenhuma movimentação registrada.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-2">Produto</th>
                  <th className="pb-2">Tipo</th>
                  <th className="pb-2">Qtd</th>
                  <th className="pb-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {dados.ultimasMovimentacoes.map(m => (
                  <tr key={m.id} className="border-t">
                    <td className="py-2">{m.produto.nome}</td>
                    <td className="py-2">
                      {m.tipo === 'ENTRADA' ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          Entrada
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                          Saída
                        </span>
                      )}
                    </td>
                    <td className="py-2">{m.quantidade}</td>
                    <td className="py-2 text-sm text-gray-500">
                      {new Date(m.criadoEm).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}