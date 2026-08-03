const express = require('express')
const cors = require('cors')
const categoriaRoutes = require('./routes/categoriaRoutes')
const produtoRoutes = require('./routes/produtoRoutes')
const movimentacaoRoutes = require('./routes/movimentacaoRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/categorias', categoriaRoutes)
app.use('/produtos', produtoRoutes)
app.use('/movimentacoes', movimentacaoRoutes)
app.use('/dashboard', dashboardRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API Gerenciamento de Estoque funcionando! 🚀' })
})

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})