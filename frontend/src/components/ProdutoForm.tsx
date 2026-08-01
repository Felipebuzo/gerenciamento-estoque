import { useEffect, useState } from 'react'
import type { Produto, Categoria } from '../types'
import { criarProduto, atualizarProduto } from '../services/produtoService'
import { listarCategorias } from '../services/categoriaService'

type Props = {
  produto?: Produto
  onSalvar: () => void
  onCancelar: () => void
}

export default function ProdutoForm({ produto, onSalvar, onCancelar }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [form, setForm] = useState({
    nome: produto?.nome || '',
    descricao: produto?.descricao || '',
    precoCusto: produto?.precoCusto || 0,
    precoVenda: produto?.precoVenda || 0,
    quantidade: produto?.quantidade || 0,
    estoqueMinimo: produto?.estoqueMinimo || 5,
    categoriaId: produto?.categoriaId || 0
  })

  useEffect(() => {
    listarCategorias().then(setCategorias)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (produto) {
        await atualizarProduto(produto.id, form)
      } else {
        await criarProduto(form)
      }
      onSalvar()
    } catch (error) {
      console.error('Erro ao salvar produto', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {produto ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={e => setForm({ ...form, nome: e.target.value })}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Descrição (opcional)"
            value={form.descricao}
            onChange={e => setForm({ ...form, descricao: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Preço de Custo"
            value={form.precoCusto}
            onChange={e => setForm({ ...form, precoCusto: Number(e.target.value) })}
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Preço de Venda"
            value={form.precoVenda}
            onChange={e => setForm({ ...form, precoVenda: Number(e.target.value) })}
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Quantidade inicial"
            value={form.quantidade}
            onChange={e => setForm({ ...form, quantidade: Number(e.target.value) })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Estoque mínimo"
            value={form.estoqueMinimo}
            onChange={e => setForm({ ...form, estoqueMinimo: Number(e.target.value) })}
            className="border rounded p-2"
          />
          <select
            value={form.categoriaId}
            onChange={e => setForm({ ...form, categoriaId: Number(e.target.value) })}
            className="border rounded p-2"
            required
          >
            <option value={0}>Selecione uma categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={onCancelar}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}