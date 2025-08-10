// eu faco a validacao do token na pagina sensivel antes de rodar ela

'use server'

import {cookies} from 'next/headers'
import jwt from "jsonwebtoken";
import { connectDB } from '@/lib/connectiondb';
import { Task } from '@/models/task';

export async function ValidarToken()
{
    const cookieList = await cookies();
    const token = cookieList.get("token")?.value;

    if (!token)
        return {autenticado: false};

    else{
        try{
            const resultado = jwt.verify(token, process.env.JWT_SECRET!);
            return {autenticado: true};
        }
        catch{
            return {autenticado: false};
        }
    }
}

export async function CriarTarefa(dados : FormData) {
    await connectDB();

    const nomeTarefa = String(dados.get("nomeTarefa") ?? "");
    const descTarefa = String(dados.get("descTarefa") ?? "");
    const status = String(dados.get("status") ?? "");
    const prioridade = String(dados.get("prioridade") ?? "");
    const dataStr = String(dados.get("data") ?? "");

    const novaTarefa = await Task.create(
        {
            nomeTarefa,
            descTarefa,
            status,
            prioridade,
            dataStr
        }
    );

    return {criado: true}
}