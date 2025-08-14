"use client";

import React from "react";
import { useState } from "react";
import { ListFilter } from "lucide-react";
import { MostrarTarefasClient } from "../client/MostrarTarefas";

export default function Dashboard() {  
    const [aberto, setAberto] = useState(false);
    const [atualizar, setAtualizar] = useState(false);
  
    function handleAtualizar() {
      setAtualizar(flag => !flag);
    }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="py-5 px-10 font-bold text-2xl flex flex-col">Dashboard</h1>
      </div>

      <button className="bg-gray-500 px-4 py-2 flex">
        <ListFilter/>
        <p className="pl-4">FILTRO</p>
      </button>

      <div className="bg-gray-300 flex flex-row justify-between pl-10 pr-5 py-2 border-b-1">

        <div className="flex flex-col font-semibold text-left basis-1/10">
          <p>Nome da Tarefa</p>
        </div>

        <div className="flex flex-col font-semibold text-left basis-1/10">
          <p>Projeto</p>
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

        <div className="flex flex-col font-semibold text-left basis-1/10 pr-4 ">
          <p>Ações</p>
        </div>
      </div>
      <MostrarTarefasClient atualizar={atualizar} onChange={handleAtualizar}/>
    </>
  );
}