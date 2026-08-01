import api from './api'
import type { Movimentacao } from '../types'

export const listarMovimentacoes = async (): Promise<Movimentacao[]> => {
  const response = await api.get('/movimentacoes')
  return response.data
}

export const registrarMovimentacao = async (dados: {
  produtoId: number
  tipo: 'ENTRADA' | 'SAIDA'
  quantidade: number
  motivo?: string
}): Promise<Movimentacao> => {
  const response = await api.post('/movimentacoes', dados)
  return response.data
}