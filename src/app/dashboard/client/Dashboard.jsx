"use client";

import React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function Dashboard() {  
  function handleAtualizar() {
    setAtualizar(flag => !flag);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="py-5 px-10 font-bold text-2xl flex flex-col">Dashboard</h1>
      </div>

      <div className="bg-gray-300 flex flex-row justify-between pl-10 pr-5 py-2 border-b-1">

        <div className="flex flex-col font-semibold text-left basis-5/5">
          <p>Nome da Tarefa</p>
        </div>

        <div className="flex flex-col font-semibold text-left basis-6/10">
          <p>Projeto</p>
        </div>

        <div className="flex flex-col font-semibold text-left basis-1/10">
          <p>Status</p>
        </div>

        <div className="flex flex-col font-semibold text-left basis-1/10">
          <p>Prioridade</p>
        </div>

        <div className="flex flex-col font-semibold text-left basis-1/10 pr-10">
          <p>Vencimento</p>
        </div>

        <div className="flex flex-col font-semibold text-left basis-1/20 pr-4">
          <p>Ações</p>
        </div>

      </div>
    </>
  );
}