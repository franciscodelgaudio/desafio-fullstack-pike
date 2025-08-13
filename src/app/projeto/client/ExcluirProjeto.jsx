"use client";

import { ExcluirProjeto } from "@/app/projeto/server/actions.js";
import { Trash } from "lucide-react";

export default function ExcluirProjetoClient({projeto, onExcluido})
{
    async function handleDelete() {
        await ExcluirProjeto(projeto);
        onExcluido();
    }

    return(
        <button onClick={handleDelete} className="mx-2 p-2 bg-red-400 rounded-xl cursor-pointer hover:bg-red-500">
            <Trash color="white" />
        </button>
    );
}