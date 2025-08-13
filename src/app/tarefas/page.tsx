import { redirect } from "next/navigation";
import { LerToken } from "@/lib/jwt";
import { Tarefa } from "@/app/tarefas/client/tarefa"

export default async function page()
{
    const {autenticado} = await LerToken();
    if (!autenticado) redirect("/login");

    return (
        <Tarefa/>
    );
}