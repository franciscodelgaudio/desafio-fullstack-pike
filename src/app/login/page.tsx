import { redirect } from "next/navigation";
import { ValidarToken } from "../dashboard/actions";
import LoginForm from "./loginform"; // novo arquivo com seu form

export default async function LoginPage() {
  const { autenticado } = await ValidarToken();

  if (autenticado) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}