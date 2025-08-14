"use client";

import { MostrarTarefas } from "../server/actions";
import EditarTarefasClient from "./EditarTarefas";
import ExcluirTarefaClient from "./ExcluirTarefas";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

export function MostrarTarefasClient({atualizar, onChange})
{
    const [tarefa, setTarefas] = useState([]);

    useEffect(() => {
        const fetchTarefas = async () => {
            const allTasks = await MostrarTarefas();
            setTarefas(allTasks);
        };

        fetchTarefas();
    }, [atualizar]);

    return( 
        <>
        {tarefa.map((tarefa, indice) => (
        <div key={indice} className="bg-white flex flex-row justify-between pl-10 pr-5 py-2 border-b-1 items-center hover:bg-gray-100">
            <p className="text-left basis-1/10">{String(tarefa.nomeTarefa)}</p>
            <p className="text-left basis-1/10">{String(tarefa.projetoNome)}</p>
            <p className="text-left basis-1/10">{String(tarefa.status)}</p>
            <p className="text-left basis-1/10">{String(tarefa.prioridade)}</p>
            <p className="text-left basis-1/10 pr-10">{format(new Date(tarefa.data), "dd/MM/yyyy")}</p>
            <div className="basis-1/10 pr-4">
                <div className="flex">
                    <EditarTarefasClient tarefa={tarefa} onEditado={onChange}/>
                    <ExcluirTarefaClient tarefa = {tarefa.id} onExcluido={onChange}/>
                </div>
            </div>
        </div>
        ))}
        </>
    );
}