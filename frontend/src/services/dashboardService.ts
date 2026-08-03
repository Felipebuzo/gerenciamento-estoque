import api from './api'

export type DashboardData = {
  totalProdutos: number
  valorTotalEstoque: number
  totalEstoqueBaixo: number
  produtosEstoqueBaixo: {
    id: number
    nome: string
    quantidade: number
    estoqueMinimo: number
    categoria: { nome: string }
  }[]
  ultimasMovimentacoes: {
    id: number
    tipo: 'ENTRADA' | 'SAIDA'
    quantidade: number
    motivo?: string
    criadoEm: string
    produto: { nome: string }
  }[]
}

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await api.get('/dashboard')
  return response.data
}