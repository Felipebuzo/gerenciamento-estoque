const categoriaService = require('../services/categoriaService')

const listarCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.listarCategorias()
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar categorias' })
  }
}

const buscarCategoria = async (req, res) => {
  try {
    const { id } = req.params
    const categoria = await categoriaService.buscarCategoriaPorId(Number(id))
    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }
    res.json(categoria)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categoria' })
  }
}

const criarCategoria = async (req, res) => {
  try {
    const { nome } = req.body
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' })
    }
    const categoria = await categoriaService.criarCategoria(nome)
    res.status(201).json(categoria)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria' })
  }
}

const atualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params
    const { nome } = req.body
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' })
    }
    const categoria = await categoriaService.atualizarCategoria(Number(id), nome)
    res.json(categoria)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar categoria' })
  }
}

const deletarCategoria = async (req, res) => {
  try {
    const { id } = req.params
    await categoriaService.deletarCategoria(Number(id))
    res.json({ message: 'Categoria deletada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar categoria' })
  }
}

module.exports = {
  listarCategorias,
  buscarCategoria,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria
}