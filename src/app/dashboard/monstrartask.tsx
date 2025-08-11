  import { BuscarTarefa } from "./actions";
  
  export default async function MostrarTask()
  {
    
    const {tarefas} = await BuscarTarefa();

    return(
      <>
       {tarefas.map((t, i) => (
        <div key={i} className="bg-white-500 flex flex-row justify-between px-10 py-2 border-b-1">
          <p className="flex flex-col">{String(t.nomeTarefa)}</p>
          <p className="flex flex-col">{String(t.descTarefa)}</p>
          <p className="flex flex-col">{String(t.status)}</p>
          <p className="flex flex-col">{String(t.prioridade)}</p>
          <p className="flex flex-col">{String(t.data)}</p>
        </div>
      ))}
      </>
    );
  }