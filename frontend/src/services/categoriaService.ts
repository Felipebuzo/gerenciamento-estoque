import api from './api'
import type { Categoria } from '../types'

export const listarCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get('/categorias')
  return response.data
}

export const criarCategoria = async (nome: string): Promise<Categoria> => {
  const response = await api.post('/categorias', { nome })
  return response.data
}