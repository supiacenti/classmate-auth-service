import { registerUser, loginUser, __internal } from '../src/services/auth.service';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'testsecret';

describe('Auth Service', () => {
  beforeEach(() => {
    __internal.clearUsers();
  });

  it('deve registrar um novo usuário com sucesso', async () => {
    const result = await registerUser(
      'suellen@admin.com',
      '123456',
      'Suellen',
      'ADMIN'
    );

    expect(result).toEqual({ message: 'Usuário registrado com sucesso' });
  });

  it('deve lançar erro se o email já estiver em uso', async () => {
    await registerUser('duplicado@email.com', '123', 'Su', 'ADMIN');

    await expect(
      registerUser('duplicado@email.com', '456', 'Outra', 'MEMBER')
    ).rejects.toThrow('Usuário já existe');
  });

  it('deve logar com sucesso e retornar token e role', async () => {
    await registerUser('suellen@user.com', 'senha123', 'Suellen', 'MEMBER');

    const result = await loginUser('suellen@user.com', 'senha123');
    expect(result.token).toBeDefined();
    expect(result.role).toBe('MEMBER');

    const decoded = jwt.verify(result.token, process.env.JWT_SECRET || 'default') as any;
    expect(decoded.email).toBe('suellen@user.com');
    expect(decoded.role).toBe('MEMBER');
  });

  it('deve lançar erro se o email não existir', async () => {
    await expect(loginUser('naoexiste@email.com', '123')).rejects.toThrow(
      'Usuário não encontrado'
    );
  });

  it('deve lançar erro se a senha estiver incorreta', async () => {
    await registerUser('teste@senha.com', 'senha123', 'Teste', 'ADMIN');

    await expect(loginUser('teste@senha.com', 'errado')).rejects.toThrow(
      'Senha inválida'
    );
  });
});
