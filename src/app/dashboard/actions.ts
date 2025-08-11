// eu faco a validacao do token na pagina sensivel antes de rodar ela

'use server'

import {cookies} from 'next/headers'
import jwt, {JwtPayload, TokenExpiredError} from "jsonwebtoken";
import { connectDB } from '@/lib/connectiondb';
import { Task } from '@/models/task';
import { Types } from 'mongoose';

export async function ValidarToken()
{
    const cookieList = await cookies();
    const token = cookieList.get("token")?.value;

    if (!token)
        return {autenticado: false};

    else{
        try{
            const resultado = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            return {autenticado: true, resultado};
        }
        catch{
            return {autenticado: false};
        }
    }
}

export async function CriarTarefa(dados : FormData) {
    await connectDB();

    const {resultado} = await ValidarToken();

    const idUsuario = resultado?.sub;
    const nomeTarefa = String(dados.get("nomeTarefa") ?? "");
    const descTarefa = String(dados.get("descTarefa") ?? "");
    const status = String(dados.get("status") ?? "");
    const prioridade = String(dados.get("prioridade") ?? "");
    const dataStr = String(dados.get("data") ?? "");

    const novaTarefa = await Task.create(
        {
            idUsuario,
            nomeTarefa,
            descTarefa,
            status,
            prioridade,
            dataStr
        }
    );

    return {criado: true}
}

export async function BuscarTarefa()
{
    await connectDB();

    const {resultado} = await ValidarToken();
    const idUsuario = resultado?.sub;

    var listaTasks = await Task.find({idUsuario}).lean();

    for (var i = 0 ; i < listaTasks.length ; i++)
    {
        listaTasks[i]._id = (listaTasks[i]._id as Types.ObjectId).toString();
        listaTasks[i].idUsuario = listaTasks[i].idUsuario.toString();
        // listaTasks[i].nomeTarefa = listaTasks[i].nomeTarefa.toString();
        // listaTasks[i].descTarefa = listaTasks[i].descTarefa.toString();
        // listaTasks[i].status = listaTasks[i].status.toString();
        // listaTasks[i].prioridade = listaTasks[i].prioridade.toString();
        // listaTasks[i].data = listaTasks[i].data.toString();
    }

    return {tarefas: listaTasks};
}