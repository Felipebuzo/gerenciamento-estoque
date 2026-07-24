const express = require('express')
const cors = require('cors')
const categoriaRoutes = require('./routes/categoriaRoutes')
const produtoRoutes = require('./routes/produtoRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/categorias', categoriaRoutes)
app.use('/produtos', produtoRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API Gerenciamento de Estoque funcionando! 🚀' })
})

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})