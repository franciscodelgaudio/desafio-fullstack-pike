"use server";

import connectDB from "@/lib/connectiondb";
import { Task } from "@/models/task";
import { LerToken } from "@/lib/jwt";
import mongoose from "mongoose";

export async function MostrarTarefas() {
  await connectDB();

  const { payload } = await LerToken();
  const idUsuario = payload?.sub;
  const uid = mongoose.Types.ObjectId.createFromHexString(String(idUsuario));

  const tasks = await Task.aggregate([
    {
      $lookup: {
        from: "projetos",              // <-- confirme que é "projetos"
        localField: "idProjeto",
        foreignField: "_id",
        as: "proj",
      },
    },
    { $unwind: "$proj" },
    { $match: { "proj.idUsuario": uid } }, // <-- seu campo é idUsuario
    {
      $project: {
        _id: 1,
        nomeTarefa: 1,
        descTarefa: 1,
        status: 1,
        prioridade: 1,
        data: 1,
        idProjeto: 1,                    // mantém o ObjectId original (se precisar)
        projetoNome: "$proj.nomeProjeto" // nome do projeto já resolvido
      },
    },
    { $sort: { data: -1, _id: -1 } },
  ]);

  return tasks.map(t => ({
    id: t._id.toString(),
    nomeTarefa: t.nomeTarefa,
    descTarefa: t.descTarefa,
    status: t.status,
    prioridade: t.prioridade,
    data: t.data,
    idProjeto: t.idProjeto?.toString() ?? null,
    projetoNome: t.projetoNome ?? "",
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