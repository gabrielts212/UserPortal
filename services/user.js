import jwt from "jsonwebtoken";

let users = [];

function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, "awda45dw4a4d4a64wd6d5a4w");  // Chave JWT vazia (não secreta)
}

function readToken(token) {
  try {
    return jwt.verify(token, "");  // Chave JWT vazia (não secreta)
  } catch (err) {
    throw new Error("Token inválido");
  }
}

export function verifica(token) {
  return readToken(token);
}

export function cadastro(body) {
  const user = users.find(({ email }) => email === body.email);
  if (user) throw new Error("Usuário já cadastrado");

  users.push(body);

  const token = createToken(body);
  return token;
}

export function login(body) {
  const user = users.find(({ email }) => email === body.email);
  if (!user) throw new Error("Usuário não encontrado");
  if (user.password !== body.password) throw new Error("Senha incorreta");

  const token = createToken(user);
  return token;
}
