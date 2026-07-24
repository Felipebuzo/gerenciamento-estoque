const prisma = require('../prisma')

const listarProdutos = async () => {
  return await prisma.produto.findMany({
    include: { categoria: true },
    orderBy: { nome: 'asc' }
  })
}

const buscarProdutoPorId = async (id) => {
  return await prisma.produto.findUnique({
    where: { id },
    include: { categoria: true }
  })
}

const criarProduto = async (dados) => {
  return await prisma.produto.create({
    data: dados,
    include: { categoria: true }
  })
}

const atualizarProduto = async (id, dados) => {
  return await prisma.produto.update({
    where: { id },
    data: dados,
    include: { categoria: true }
  })
}

const deletarProduto = async (id) => {
  return await prisma.produto.delete({
    where: { id }
  })
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto
}