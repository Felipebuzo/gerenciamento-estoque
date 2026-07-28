const movimentacaoService = require('../services/movimentacaoService')

const listarMovimentacoes = async (req, res) => {
  try {
    const movimentacoes = await movimentacaoService.listarMovimentacoes()
    res.json(movimentacoes)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar movimentações' })
  }
}

const listarMovimentacoesPorProduto = async (req, res) => {
  try {
    const { produtoId } = req.params
    const movimentacoes = await movimentacaoService.listarMovimentacoesPorProduto(Number(produtoId))
    res.json(movimentacoes)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar movimentações do produto' })
  }
}

const registrarMovimentacao = async (req, res) => {
  try {
    const { produtoId, tipo, quantidade, motivo } = req.body

    if (!produtoId || !tipo || !quantidade) {
      return res.status(400).json({ error: 'Produto, tipo e quantidade são obrigatórios' })
    }

    if (tipo !== 'ENTRADA' && tipo !== 'SAIDA') {
      return res.status(400).json({ error: 'Tipo deve ser ENTRADA ou SAIDA' })
    }

    if (quantidade <= 0) {
      return res.status(400).json({ error: 'Quantidade deve ser maior que zero' })
    }

    const movimentacao = await movimentacaoService.registrarMovimentacao(
      Number(produtoId),
      tipo,
      Number(quantidade),
      motivo
    )

    res.status(201).json(movimentacao)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  listarMovimentacoes,
  listarMovimentacoesPorProduto,
  registrarMovimentacao
}