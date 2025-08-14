"use client";

import React from "react";
import { useState } from "react";
import {Search} from "lucide-react"
import { MostrarTarefasClient } from "../client/MostrarTarefas";
import { COLS } from "./cols";

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

      <div className="ring-2 ring-gray-200 rounded-md p-4 m-5">

        <h2 className="font-semibold">Lista de Tarefas</h2>
        <h3 className="text-gray-500 text-sm">Gerencie e acompanhe o progresso de suas tarefas</h3>

        <div className="flex">
          <div className="flex basis-2/5 items-center rounded-md ring-1 ring-gray-200 my-5">
            <Search className="w-4 h-4 text-gray-400 m-2" />
            <input className="flex-1 bg-transparent outline-none placeholder:text-gray-400 py-2" placeholder="Buscar tarefas..." />
          </div>
        </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px] rounded-2xl border border-gray-200">
          <div
            className={`
              grid items-center px-4 py-3 rounded-t-2xl bg-gray-200 text-sm font-semibold text-gray-700
              grid-cols-[minmax(14rem,2fr)_1.2fr_1.1fr_1fr_1.2fr_5rem]
            `}
          >
            <div>Nome da Tarefa</div>
            <div>Projeto</div>
            <div>Status</div>
            <div>Prioridade</div>
            <div>Vencimento</div>
            <div className="text-center">Ações</div> {/* <-- centralizado */}
          </div>

          <MostrarTarefasClient atualizar={atualizar} onChange={handleAtualizar} />
        </div>
      </div>
      </div>
    </>
  );
}