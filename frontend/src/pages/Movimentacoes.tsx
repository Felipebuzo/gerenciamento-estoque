import { useEffect, useState } from 'react'
import type { Movimentacao, Produto } from '../types'
import { listarMovimentacoes, registrarMovimentacao } from '../services/movimentacaoService'
import { listarProdutos } from '../services/produtoService'

export default function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({
    produtoId: 0,
    tipo: 'ENTRADA' as 'ENTRADA' | 'SAIDA',
    quantidade: 1,
    motivo: ''
  })

  const carregar = async () => {
    try {
      const [movs, prods] = await Promise.all([
        listarMovimentacoes(),
        listarProdutos()
      ])
      setMovimentacoes(movs)
      setProdutos(prods)
    } catch (error) {
      console.error('Erro ao carregar dados', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registrarMovimentacao(form)
      setMostrarForm(false)
      setForm({ produtoId: 0, tipo: 'ENTRADA', quantidade: 1, motivo: '' })
      carregar()
    } catch (error) {
      console.error('Erro ao registrar movimentação', error)
      alert('Erro ao registrar movimentação. Verifique o estoque disponível.')
    }
  }

  if (loading) return <p className="p-4">Carregando...</p>

  return (
    <div className="p-6">
      {mostrarForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Nova Movimentação</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <select
                value={form.produtoId}
                onChange={e => setForm({ ...form, produtoId: Number(e.target.value) })}
                className="border rounded p-2"
                required
              >
                <option value={0}>Selecione um produto</option>
                {produtos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nome} (estoque: {p.quantidade})
                  </option>
                ))}
              </select>
              <select
                value={form.tipo}
                onChange={e => setForm({ ...form, tipo: e.target.value as 'ENTRADA' | 'SAIDA' })}
                className="border rounded p-2"
              >
                <option value="ENTRADA">Entrada</option>
                <option value="SAIDA">Saída</option>
              </select>
              <input
                type="number"
                placeholder="Quantidade"
                value={form.quantidade}
                onChange={e => setForm({ ...form, quantidade: Number(e.target.value) })}
                className="border rounded p-2"
                min={1}
                required
              />
              <input
                type="text"
                placeholder="Motivo (opcional)"
                value={form.motivo}
                onChange={e => setForm({ ...form, motivo: e.target.value })}
                className="border rounded p-2"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
                >
                  Registrar
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movimentações</h1>
        <button
          onClick={() => setMostrarForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nova Movimentação
        </button>
      </div>

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Produto</th>
            <th className="p-3 border-b">Tipo</th>
            <th className="p-3 border-b">Quantidade</th>
            <th className="p-3 border-b">Motivo</th>
            <th className="p-3 border-b">Data</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.map(mov => (
            <tr key={mov.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{mov.produto.nome}</td>
              <td className="p-3 border-b">
                {mov.tipo === 'ENTRADA' ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    Entrada
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                    Saída
                  </span>
                )}
              </td>
              <td className="p-3 border-b">{mov.quantidade}</td>
              <td className="p-3 border-b">{mov.motivo || '-'}</td>
              <td className="p-3 border-b">
                {new Date(mov.criadoEm).toLocaleString('pt-BR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}