"use client";

import {CriarRegistro} from "@/app/register/server/actions"
import { useRouter } from "next/navigation";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";

const loginSchema = z.object({
  login: z.string().min(3, "O login deve ter pelo menos 3 caracteres"),
  senha: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Za-z]/, "A senha deve conter pelo menos uma letra")
    .regex(/\d/, "A senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
});

export default function Register() {
  const [erros, setErros] = useState([]);

  const router = useRouter();

  async function handleRegister(event) {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);
    const valores = {
      login: String(dados.get("login") ?? ""),
      senha: String(dados.get("senha") ?? ""),
    };

    const resultado = loginSchema.safeParse(valores);

    if (!resultado.success) {
      const mensagens = resultado.error.issues.map(err => err.message);
      setErros(mensagens);
      return;
    }

    setErros([]);
    const { usuarioCriado } = await CriarRegistro(dados);

    if (usuarioCriado) {
      alert("Usuário criado com sucesso!");
      router.push("/login");
    }
  }

  return (
  <div className="bg-gray-200 h-full w-full flex items-center justify-center overflow-y-hidden">
      <div className="bg-white bg-opacity-50 w-full max-w-[500px] p-8 px-10 rounded-4xl shadow">

        <p className="text-2xl font-semibold text-center">Registro</p>

        <form onSubmit={handleRegister} className="mt-4 space-y-3">

          <div className="flex flex-col">
            <input 
              name="nome"
              type="text" 
              id="nome" 
              placeholder="Nome completo" 
              required
              className="font-semibold bg-white mt-1 py-2 px-5 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <input
              name="email"
              type="email"
              id="email"
              placeholder="E-mail"
              required
              className="font-semibold bg-white mt-1 py-2 px-5 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <input 
              name="dataNascimento"
              type="date" 
              id="data" 
              placeholder="Data de nascimento" 
              required
              className="font-semibold bg-white mt-1 py-2 px-5 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <select name="genero" id="cor-select" className="bg-white mt-1 py-2 px-5 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-gray-300">
                <option value="" disabled>Gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="flex flex-col">
            <input 
              name="login"
              type="text" 
              id="login" 
              placeholder="Digite seu login" 
              required
              className="font-semibold bg-white mt-1 py-2 px-5 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <input
              name="senha"
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              required
              className="font-semibold bg-white mt-1 py-2 px-5 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-gray-300"
            />
            <span className="text-gray-500 text-xs mt-1">
              Senha com 8+ caracteres, incluindo letra, número e caractere especial.
            </span>
          </div>
          {erros.length > 0 && (
            <div className="text-red-500 text-sm mt-2">
              {erros.map((erro, i) => (
                <p key={i}>{erro}</p>
              ))}
            </div>
          )}

          <button type="submit" className="cursor-pointer w-full mt-2 rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Criar conta
          </button>

          <h1 className="text-center py-2">Já possui uma conta? <Link href="/login" className="cursor-pointer font-semibold">Login</Link></h1>
        </form>
      </div>
    </div>
  );
}
