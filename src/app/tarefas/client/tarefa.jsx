"use client";

import React from "react";
import { useState } from "react";
import CriarTarefaClient from "./CriarTarefa";
import LerTarefaClient from "./LerTarefa";
import { Plus } from "lucide-react";

export function Tarefa() {  

  const [aberto, setAberto] = useState(false);
  const [atualizar, setAtualizar] = useState(false);

  function handleAtualizar() {
    setAtualizar(flag => !flag);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="py-5 px-10 font-bold text-2xl flex flex-col">Tarefas</h1>
        <div className="px-10">
          <button onClick={() => setAberto(true)} className="items-center hover:bg-gray-100 cursor-pointer flex flex-row bg-gray-500 p-2 px-3 bg-white border-2 border-black/30 rounded-4xl cur">
            <div className="flex flex-col pr-2">
              <Plus size={20} className="flex flex-col"/>
            </div>
            <div className="flex flex-col">
              Add
            </div>
          </button>
        </div>
      </div>

      {aberto && <CriarTarefaClient aberto={aberto} setAberto={setAberto} onCriado={handleAtualizar}/>}

      <div className="bg-gray-300 flex flex-row justify-between pl-10 pr-5 py-2 border-b-1">
        <div className="flex flex-col font-semibold text-left basis-5/5">
          <p>Nome da Tarefa</p>
        </div>
        <div className="flex flex-col font-semibold text-left basis-6/10">
          <p>Descriçao</p>
        </div>
        <div className="flex flex-col font-semibold text-left basis-1/10">
          <p>Status</p>
        </div>
        <div className="flex flex-col font-semibold text-left basis-1/10">
          <p>Prioridade</p>
        </div>
        <div className="flex flex-col font-semibold text-left basis-1/10 pr-10">
          <p>Vencimento</p>
        </div>
        <div className="flex flex-col font-semibold text-left basis-1/20 pr-4">
          <p>Ações</p>
        </div>
      </div>
      <LerTarefaClient atualizar={atualizar} onChange={handleAtualizar}/>
    </>
  );
}