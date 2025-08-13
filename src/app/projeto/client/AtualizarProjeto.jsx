"use client";

import {AtualizarProjeto} from "@/app/projeto/server/actions";
import { Pencil } from "lucide-react";
import { useState } from "react";

export default function AtualizarProjetoClient({ projeto, onEditado })
{
    const [aberto, setAberto] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const dados = new FormData(event.currentTarget);
        await AtualizarProjeto(projeto._id, dados);
        setAberto(false);
        onEditado();
    }

    return (
        <>
        <button onClick={() => setAberto(true)} className="p-2 bg-blue-400 rounded-xl cursor-pointer hover:bg-blue-500">
            <Pencil color="white" />
        </button>

        {aberto &&(
      <div className="fixed inset-0 z-50 flex items-center justify-center border-red-100">
        <div className="p-6 bg-white w-2/8 rounded-xl shadow-2xl border-1 border-gray-200">

          <div className="flex flex-row justify-between items-center">
            <h1 className="p-3 font-bold text-2xl flex flex-col">Criar Projeto</h1>
            <div className="flex flex-col p-0">
              <button onClick={()=>setAberto(false)} className="bg-white p-1 px-3 bg-white border-1 border-gray-300 font-bold rounded-xl cursor-pointer hover:bg-red-200">X</button>
            </div>
          </div>

        <form onSubmit={handleSubmit} className="items-center justify-center">
            <div className="p-2">
                <input
                    name="nomeProjeto"
                    type="text"
                    placeholder="Nome projeto"
                    className="bg-gray-200 rounded-xl p-3 w-100"
                    defaultValue={projeto.nomeProjeto}
                >
                </input>
            </div>

            <div className="p-2">
                <input
                    name="descricaoProjeto"
                    type="text"
                    placeholder="Descrição projeto"
                    className="bg-gray-200 rounded-xl p-2 h-50 w-100"
                    defaultValue={projeto.descricaoProjeto}
                >
                </input>
            </div>

            <div className="grid">
              <button type="submit" className="m-3 justify-self-end bg-blue-500 text-white rounded-md p-2 px-5 cursor-pointer hover:bg-blue-700">
                Salvar Alterações
              </button>
            </div>
        </form>
        </div>
      </div>  )}
      </>
    );
}