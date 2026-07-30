import { useEffect, useState } from 'react'
import type { Produto } from '../types'
import { listarProdutos, deletarProduto } from '../services/produtoService'

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)

  const carregarProdutos = async () => {
    try {
      const data = await listarProdutos()
      setProdutos(data)
    } catch (error) {
      console.error('Erro ao carregar produtos', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  const handleDeletar = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return
    try {
      await deletarProduto(id)
      carregarProdutos()
    } catch (error) {
      console.error('Erro ao deletar produto', error)
    }
  }

  if (loading) return <p className="p-4">Carregando...</p>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Novo Produto
        </button>
      </div>

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Nome</th>
            <th className="p-3 border-b">Categoria</th>
            <th className="p-3 border-b">Quantidade</th>
            <th className="p-3 border-b">Preço Venda</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{produto.nome}</td>
              <td className="p-3 border-b">{produto.categoria.nome}</td>
              <td className="p-3 border-b">{produto.quantidade}</td>
              <td className="p-3 border-b">
                R$ {produto.precoVenda.toFixed(2)}
              </td>
              <td className="p-3 border-b">
                {produto.quantidade <= produto.estoqueMinimo ? (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                    Estoque baixo
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    OK
                  </span>
                )}
              </td>
              <td className="p-3 border-b flex gap-2">
                <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm">
                  Editar
                </button>
                <button
                  onClick={() => handleDeletar(produto.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}