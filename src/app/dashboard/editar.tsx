"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { AtualizarTarefa } from "./actions"; // sua função de update no banco

type Props = {
  tarefa: {
    _id: string;
    nomeTarefa: string;
    descTarefa: string;
    status: string;
    prioridade: string;
    data: string;
  };
};

export default function EditarTask({ tarefa }: Props) {
  const [aberto, setAberto] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    await AtualizarTarefa(tarefa._id, dados);
    router.refresh();
    setAberto(false);
  }

  return (
    <>
      <button onClick={() => setAberto(true)} className="px-2">
        <Pencil size={20} />
      </button>

      {aberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="p-6 bg-white w-2/5 rounded-xl shadow-xl">
            <div className="flex flex-row justify-between items-center">
              <h1 className="p-3 font-bold text-2xl">Editar Tarefa</h1>
              <button
                onClick={() => setAberto(false)}
                className="bg-gray-500 p-1 px-3 border font-bold rounded-md"
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
                  className="m-3 justify-self-end bg-blue-500 text-white rounded-md p-2 px-5"
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
