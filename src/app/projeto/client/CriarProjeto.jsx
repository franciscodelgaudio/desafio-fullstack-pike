"use client";

import {CriarProjeto} from "@/app/projeto/server/actions";

export default function CriarProjetoClient({aberto, setAberto, onCriado})
{
    async function handleProjeto(event)
    {
        event.preventDefault();

        const dados = new FormData(event.currentTarget);

        await CriarProjeto(dados);
        
        setAberto(false);
        onCriado();
    }

    return (aberto &&
      <div className="fixed inset-0 z-50 flex items-center justify-center border-red-100">
        <div className="p-6 bg-white w-2/8 rounded-xl shadow-2xl border-1 border-gray-200">

          <div className="flex flex-row justify-between items-center">
            <h1 className="p-3 font-bold text-2xl flex flex-col">Criar Projeto</h1>
            <div className="flex flex-col p-0">
              <button onClick={()=>setAberto(false)} className="bg-white p-1 px-3 bg-white border-1 border-gray-300 font-bold rounded-xl cursor-pointer hover:bg-red-200">X</button>
            </div>
          </div>

        <form onSubmit={handleProjeto} className="items-center justify-center">
            <div className="p-2">
                <input
                    name="nomeProjeto"
                    type="text"
                    placeholder="Nome projeto"
                    className="bg-gray-200 rounded-xl p-3 w-100"
                >
                </input>
            </div>

            <div className="p-2">
                <input
                    name="descricaoProjeto"
                    type="text"
                    placeholder="Descrição projeto"
                    className="bg-gray-200 rounded-xl p-2 h-50 w-100"
                >
                </input>
            </div>

            <div className="grid">
              <button type="submit" className="m-3 justify-self-end bg-blue-500 text-white rounded-md p-2 px-5 cursor-pointer hover:bg-blue-700">
                Criar Projeto
              </button>
            </div>
        </form>
        </div>
      </div>  
    );
}