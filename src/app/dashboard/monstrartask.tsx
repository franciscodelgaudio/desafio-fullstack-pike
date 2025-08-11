import { BuscarTarefa } from "./actions";
import DeletarTask from "./deletartask";
import EditarTask from "./editar";
  
export default async function MostrarTask()
{
  const {listaTasks} = await BuscarTarefa();

  return(
    <>
      {listaTasks.map((tarefa, indice) => (
      <div key={indice} className="bg-white-500 flex flex-row justify-between px-10 py-2 border-b-1">
        <p className="text-left basis-4/10">{String(tarefa.nomeTarefa)}</p>
        <p className="text-left basis-6/10">{String(tarefa.descTarefa)}</p>
        <p className="text-left basis-1/10">{String(tarefa.status)}</p>
        <p className="text-left basis-1/10">{String(tarefa.prioridade)}</p>
        <p className="text-left basis-1/10">{String(tarefa.data)}</p>
        <DeletarTask id={String(tarefa._id)}/>
        <EditarTask tarefa={{
          _id: String(tarefa._id),
          nomeTarefa: tarefa.nomeTarefa,
          descTarefa: tarefa.descTarefa,
          status: tarefa.status,
          prioridade: tarefa.prioridade,
          data: tarefa.data
        }} />
      </div>
    ))}
    </>
  );
}