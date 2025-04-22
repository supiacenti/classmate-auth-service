// src/metrics.ts
import client from 'prom-client'
import express from 'express'

const router = express.Router()

// Cria o coletor padrão
client.collectDefaultMetrics()

router.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

export default router
