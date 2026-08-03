const prisma = require('../prisma')

const getDashboard = async () => {
  const totalProdutos = await prisma.produto.count()

  const produtos = await prisma.produto.findMany()

  const valorTotalEstoque = produtos.reduce((acc, produto) => {
    return acc + produto.precoCusto * produto.quantidade
  }, 0)

  const produtosEstoqueBaixo = await prisma.produto.findMany({
    where: {
      quantidade: {
        lte: prisma.produto.fields.estoqueMinimo
      }
    },
    include: { categoria: true }
  })

  const ultimasMovimentacoes = await prisma.movimentacao.findMany({
    take: 5,
    orderBy: { criadoEm: 'desc' },
    include: { produto: true }
  })

  return {
    totalProdutos,
    valorTotalEstoque,
    totalEstoqueBaixo: produtosEstoqueBaixo.length,
    produtosEstoqueBaixo,
    ultimasMovimentacoes
  }
}

module.exports = { getDashboard }