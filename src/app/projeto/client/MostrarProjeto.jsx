"use client";

import { LerProjeto } from "@/app/projeto/server/actions"
import { useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import AtualizarProjetoClient from "@/app/projeto/client/AtualizarProjeto"
import ExcluirProjetoClient from "@/app/projeto/client/ExcluirProjeto";

export default function MostrarProjetoClient({atualizar, onChange})
{
    const [projetos, setProjetos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function carregar() {
        const objProjeto = await LerProjeto();
        setProjetos(objProjeto ?? []);
        }
        carregar();
    }, [atualizar]);

    const salvarProjeto = (idProjeto) => {
        localStorage.setItem("idProjeto", idProjeto);
        router.push(`/tarefas`);
    };

    return (
        <>
        {projetos.map((projeto, indice) => (
            <div onClick={()=>salvarProjeto(projeto._id)} key={indice} className="bg-gray-200 rounded-2xl p-5 m-2 h-max-80 w-60 hover:bg-gray-300 cursor-pointer">
                <div className="flex flex-row justify-between">
                    <p className="text-lg font-semibold">{String(projeto.nomeProjeto)}</p>
                </div>
                <div>
                    <p className="text-justify py-5 text-sm">
                        {String(projeto.descricaoProjeto)}
                    </p>
                </div>
                <div>
                    <AtualizarProjetoClient projeto={projeto} onEditado={onChange}/>
                    <ExcluirProjetoClient projeto = {projeto._id} onExcluido={onChange}/>
                </div>
            </div>
        ))}
        </>
    );
}