const prisma = require('../prisma')

const listarCategorias = async () => {
  return await prisma.categoria.findMany({
    orderBy: { nome: 'asc' }
  })
}

const buscarCategoriaPorId = async (id) => {
  return await prisma.categoria.findUnique({
    where: { id }
  })
}

const criarCategoria = async (nome) => {
  return await prisma.categoria.create({
    data: { nome }
  })
}

const atualizarCategoria = async (id, nome) => {
  return await prisma.categoria.update({
    where: { id },
    data: { nome }
  })
}

const deletarCategoria = async (id) => {
  return await prisma.categoria.delete({
    where: { id }
  })
}

module.exports = {
  listarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria
}