const prisma = require('../prisma')

const listarMovimentacoes = async () => {
  return await prisma.movimentacao.findMany({
    include: { produto: true },
    orderBy: { criadoEm: 'desc' }
  })
}

const listarMovimentacoesPorProduto = async (produtoId) => {
  return await prisma.movimentacao.findMany({
    where: { produtoId },
    include: { produto: true },
    orderBy: { criadoEm: 'desc' }
  })
}

const registrarMovimentacao = async (produtoId, tipo, quantidade, motivo) => {
  const produto = await prisma.produto.findUnique({
    where: { id: produtoId }
  })

  if (!produto) {
    throw new Error('Produto não encontrado')
  }

  if (tipo === 'SAIDA' && produto.quantidade < quantidade) {
    throw new Error('Quantidade insuficiente em estoque')
  }

  const novaQuantidade = tipo === 'ENTRADA'
    ? produto.quantidade + quantidade
    : produto.quantidade - quantidade

  const [movimentacao] = await prisma.$transaction([
    prisma.movimentacao.create({
      data: { produtoId, tipo, quantidade, motivo }
    }),
    prisma.produto.update({
      where: { id: produtoId },
      data: { quantidade: novaQuantidade }
    })
  ])

  return movimentacao
}

module.exports = {
  listarMovimentacoes,
  listarMovimentacoesPorProduto,
  registrarMovimentacao
}