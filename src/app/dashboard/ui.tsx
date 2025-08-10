  'use client';

  import React from "react";
  import { CriarTask } from "./criartask";
  import { useState } from "react";

type PropsMostrarTask = {
  setAberto: React.Dispatch<React.SetStateAction<boolean>>;
};

  export default function Ui() {

    const [aberto, setAberto] = useState(false);
    return (
      <>
        <MostrarTask setAberto={setAberto}/>
        <CriarTask aberto={aberto} setAberto={setAberto} />
      </>
    );
  }

  export function MostrarTask({setAberto} : PropsMostrarTask)
  {
    return(
      <div>
        <div className="flex flex-row justify-between items-center">
          <h1 className="p-3 font-bold text-2xl flex flex-col">DASHBOARD</h1>
          <div className="flex flex-col p-0">
            <button onClick={()=> setAberto(true)} className="bg-gray-500 p-1 px-3 bg-white border-1 border-black/50 font-bold rounded-md">Add +</button>
          </div>
        </div>

        <div className="bg-white-500 flex flex-row justify-between px-10 py-2 border-b-1">  
          <p className="flex flex-col">NOME DA TAREFA</p>
          <p className="flex flex-col">DATA DA TAREFA</p>
          <p className="flex flex-col">STATUS</p>
          <p className="flex flex-col">PRIORIDADE</p>
        </div>
      </div>
    );
  }