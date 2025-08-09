'use client';

import React from "react";
import {BuscarRegistro} from "@/app/login/actions";
import {useRouter} from "next/navigation";

type FormEvt = React.FormEvent<HTMLFormElement>;

export default function Login() { 
  const router = useRouter();
  
  async function escutaValidacao(event : FormEvt){
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    const {autenticado} = await BuscarRegistro(dados);

    if (autenticado)
    {
      router.push('/dashboard');
    }

    else alert("usuario ou senha invalidos");
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="bg-blue-500 bg-opacity-50 w-full md:w-1/2 lg:w-1/3 p-6 rounded-md shadow">
        <p className="text-xl font-semibold text-center text-white">Tela de Login</p>
        {/*Aqui o formulario chama a funcao quando o botao der submit*/}
        <form onSubmit={escutaValidacao} className="mt-4 space-y-3">
          <div className="flex flex-col">
            <label htmlFor="login">Login</label>
            <input 
              type="text"
              name="login" 
              id="login" 
              placeholder="Digite seu login" 
              required
              className="mt-1 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite sua senha"
              required
              className="mt-1 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button type="submit" className="w-full mt-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Logar
          </button>
        </form>
      </div>
    </div>
  );
}