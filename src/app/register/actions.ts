'use server';

import {Usuario} from "@/models/usuario"
import { connectDB } from "@/lib/connectiondb";

export async function CriarRegistro(dados : FormData)
{
    await connectDB();

    var nomeCompleto = String(dados.get("nome") ?? "");
    var email = String(dados.get("email") ?? "");
    var dataNascimentoStr = String(dados.get("dataNascimento") ?? "");
    var genero = String(dados.get("genero") ?? "");
    var login = String(dados.get("login") ?? "");
    var senha = String(dados.get("senha") ?? "");

    var dataNascimento = new Date(dataNascimentoStr);

    const novoUsuario = await Usuario.create(
        {
            nome: nomeCompleto,
            email,
            dataNascimento,
            genero,
            login,
            senha
        }
    );

    return {criado: true}
}