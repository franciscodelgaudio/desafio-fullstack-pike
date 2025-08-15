"use client";

import { MostrarTarefas } from "../server/actions";
import EditarTarefasClient from "./EditarTarefas";
import ExcluirTarefaClient from "./ExcluirTarefas";
import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { StatusBadge, PrioridadeBadge } from "@/components/TagPills";

const COLS = "grid-cols-[minmax(14rem,2fr)_1.2fr_1.1fr_1fr_1.2fr_5rem]";

function norm(v = "") {
  return v.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

export function MostrarTarefasClient({ atualizar, onChange, filtros }) {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    (async () => {
      const allTasks = await MostrarTarefas();
      setTarefas(allTasks);
    })();
  }, [atualizar]);

  const lista = useMemo(() => {
    const nq = norm(filtros?.q || "");
    const fStatus = filtros?.status || "";
    const fPrio = filtros?.prioridade || "";

    return (tarefas || []).filter(t => {
        const matchBusca =
          !nq ||
          norm(t.nomeTarefa).includes(nq) ||
          norm(t.descTarefa || "").includes(nq) ||
          norm(t.projetoNome || "").includes(nq);

        const matchStatus = !fStatus || t.status === fStatus;
        const matchPrio = !fPrio || t.prioridade === fPrio;

        return matchBusca && matchStatus && matchPrio;
      });
    }, [tarefas, filtros]);

  return (
    <>
      {lista.map((t) => (
        <div
          key={t.id ?? i}
          className={`grid ${COLS} items-center px-4 py-3  border-t border-gray-200 hover:bg-gray-50`}
        >
          <div className="truncate text-sm">{t.nomeTarefa}</div>
          <div className="truncate text-sm">{t.projetoNome}</div>

          {/* BADGES do shadcn */}
          <div><StatusBadge value={t.status} /></div>
          <div><PrioridadeBadge value={t.prioridade} /></div>

          <div className="whitespace-nowrap text-sm">
            {t.data ? format(new Date(t.data), "dd/MM/yyyy") : "-"}
          </div>

          <div className="justify-self-center">
            <div className="flex items-center justify-center gap-2">
              <EditarTarefasClient tarefa={t} onEditado={onChange} />
              <ExcluirTarefaClient tarefa={t.id} onExcluido={onChange} />
            </div>
          </div>
        </div>
      ))}
      {!lista.length && (
        <div className="px-4 py-6 text-sm text-gray-500">Nenhuma tarefa encontrada com os filtros atuais.</div>
      )}
    </>
  );
}
