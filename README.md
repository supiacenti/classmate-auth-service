# 🔐 Auth Service — ClassMate

> Microsserviço responsável por autenticação de usuários (login, cadastro e emissão de JWT).

---

## 🚀 Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

## ⚙️ Variáveis de Ambiente

```
PORT=5001
JWT_SECRET=algumasecretkeyfortoken
```

## 🧪 Rotas da API

### POST /auth/signup
Cria um novo usuário

Retorna um token JWT

### POST /auth/login
Autentica um usuário existente

Retorna um token JWT

## 🐳 Docker

```
docker build -t classmate-auth-service .
docker run -p 5001:5001 classmate-auth-service
```

## 📦 Estrutura

``` css
src/
├── controllers/
├── routes/
├── services/
├── models/
├── middlewares/
└── index.ts
```

## 🛡️ Autenticação

As rotas protegidas usam JWT. Para acessar, envie:

``` makefile
Authorization: Bearer <seu_token_jwt>
```

## 🧰 Scripts

```
npm run dev    # modo desenvolvimento
npm run build  # compilar TS
npm start      # iniciar serviço buildado
```