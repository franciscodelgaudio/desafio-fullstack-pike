"use client";

import { MostrarTarefas } from "../server/actions";
import EditarTarefasClient from "./EditarTarefas";
import ExcluirTarefaClient from "./ExcluirTarefas";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { COLS } from "./cols"; // ajuste o caminho conforme sua estrutura

export function MostrarTarefasClient({ atualizar, onChange }) {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      const allTasks = await MostrarTarefas();
      setTarefas(allTasks);
    };
    fetchTarefas();
  }, [atualizar]);

  return (
    <>
      {tarefas.map((t, i) => (
        <div
            key={t.id ?? i}
            className={`grid grid-cols-[minmax(14rem,2fr)_1.2fr_1.1fr_1fr_1.2fr_5rem] items-center px-4 py-3 border-t hover:bg-gray-50`}
            >
            <div className="truncate text-sm">{t.nomeTarefa}</div>
            <div className="truncate text-sm">{t.projetoNome}</div>
            <div className="truncate text-sm">{t.status}</div>
            <div className="truncate text-sm">{t.prioridade}</div>
            <div className="whitespace-nowrap text-sm">
                {t.data ? format(new Date(t.data), "dd/MM/yyyy") : "-"}
            </div>

            {/* Ações centralizadas */}
            <div className="justify-self-center">
                <div className="flex items-center justify-center gap-2">
                <EditarTarefasClient tarefa={t} onEditado={onChange} />
                <ExcluirTarefaClient tarefa={t.id} onExcluido={onChange} />
                </div>
            </div>
            </div>
      ))}
    </>
  );
}
