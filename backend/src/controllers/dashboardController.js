const dashboardService = require('../services/dashboardService')

const getDashboard = async (req, res) => {
  try {
    const dados = await dashboardService.getDashboard()
    res.json(dados)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar dashboard' })
  }
}

module.exports = { getDashboard }