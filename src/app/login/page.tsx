import { redirect } from "next/navigation";
import { LerToken } from "@/lib/jwt";
import Login from "./client/login"; // novo arquivo com seu form

export default async function page() {
  const { autenticado } = await LerToken();
  if (autenticado) redirect("/dashboard");

  return <Login />;
}