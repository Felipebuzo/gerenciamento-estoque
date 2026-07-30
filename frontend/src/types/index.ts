export type Categoria = {
  id: number
  nome: string
  criadoEm: string
}

export type Produto = {
  id: number
  nome: string
  descricao?: string
  precoCusto: number
  precoVenda: number
  quantidade: number
  estoqueMinimo: number
  categoriaId: number
  categoria: Categoria
  criadoEm: string
  atualizadoEm: string
}

export type Movimentacao = {
  id: number
  tipo: 'ENTRADA' | 'SAIDA'
  quantidade: number
  motivo?: string
  produtoId: number
  produto: Produto
  criadoEm: string
}