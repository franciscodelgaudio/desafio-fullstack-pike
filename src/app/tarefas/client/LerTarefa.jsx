"use client";

import { useEffect, useState } from "react";
import { LerTarefa } from "../server/actions.js";
import AtualizarTarefaClient from "./AtualizarTarefa.jsx";
import ExcluirTarefaClient from "./ExcluirTarefa.jsx";
import { format } from "date-fns"
  
export default function LerTarefaClient({atualizar, onChange})
{
  const [tarefas, setTarefas] = useState([]);
  const [idProjeto, setIdProjeto] = useState(null);

  // Carregar o idProjeto do localStorage
  useEffect(() => {
    const projeto = localStorage.getItem("idProjeto");
    setIdProjeto(projeto);
  }, []); // Executa uma vez na montagem do componente

  // Carregar as tarefas quando o idProjeto for atualizado
  useEffect(() => {
    if (idProjeto) {
      async function carregar() {
        const objTarefa = await LerTarefa(idProjeto);
        setTarefas(objTarefa ?? []);
      }
      carregar();
    }
  }, [idProjeto, atualizar]); // Carrega tarefas quando idProjeto ou atualizar mudarem

  return(
    <>
      {tarefas.map((tarefa, indice) => (
      <div key={indice} className="bg-white flex flex-row justify-between pl-10 pr-5 py-2 border-b-1 items-center hover:bg-gray-100">
        <p className="text-left basis-4/10">{String(tarefa.nomeTarefa)}</p>
        <p className="text-left basis-6/10">{String(tarefa.descTarefa)}</p>
        <p className="text-left basis-1/10">{String(tarefa.status)}</p>
        <p className="text-left basis-1/10">{String(tarefa.prioridade)}</p>
        <p className="text-left basis-1/10 pr-10">{format(new Date(tarefa.data), "dd/MM/yyyy")}</p>
        <div className="basis-1/20 flex flex-row">
          <AtualizarTarefaClient tarefa={tarefa} onEditado={onChange}/>
          <ExcluirTarefaClient tarefa = {tarefa._id} onExcluido={onChange}/>
        </div>
      </div>
    ))}
    </>
  );
}