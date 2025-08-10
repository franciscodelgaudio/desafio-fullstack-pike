import { redirect } from "next/navigation";
import { ValidarToken } from "./actions";
import Ui from "@/app/dashboard/ui"

export default async function Dashboard()
{
    const {autenticado} = await ValidarToken();

    if (!autenticado) {
        redirect("/login");
        return;
    }

    return (
        <Ui/>
    );
}