# 🔐 Auth Service — ClassMate

> Microsserviço responsável por autenticação de usuários (cadastro, login e emissão de tokens JWT).


---

## Testes

![CI](https://github.com/supiacenti/classmate-auth-service/actions/workflows/ci.yml/badge.svg)
Cobertura: ![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## 🚀 Como rodar localmente

1. Instale as dependências: `npm install`  
2. Copie o arquivo de exemplo: `cp .env.example .env`  
3. Inicie em modo desenvolvimento: `npm run dev`

---

## ⚙️ Variáveis de Ambiente

```
PORT=5001
JWT_SECRET=algumasecretkeyfortoken
```

## 🧪 Rotas da API

### POST /auth/signup
Cadastro de novo usuário
Body:

``` json
{
  "email": "exemplo@email.com",
  "password": "123456",
  "name": "Fulano",
  "role": "ADMIN"
}
```

### POST /auth/login
Login com retorno de token JWT
Body:

``` json
{
  "email": "exemplo@email.com",
  "password": "123456"
}
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