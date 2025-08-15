"use server";

import connectDB from "@/lib/connectiondb";
import { Task } from "@/models/task";
import { LerToken } from "@/lib/jwt";
import mongoose from "mongoose";
import { Projeto } from "@/models/projeto";


export async function MostrarTarefas() {
  await connectDB();

  const { payload } = await LerToken();
  if (!payload?.sub) return [];

  const uid = new mongoose.Types.ObjectId(String(payload.sub));

  // Retorna um vetor apenas com o id e o nome do projeto
  const projetos = await Projeto.find({ idUsuario: uid })
    .select({ _id: 1, nomeProjeto: 1 })
    .lean();

  // retorna um vetor apenas com o id dos projetos
  const idsProjetos = projetos.map(p => p._id);
  // retorna um mapa que relaciona o id com o nome do projeto
  const mapaNomes = new Map(projetos.map(p => [p._id.toString(), p.nomeProjeto]));

  // busca todas as taerfas com o id do projeto
  const tasks = await Task.find({ idProjeto: { $in: idsProjetos } }).lean();

  // a funcao retorna um vetor de tarefas com as condicoes nome e apenas sob o id do projeto
  return tasks.map(t => ({
    id: t._id.toString(),
    nomeTarefa: t.nomeTarefa,
    descTarefa: t.descTarefa,
    status: t.status,
    prioridade: t.prioridade,
    data: t.data,
    idProjeto: t.idProjeto?.toString() ?? null,
    projetoNome: mapaNomes.get(t.idProjeto?.toString() ?? "") ?? "",
  }));
}

export async function AtualizarTarefa(id, dados) {
  await connectDB();

  const update = {
    nomeTarefa: String(dados.get("nomeTarefa") || ""),
    descTarefa: String(dados.get("descTarefa") || ""),
    status: String(dados.get("status") || ""),
    prioridade: String(dados.get("prioridade") || ""),
    data: String(dados.get("data") || ""),
  };

  try {
    await Task.updateOne({ _id: id }, { $set: update });
    return { tarefaAtualizada: true };
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
}

export async function ExcluirTarefa(idTask)
{
  await Task.findByIdAndDelete(idTask);
  return {tarefaExcluida: true}
}