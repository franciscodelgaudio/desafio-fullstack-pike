import Register from "./client/register";
import { LerToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

export default async function page()
{
  const { autenticado } = await LerToken();
  if (autenticado) redirect("/projeto");

  return(
    <Register/>
  );
}