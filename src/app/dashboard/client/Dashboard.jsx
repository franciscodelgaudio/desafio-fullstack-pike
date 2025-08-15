"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { MostrarTarefasClient } from "../client/MostrarTarefas";

export default function Dashboard() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [atualizar, setAtualizar] = useState(false);

  function handleAtualizar() { setAtualizar(f => !f); }

  return (
    <>
      <div className="justify-between items-center">
        <h1 className="pt-5 px-10 font-bold text-3xl">Dashboard</h1>
        <h2 className="py-2 px-10 flex flex-col text-gray-500">Visão geral das suas tarefas e projetos</h2>
      </div>

      <div className="ring-2 ring-gray-200 rounded-md p-4 m-5">
        <h2 className="font-semibold">Lista de Tarefas</h2>
        <h3 className="text-gray-500 text-sm">Gerencie e acompanhe o progresso de suas tarefas</h3>

        <div className="flex gap-5 my-5">
          {/* Busca */}
          <div className="flex basis-2/5 items-center rounded-md ring-1 ring-gray-200">
            <Search className="w-4 h-4 text-gray-400 m-2" />
            <input
              className="flex-1 bg-transparent outline-none placeholder:text-gray-400 py-2"
              placeholder="Buscar tarefas..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="justify-center flex basis-2/5 items-center">
            <select
              className="rounded-md ring-1 ring-gray-200 py-2 pr-10 pl-2"
              name="status"
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="">Todos os Status</option>
              <option value="Não Iniciado">Não Iniciado</option>
              <option value="Em Processo">Em Processo</option>
              <option value="Pronto">Pronto</option>
            </select>
          </div>

          {/* Prioridade */}
          <div className="flex basis-2/5 items-center justify-center">
            <select
              className="rounded-md ring-1 ring-gray-200 py-2 pr-10 pl-2"
              name="prioridade"
              id="prioridade"
              value={prioridade}
              onChange={e => setPrioridade(e.target.value)}
            >
              <option value="">Todas as Prioridades</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[900px] rounded-2xl border border-gray-200">
            <div
              className="
                grid items-center px-4 py-3 rounded-t-2xl bg-gray-200 text-sm font-semibold text-gray-700
                grid-cols-[minmax(14rem,2fr)_1.2fr_1.1fr_1fr_1.2fr_5rem]
              "
            >
              <div>Nome da Tarefa</div>
              <div>Projeto</div>
              <div>Status</div>
              <div>Prioridade</div>
              <div>Vencimento</div>
              <div className="text-center">Ações</div>
            </div>

            {/* Passe os filtros para o client component */}
            <MostrarTarefasClient
              atualizar={atualizar}
              onChange={handleAtualizar}
              filtros={{ q, status, prioridade }}
            />
          </div>
        </div>
      </div>
    </>
)}