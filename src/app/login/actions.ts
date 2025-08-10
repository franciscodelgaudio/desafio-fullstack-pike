'use server'

import { connectDB } from "@/lib/connectiondb"
import {Usuario} from "@/models/usuario"
import { criarChave } from "@/lib/jwt";
import { redirect } from "next/navigation";

export async function BuscarRegistro(dados : FormData)
{
    await connectDB();

    var login = String(dados.get("login") ?? "");
    var senha = String(dados.get("senha") ?? "");

    var resultado = await Usuario.findOne({login: login, senha: senha});

    if (resultado)
    {
        const payload = {
            sub: resultado._id.toString(),
            login: resultado.login
        }
        const token = criarChave(payload);
        return {autenticado: true, token};
    }

    return{autenticado: false};
}