import { Request, Response } from 'express'
import * as authService from '../services/auth.service'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body
    const result = await authService.registerUser(email, password, name, role)
    return res.status(201).json(result)
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await authService.loginUser(email, password)
    return res.json(result)
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}
