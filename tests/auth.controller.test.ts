import * as authController from '../src/controllers/auth.controller';
import { __internal, registerUser } from '../src/services/auth.service';

process.env.JWT_SECRET = 'testsecret';

describe('Auth Controller', () => {
  const mockRequest = (body: any) => ({ body } as any);
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    __internal.clearUsers();
  });

  it('deve registrar usuário e retornar status 201', async () => {
    const req = mockRequest({
      email: 'controller@teste.com',
      password: '123',
      name: 'Suellen',
      role: 'ADMIN'
    });
    const res = mockResponse();

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário registrado com sucesso' });
  });

  it('deve retornar erro 400 se email já estiver registrado', async () => {
    const req = mockRequest({
      email: 'jaexiste@teste.com',
      password: '123',
      name: 'Suellen',
      role: 'MEMBER'
    });
    const res = mockResponse();

    await registerUser(req.body.email, req.body.password, req.body.name, req.body.role);
    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário já existe' });
  });

  it('deve fazer login com sucesso e retornar token', async () => {
    const email = 'logintest@user.com';
    const password = 'senha123';
    await registerUser(email, password, 'Login User', 'MEMBER');

    const req = mockRequest({ email, password });
    const res = mockResponse();

    await authController.login(req, res);

    expect(res.status).not.toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0]).toHaveProperty('token');
  });

  it('deve retornar erro 400 se login falhar', async () => {
    const req = mockRequest({ email: 'fail@email.com', password: '123' });
    const res = mockResponse();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error');
  });
});
