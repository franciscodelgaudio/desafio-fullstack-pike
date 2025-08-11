'use client';

import { CriarTask } from "./criartask";
import { useState } from "react";

export default function Interativo()
{
    const [aberto, setAberto] = useState(false);
    return (
        <>
            <div className="flex flex-col p-0">
                <button onClick={()=> setAberto(true)} className="bg-gray-500 p-1 px-3 bg-white border-1 border-black/50 font-bold rounded-md">Add +</button>
            </div>
            <CriarTask aberto={aberto} setAberto={setAberto} />
        </>
    );
}