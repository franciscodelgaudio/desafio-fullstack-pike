"use server";

import connectDB from "@/lib/connectiondb";
import {Task} from "@/models/task";


export async function MostrarTarefas() {
  await connectDB();

  const allTasks = await Task.find({})
    .populate('idProjeto', 'nomeProjeto')
    .lean();

    allTasks.forEach(task => {
        task._id = task._id.toString();  // Converte o _id para string
        task.idProjeto = task.idProjeto ? task.idProjeto.nomeProjeto : '';  // Acessa o nome do projeto
    });

  return allTasks;
}