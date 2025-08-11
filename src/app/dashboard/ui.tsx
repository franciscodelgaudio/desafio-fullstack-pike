import React from "react";
import Interativo from "./interativo";
import MostrarTask from "./monstrartask";

export default function Ui() {  
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="p-3 font-bold text-2xl flex flex-col">DASHBOARD</h1>
        <Interativo/>
      </div>
      <MostrarTask/>
    </>
  );
}

