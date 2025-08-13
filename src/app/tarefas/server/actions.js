"use server";

import connectDB from '@/lib/connectiondb';
import { Task } from '@/models/task';
import { unstable_noStore as noStore } from "next/cache";


export async function CriarTarefa(dados, idProjeto) {
  await connectDB();

  const nomeTarefa = String(dados.get("nomeTarefa") ?? "");
  const descTarefa = String(dados.get("descTarefa") ?? "");
  const status = String(dados.get("status") ?? "");
  const prioridade = String(dados.get("prioridade") ?? "");
  const data = String(dados.get("data") ?? "");

  const novaTarefa = await Task.create(
      {
          idProjeto,
          nomeTarefa,
          descTarefa,
          status,
          prioridade,
          data
      }
  );

  return {tarefaCriada: true}
}

export async function LerTarefa(idProjeto) {
  noStore();
  await connectDB();

  const tarefas = await Task.find({ idProjeto }).lean();

  for (let i = 0; i < tarefas.length; i++) {
    tarefas[i]._id = tarefas[i]._id.toString();

    // Verifique se idProjeto existe antes de tentar chamar toString()
    if (tarefas[i].idProjeto) {
      tarefas[i].idProjeto = tarefas[i].idProjeto.toString();
    }
  }

  return tarefas;
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