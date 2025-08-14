import Dashboard from "@/app/dashboard/client/Dashboard";
import {MostrarTarefasClient } from "./client/MostrarTarefas";

export default function page()
{
    return(
        <>
        <Dashboard/>
        <MostrarTarefasClient/>
        </>
    );
}