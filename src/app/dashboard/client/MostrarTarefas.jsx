"use client";

import { MostrarTarefas } from "../server/actions";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

export function MostrarTarefasClient()
{
    const [tarefa, setTarefas] = useState([]);

    useEffect(() => {
        // Função assíncrona dentro do useEffect
        const fetchTarefas = async () => {
        const allTasks = await MostrarTarefas(); // Chama a função que retorna as tarefas
        setTarefas(allTasks); // Atualiza o estado com as tarefas
        };

        fetchTarefas(); // Chama a função assíncrona
    }, []); // O efeito roda apenas uma vez quando o componente é montado

    return( 
        <>
        {tarefa.map((tarefa, indice) => (
        <div key={indice} className="bg-white flex flex-row justify-between pl-10 pr-5 py-2 border-b-1 items-center hover:bg-gray-100">
            <p className="text-left basis-4/10">{String(tarefa.nomeTarefa)}</p>
            <p className="text-left basis-6/10">{String(tarefa.idProjeto)}</p>
            <p className="text-left basis-1/10">{String(tarefa.status)}</p>
            <p className="text-left basis-1/10">{String(tarefa.prioridade)}</p>
            <p className="text-left basis-1/10 pr-10">{format(new Date(tarefa.data), "dd/MM/yyyy")}</p>
        </div>
        ))}
        </>
    );
}