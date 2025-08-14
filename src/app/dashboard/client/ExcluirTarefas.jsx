"use client";

import { ExcluirTarefa } from "@/app/tarefas/server/actions.js";
import { Trash } from "lucide-react";

export default function ExcluirTarefaClient({tarefa, onExcluido})
{

    async function handleDelete() {
        await ExcluirTarefa(tarefa);
        onExcluido();
    }

    return(
        <>
        <div className="flex flex-col items-center h-10 justify-center hover:bg-red-300 rounded-md">
            <button onClick={handleDelete} className="text-left px-2 cursor-pointer">
                <Trash size={20}/>
            </button>
        </div>
        </>
    );
}

