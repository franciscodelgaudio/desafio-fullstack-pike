"use client";

import { CriarTarefa } from "../server/actions.js";
import { useState, useEffect } from "react";

export default function CriarTarefaClient({aberto, setAberto, onCriado})
{

  const [idProjeto, setIdProjeto] = useState(null);
  
  useEffect(() => {
    const projeto = localStorage.getItem("idProjeto");
    setIdProjeto(projeto);
  }, []);
  
  async function handleTask(event) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);

    await CriarTarefa(dados, idProjeto);
    setAberto(false);
    onCriado();
  }

  return( 
    <>
    {aberto && (
      <div className="fixed inset-0 z-50 flex items-center justify-center border-red-100">
        <div className="p-6 bg-white w-2/5 rounded-xl shadow-2xl border-1 border-gray-200">

          <div className="flex flex-row justify-between items-center">
            <h1 className="p-3 font-bold text-2xl flex flex-col">Criar Tarefa</h1>
            <div className="flex flex-col p-0">
              <button onClick={()=> setAberto(false)} className="bg-white p-1 px-3 bg-white border-1 border-gray-300 font-bold rounded-xl cursor-pointer hover:bg-red-200">X</button>
            </div>
          </div>

            <form onSubmit={handleTask}>

              <div className="flex flex-col p-3">
                <label className="font-bold pb-2 text-sm">Nome da tarefa</label>
                <input
                className="rounded-xl bg-gray-100 p-2 px-4"
                name="nomeTarefa"
                type="text"
                placeholder="Digite o nome da tarefa"
              />
            </div>

            <div className="flex flex-col p-3">
              <label className="font-bold text-sm pb-2">Descriçao da tarefa</label>
              <input
                className="rounded-xl bg-gray-100 p-2 px-4"
                name="descTarefa"
                type="text"
                placeholder="Digite o nome da tarefa"
              />
            </div>

            <div className="flex flex-row justify-between p-3">
              <div className="flex flex-col">
                <label className="font-bold text-sm pb-2">Status</label>
                <select className="rounded-xl bg-gray-100 p-2 px-4" name="status" id="status">
                    <option value="Não Iniciado">Não Iniciado</option>
                    <option value="Em Processo">Em Processo</option>
                    <option value="Pronto">Pronto</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-bold text-sm pb-2">Prioridada</label>
                <select className="rounded-xl bg-gray-100 p-2 px-4" name="prioridade" id="prioridade">
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-bold text-sm pb-2 ">Data</label>
                <input
                  className="rounded-xl bg-gray-100 p-2 px-4"
                  name="data"
                  type="date"
                  placeholder="Dite o nome da tarefa"
                />
              </div>
            </div>

            <div className="grid">
              <button type="submit" className="m-3 justify-self-end bg-blue-500 text-white rounded-md p-2 px-5 cursor-pointer hover:bg-blue-700">
                Criar Tarefa
              </button>
            </div>

          </form>
        </div>
      </div>
    )}
    </>
  );
}
