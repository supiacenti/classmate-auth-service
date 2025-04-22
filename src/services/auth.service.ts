import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface User {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'MEMBER'
}

const users: User[] = []

export const registerUser = async (email: string, password: string, name: string, role: string) => {
  const userExists = users.find((u) => u.email === email)
  if (userExists) throw new Error('Usuário já existe')

  const hashed = await bcrypt.hash(password, 10)
  users.push({ email, password: hashed, name, role: role as 'ADMIN' | 'MEMBER' })
  return { message: 'Usuário registrado com sucesso' }
}

export const loginUser = async (email: string, password: string) => {
  const user = users.find((u) => u.email === email)
  if (!user) throw new Error('Usuário não encontrado')

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error('Senha inválida')

  const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
  return { token, role: user.role }
}

export const __internal = { users }