"use client";

import React, { useState } from "react";
import CriarTarefaClient from "./CriarTarefa";
import LerTarefaClient from "./LerTarefa";
import { Search, Plus } from "lucide-react";

export function Tarefa() {
  // ==== mesma lógica (inalterada) ====
  const [aberto, setAberto] = useState(false);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [atualizar, setAtualizar] = useState(false);

  function handleAtualizar() {
    setAtualizar(flag => !flag);
  }
  // ===================================

  return (
    <>
      {/* Cabeçalho igual ao Dashboard */}
      <div className="justify-between items-center">
        <h1 className="pt-5 px-10 font-bold text-3xl">Tarefas</h1>
        <h2 className="py-2 px-10 flex flex-col text-gray-500">
          Visão geral das suas tarefas
        </h2>
      </div>

      {/* Modal de criação (mesma lógica) */}
      {aberto && (
        <CriarTarefaClient
          aberto={aberto}
          setAberto={setAberto}
          onCriado={handleAtualizar}
        />
      )}

      {/* Card principal idêntico ao Dashboard */}
      <div className="ring-2 ring-gray-200 rounded-md p-4 m-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold">Lista de Tarefas</h2>
            <h3 className="text-gray-500 text-sm">
              Gerencie e acompanhe o progresso de suas tarefas
            </h3>
          </div>

          {/* Botão Add mantido (só ajustado o visual) */}
          <button
            onClick={() => setAberto(true)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-black/30 bg-white px-3 py-2 hover:bg-gray-100"
          >
            <Plus size={18} />
            <span>Adicionar</span>
          </button>
        </div>

        {/* Tabela/grade idêntica ao Dashboard */}
        <div className="overflow-x-auto mt-5">
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

            {/* Lista mantida exatamente como estava (LerTarefaClient) */}
            <LerTarefaClient atualizar={atualizar} onChange={handleAtualizar} />
          </div>
        </div>
      </div>
    </>
  );
}
