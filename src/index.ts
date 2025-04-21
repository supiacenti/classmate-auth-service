import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`)
})
