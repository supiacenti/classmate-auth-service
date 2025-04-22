import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import client from 'prom-client'

// Cria um registro padrão
const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics()

dotenv.config()

const app = express()
app.use(express.json())

// Expor as métricas na rota /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`)
})
