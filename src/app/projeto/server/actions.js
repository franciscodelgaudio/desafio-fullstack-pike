"use server";

import connectDB from "@/lib/connectiondb"
import { Projeto } from "../../../models/projeto";
import { LerToken } from '@/lib/jwt';
import { promiseHooks } from "v8";

export async function CriarProjeto(dados) {
    await connectDB();

    const nomeProjeto = String(dados.get("nomeProjeto") ?? "");
    const descricaoProjeto = String(dados.get("descricaoProjeto") ?? "");

    const {payload} = await LerToken();

    const idUsuario = payload?.sub;

    const projeto = await Projeto.create(
        {
            idUsuario,
            nomeProjeto,
            descricaoProjeto
        }
    );

    return{projetoCriado: true};
}

export async function LerProjeto(idProjeto) {
    await connectDB();

    const {payload} = await LerToken();
    const idUsuario = payload?.sub;

    var projetos = await Projeto.find({idUsuario}).lean();

    for (var i = 0 ; i < projetos.length ; i++)
    {
        projetos[i]._id = (projetos[i]._id).toString();
        projetos[i].idUsuario = projetos[i].idUsuario.toString();
    }

    return projetos;
}

export async function NomeProjeto(idProjeto) {
    await connectDB();

    var projeto = await Projeto.findOne({idProjeto}).lean();

    return projeto.nomeProjeto.toString();    
}

export async function AtualizarProjeto(id, dados) {
  await connectDB();

  const update = {
    nomeProjeto: String(dados.get("nomeProjeto") || ""),
    descricaoProjeto: String(dados.get("descricaoProjeto") || "")
  };

  try {
    await Projeto.updateOne({ _id: id }, { $set: update });
    return { projetoAtualizado: true };
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
}

export async function ExcluirProjeto(idProjeto)
{
  await Projeto.findByIdAndDelete(idProjeto);
  return {projetoExcluido: true}
}