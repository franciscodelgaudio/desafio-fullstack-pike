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
    const data = String(dados.get("data") ?? "");

    const novaTarefa = await Task.create(
        {
            idUsuario,
            nomeTarefa,
            descTarefa,
            status,
            prioridade,
            data
        }
    );

    return {criado: true}
}

export async function EditarTarefa()
{

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
    }

    return {listaTasks};
}

export async function DeletarTarefa(idTask : Types.ObjectId)
{
    await Task.findByIdAndDelete(idTask);

    return {deletado: true}
}

export async function AtualizarTarefa(id: string, dados: FormData) {
  await connectDB();

  const objectID = new Types.ObjectId(id);

  const update = {
    nomeTarefa: String(dados.get("nomeTarefa") || ""),
    descTarefa: String(dados.get("descTarefa") || ""),
    status: String(dados.get("status") || ""),
    prioridade: String(dados.get("prioridade") || ""),
    data: String(dados.get("data") || ""),
  };

  try {
    await Task.updateOne({ _id: objectID }, { $set: update });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
}