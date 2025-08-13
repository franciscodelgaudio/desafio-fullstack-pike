"use client";

import React from "react";
import LerRegistro from "@/app/login/server/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormEvt = React.FormEvent<HTMLFormElement>;

export default function Login() {

    const router = useRouter();
  
    async function handleLogin(event : FormEvt){
        event.preventDefault();
        const dados = new FormData(event.currentTarget);
        const {autenticado, token} = await LerRegistro(dados);

        if (autenticado != null && token != null)
        {
            document.cookie = `token=${token}; path=/;`;
            alert("Usuário logado com sucesso!");
            router.push('/projeto');
        }
        else alert("Usuário ou senha incorreto!");
    }

    return (
        <div className="bg-gray-200 h-screen w-screen flex items-center justify-center">
            <div className="bg-white bg-opacity-50 w-full max-w-[400px] p-8 px-10 rounded-4xl shadow">

                <p className="text-2xl font-semibold text-center">Login</p>

                <form onSubmit={handleLogin} className="mt-4 space-y-3">
                <div className="flex flex-col">
                    <input 
                        type="text"
                        name="login" 
                        id="login" 
                        placeholder="Login" 
                        required
                        className="font-semibold bg-white mt-1 py-3 px-5 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>

                <div className="flex flex-col">
                    <input
                        type="password"
                        name="senha"
                        id="senha"
                        placeholder="Senha"
                        required
                        className="font-semibold mt-1 py-3 px-5 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>

                <button type="submit" className="cursor-pointer w-full mt-2 rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-700">
                    Entrar
                </button>

                <h1 className="text-center py-2">Não tem uma conta? <Link href="/register" className="cursor-pointer font-semibold">Registre-se</Link></h1>
                </form>
            </div>
        </div>
    );
}