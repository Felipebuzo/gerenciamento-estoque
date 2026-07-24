const produtoService = require('../services/produtoService')

const listarProdutos = async (req, res) => {
  try {
    const produtos = await produtoService.listarProdutos()
    res.json(produtos)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos' })
  }
}

const buscarProduto = async (req, res) => {
  try {
    const { id } = req.params
    const produto = await produtoService.buscarProdutoPorId(Number(id))
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' })
    }
    res.json(produto)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' })
  }
}

const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, precoCusto, precoVenda, quantidade, estoqueMinimo, categoriaId } = req.body

    if (!nome || !precoCusto || !precoVenda || !categoriaId) {
      return res.status(400).json({ error: 'Nome, preço de custo, preço de venda e categoria são obrigatórios' })
    }

    const produto = await produtoService.criarProduto({
      nome,
      descricao,
      precoCusto,
      precoVenda,
      quantidade: quantidade || 0,
      estoqueMinimo: estoqueMinimo || 5,
      categoriaId
    })

    res.status(201).json(produto)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' })
  }
}

const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, descricao, precoCusto, precoVenda, quantidade, estoqueMinimo, categoriaId } = req.body

    if (!nome || !precoCusto || !precoVenda || !categoriaId) {
      return res.status(400).json({ error: 'Nome, preço de custo, preço de venda e categoria são obrigatórios' })
    }

    const produto = await produtoService.atualizarProduto(Number(id), {
      nome,
      descricao,
      precoCusto,
      precoVenda,
      quantidade,
      estoqueMinimo,
      categoriaId
    })

    res.json(produto)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' })
  }
}

const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params
    await produtoService.deletarProduto(Number(id))
    res.json({ message: 'Produto deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' })
  }
}

module.exports = {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto
}