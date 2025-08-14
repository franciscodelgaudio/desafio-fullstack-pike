// src/components/TagPills.jsx
"use client";

import { Badge } from "@/components/ui/badge";

// normaliza acentos/caixa
function norm(v) {
  if (!v) return "";
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacríticos (compatível)
    .toLowerCase()
    .trim();
}

// base visual do "pill"
const base = "rounded-full border-0 px-2.5 py-0.5 text-xs font-medium";

// STATUS -> classes
const statusMap = {
  "em processo":  "bg-blue-100 text-blue-700 hover:bg-blue-100",
  "pronto":    "bg-green-100 text-green-700 hover:bg-green-100",
  "nao iniciado": "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

export function StatusBadge({ value }) {
  const key = norm(value);
  const cls = statusMap[key] || "bg-slate-100 text-slate-700 hover:bg-slate-100";
  return <Badge className={`${base} ${cls}`}>{value}</Badge>;
}

// PRIORIDADE -> classes
const prioridadeMap = {
  alta:    "bg-red-100  text-red-700  hover:bg-red-100",
  media:   "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  baixa:   "bg-green-100 text-green-700 hover:bg-green-100",
};

export function PrioridadeBadge({ value }) {
  const key = norm(value);
  const cls = prioridadeMap[key] || "bg-slate-100 text-slate-700 hover:bg-slate-100";
  return <Badge className={`${base} ${cls}`}>{value}</Badge>;
}
