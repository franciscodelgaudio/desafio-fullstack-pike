import jwt from "jsonwebtoken";

// ! garante que nao e nulo
const segredo = process.env.JWT_SECRET!;

export function criarChave(payload : object)
{
    return jwt.sign(payload, segredo, {expiresIn: '1h'});
}