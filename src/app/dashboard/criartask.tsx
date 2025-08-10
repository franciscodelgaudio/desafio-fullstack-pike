import { CriarTarefa } from "./actions";
import { useState } from "react";

type FormEvt = React.FormEvent<HTMLFormElement>;
type PropsCriarTask = {
  aberto: boolean;
  setAberto: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CriarTask({aberto, setAberto} : PropsCriarTask)
{
  async function NovaTarefa(event : FormEvt) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);

    await CriarTarefa(dados);
  }

  return( 
    <>{aberto && (
      <div className="p-6 bg-white-500 w-2/5 rounded-xl shadow-xl">
        <div className="flex flex-row justify-between items-center">
          <h1 className="p-3 font-bold text-2xl flex flex-col">Criar Tarefa</h1>
          <div className="flex flex-col p-0">
            <button onClick={()=> setAberto(false)} className="bg-gray-500 p-1 px-3 bg-white border-1 border-black/50 font-bold rounded-md">X</button>
          </div>
        </div>
          <form onSubmit={NovaTarefa}>
            <div className="flex flex-col p-3">
              <label className="font-bold pb-2 text-sm">Nome da tarefa</label>
              <input
                className="rounded-xl bg-gray-100 p-2 px-4"
                name="nomeTarefa"
                type="text"
                placeholder="Digite o nome da tarefa"
              />
            </div>
            <div className="flex flex-col p-3">
              <label className="font-bold text-sm pb-2">Descriçao da tarefa</label>
              <input
                className="rounded-xl bg-gray-100 p-2 px-4"
                name="descTarefa"
                type="text"
                placeholder="Digite o nome da tarefa"
              />
            </div>
            <div className="flex flex-row justify-between p-3">
              <div className="flex flex-col">
                <label className="font-bold text-sm pb-2">Status</label>
                <select className="rounded-xl bg-gray-100 p-2 px-4" name="status" id="cor-select">
                    <option value="masculino">Nao Iniciado</option>
                    <option value="feminino">Em processo</option>
                    <option value="outro">Pronto</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-sm pb-2">Prioridada</label>
                <select className="rounded-xl bg-gray-100 p-2 px-4" name="prioridade" id="cor-select">
                    <option value="masculino">alta</option>
                    <option value="feminino">media</option>
                    <option value="outro">baixa</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-sm pb-2 ">Data</label>
                <input
                  className="rounded-xl bg-gray-100 p-2 px-4"
                  name="data"
                  type="date"
                  placeholder="Dite o nome da tarefa"
                />
              </div>
            </div>
            <div className="grid">
              <button type="submit" className="m-3 justify-self-end bg-blue-500 text-white rounded-md p-2 px-5">
                Criar Tarefa
              </button>
            </div>
          </form>
      </div>
    )}
    </>
  );
}
