"use client";

import { useEffect, useState } from "react";
import { LerTarefa } from "../server/actions.js";
import AtualizarTarefaClient from "./AtualizarTarefa.jsx";
import ExcluirTarefaClient from "./ExcluirTarefa.jsx";
import { format } from "date-fns";
import { StatusBadge, PrioridadeBadge } from "@/components/TagPills";

// mesmas colunas usadas no MostrarTarefas
const COLS = "grid-cols-[minmax(14rem,2fr)_1.2fr_1.1fr_1fr_1.2fr_5rem]";

export default function LerTarefaClient({ atualizar, onChange }) {
  const [tarefas, setTarefas] = useState([]);
  const [idProjeto, setIdProjeto] = useState(null);

  // Carrega idProjeto do localStorage (inalterado)
  useEffect(() => {
    const projeto = localStorage.getItem("idProjeto");
    setIdProjeto(projeto);
  }, []);

  // Busca tarefas quando idProjeto/atualizar mudarem (inalterado)
  useEffect(() => {
    if (idProjeto) {
      async function carregar() {
        const objTarefa = await LerTarefa(idProjeto);
        setTarefas(objTarefa ?? []);
      }
      carregar();
    }
  }, [idProjeto, atualizar]);

  return (
    <>
      {tarefas.map((tarefa, indice) => (
        <div
          key={indice}
          className={`grid ${COLS} items-center px-4 py-3 border-t border-gray-200 hover:bg-gray-50`}
        >
          {/* Nome da Tarefa */}
          <div className="truncate text-sm">{String(tarefa.nomeTarefa)}</div>

          {/* Projeto (se não vier no objeto, mostra "-") */}
          <div className="truncate text-sm">
            {tarefa.projetoNome ? String(tarefa.projetoNome) : "-"}
          </div>

          {/* Status e Prioridade com o mesmo visual (badges) */}
          <div>
            <StatusBadge value={String(tarefa.status)} />
          </div>
          <div>
            <PrioridadeBadge value={String(tarefa.prioridade)} />
          </div>

          {/* Vencimento */}
          <div className="whitespace-nowrap text-sm">
            {tarefa.data ? format(new Date(tarefa.data), "dd/MM/yyyy") : "-"}
          </div>

          {/* Ações centralizadas como no MostrarTarefas */}
          <div className="justify-self-center">
            <div className="flex items-center justify-center gap-2">
              <AtualizarTarefaClient tarefa={tarefa} onEditado={onChange} />
              <ExcluirTarefaClient tarefa={tarefa._id} onExcluido={onChange} />
            </div>
          </div>
        </div>
      ))}

      {!tarefas?.length && (
        <div className="px-4 py-6 text-sm text-gray-500">
          Nenhuma tarefa encontrada.
        </div>
      )}
    </>
  );
}
