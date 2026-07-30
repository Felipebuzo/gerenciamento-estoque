import api from './api'
import type { Produto } from '../types'

export const listarProdutos = async (): Promise<Produto[]> => {
  const response = await api.get('/produtos')
  return response.data
}

export const buscarProduto = async (id: number): Promise<Produto> => {
  const response = await api.get(`/produtos/${id}`)
  return response.data
}

export const criarProduto = async (dados: Omit<Produto, 'id' | 'categoria' | 'criadoEm' | 'atualizadoEm'>): Promise<Produto> => {
  const response = await api.post('/produtos', dados)
  return response.data
}

export const atualizarProduto = async (id: number, dados: Partial<Produto>): Promise<Produto> => {
  const response = await api.put(`/produtos/${id}`, dados)
  return response.data
}

export const deletarProduto = async (id: number): Promise<void> => {
  await api.delete(`/produtos/${id}`)
}