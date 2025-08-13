"use client";

import { Plus } from "lucide-react";
import CriarProjetoClient from "./CriarProjeto";
import { useState } from "react";
import MostrarProjetoClient from "./MostrarProjeto";

export default function Projeto() {
  const [aberto, setAberto] = useState(false);
  const [atualizar, setAtualizar] = useState(false);

  function handleAtualizar() {
    setAtualizar(flag => !flag);
  }

  const toggleCriarProjeto = () => {
    setAberto(!aberto);
  };

  return (
    <>
      <h1 className="py-5 px-3 font-bold text-2xl">PROJETOS</h1>

      <div className="flex flex-wrap gap-4">

        <MostrarProjetoClient atualizar={atualizar} onChange={handleAtualizar}/>

        <div className="bg-gray-200 rounded-2xl p-5 m-2 h-max-80 w-60 flex justify-center items-center hover:bg-gray-400 cursor-pointer">
          <button
            onClick={toggleCriarProjeto}
            className="h-full w-full flex flex-col justify-center items-center rounded-2xl cursor-pointer"
          >
            <Plus size={30} />
            <div className="flex flex-col text-xl font-semibold">Adicionar</div>
          </button>
        </div>
      </div>

      <CriarProjetoClient aberto={aberto} setAberto={setAberto} onCriado={handleAtualizar}/>
    </>
  );
}
