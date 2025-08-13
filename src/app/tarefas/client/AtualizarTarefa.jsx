"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { AtualizarTarefa } from "@/app/tarefas/server/actions.js";

export default function AtualizarTarefaClient({ tarefa, onEditado }) {
  const [aberto, setAberto] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    await AtualizarTarefa(tarefa._id, dados);
    setAberto(false);
    onEditado();
  }

  return (
    <>
    <div className="flex flex-col items-center h-10 justify-center hover:bg-gray-300 rounded-md">
      <button onClick={() => setAberto(true)} className="px-2 cursor-pointer ">
        <Pencil size={20} />
      </button>
    </div>

      {aberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center border-red-100">
          <div className="p-6 bg-white w-2/5 rounded-xl shadow-2xl border-1 border-gray-200">
            <div className="flex flex-row justify-between items-center">
              <h1 className="p-3 font-bold text-2xl">Editar Tarefa</h1>
              <button
                onClick={() => setAberto(false)}
                className="bg-white p-1 px-3 bg-white border-1 border-gray-300 font-bold rounded-xl cursor-pointer hover:bg-red-200"
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col p-3">
                <label className="font-bold pb-2 text-sm">Nome da tarefa</label>
                <input
                  className="rounded-xl bg-gray-100 p-2 px-4"
                  name="nomeTarefa"
                  type="text"
                  defaultValue={tarefa.nomeTarefa}
                />
              </div>

              <div className="flex flex-col p-3">
                <label className="font-bold text-sm pb-2">Descrição</label>
                <input
                  className="rounded-xl bg-gray-100 p-2 px-4"
                  name="descTarefa"
                  type="text"
                  defaultValue={tarefa.descTarefa}
                />
              </div>

              <div className="flex flex-row justify-between p-3">
                <div className="flex flex-col">
                  <label className="font-bold text-sm pb-2">Status</label>
                  <select
                    className="rounded-xl bg-gray-100 p-2 px-4"
                    name="status"
                    defaultValue={tarefa.status}
                  >
                    <option value="Não Iniciado">Não Iniciado</option>
                    <option value="Em Processo">Em Processo</option>
                    <option value="Pronto">Pronto</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-bold text-sm pb-2">Prioridade</label>
                  <select
                    className="rounded-xl bg-gray-100 p-2 px-4"
                    name="prioridade"
                    defaultValue={tarefa.prioridade}
                  >
                    <option value="alta">alta</option>
                    <option value="media">media</option>
                    <option value="baixa">baixa</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-bold text-sm pb-2">Data</label>
                  <input
                    className="rounded-xl bg-gray-100 p-2 px-4"
                    name="data"
                    type="date"
                    defaultValue={tarefa.data}
                  />
                </div>
              </div>

              <div className="grid">
                <button
                  type="submit"
                  className="m-3 justify-self-end bg-blue-500 text-white rounded-md p-2 px-5 cursor-pointer hover:bg-blue-700"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
