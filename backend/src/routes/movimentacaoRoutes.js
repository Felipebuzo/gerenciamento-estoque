const express = require('express')
const router = express.Router()
const movimentacaoController = require('../controllers/movimentacaoController')

router.get('/', movimentacaoController.listarMovimentacoes)
router.get('/produto/:produtoId', movimentacaoController.listarMovimentacoesPorProduto)
router.post('/', movimentacaoController.registrarMovimentacao)

module.exports = router