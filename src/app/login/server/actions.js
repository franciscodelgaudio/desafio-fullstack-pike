"use server";

import connectDB from "@/lib/connectiondb"
import { Usuario } from "@/models/usuario"
import CriarToken from "@/lib/jwt";

export default async function LerRegistro(dados)
{
    await connectDB();

    var login = String(dados.get("login") ?? "");
    var senha = String(dados.get("senha") ?? "");

    var usuario = await Usuario.findOne({login: login, senha: senha});

    if (usuario != null)
    {
        const payload = {
            sub: usuario._id.toString(),
            login: usuario.login
        }
        const token = CriarToken(payload);
        return {autenticado: true, token};
    }

    return{autenticado: false};
}