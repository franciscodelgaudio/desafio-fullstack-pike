# 📋 Gerenciador de Projetos & Tarefas (Next.js + MongoDB)

Aplicação fullstack para **gerenciar projetos e tarefas** usando **Next.js 13+**, **React**, **TailwindCSS** e **MongoDB/Mongoose**.  
Inclui CRUD de tarefas, autenticação básica via segredo JWT, ícones com `lucide-react` e formatação de datas com `date-fns`.

---

## 🚀 Tecnologias usadas
- **Frontend**: Next.js (App Router) + React + TailwindCSS  
- **Backend**: Next.js Server Actions + MongoDB/Mongoose  
- **Bibliotecas auxiliares**: `lucide-react`, `date-fns`

---

## ⚙️ Instalação e execução

```bash
# 1) Clone o repositório
git clone https://seu-repo.git
cd nome-do-projeto

# 2) Instale dependências principais
npm install next react react-dom mongoose

# 3) Instale bibliotecas auxiliares
npm install lucide-react date-fns

# 4) Instale e configure o TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# -> Configure o content do tailwind.config.js para a pasta app/**/*
# -> Importe as diretivas do Tailwind em styles/globals.css

# 5) Crie o arquivo .env.local (veja exemplo abaixo)
cp .env.example .env.local  # opcional, se já existir o .env.example

# 6) Rodar em desenvolvimento
npm run dev

# 7) Acesse
http://localhost:3000
```

---

## 🗝️ Exemplo de `.env.local`

```bash
MONGODB_URI=mongodb://localhost:27017/db
JWT_SECRET="SOM7HOEoTKK6q3xdmVKp0kDLi4Gh2RdJLTMh3y2iFAs=" # Added by `npx auth secret`
```

> **Observação**: nunca commite segredos reais. Use apenas em `.env.local`/variáveis de ambiente do provedor de deploy.

---

## 🧱 Modelos de dados (resumo)

### 👤 Usuario
```ts
{
  nome: String,
  email: String,
  dataNascimento: Date,
  genero: String,
  login: String,
  senha: String
}
```

### 📁 Projeto
```js
{
  idUsuario: ObjectId (ref Usuario),
  nomeProjeto: String,
  descricaoProjeto: String
}
```

### ✅ Task
```ts
{
  idProjeto: ObjectId (ref Projeto),
  nomeTarefa: String,
  descTarefa: String,
  status: String,
  prioridade: String,
  data: Date
}
```

---

## 🔗 Fluxo da aplicação

```mermaid
graph LR
A[Interface React/Tailwind] -->|ações do usuário| B[Next.js Server Actions]
B -->|consulta/mutação| C[(MongoDB)]
C -->|dados| B
B -->|JSON| A
```

---

## 🖼️ Capturas de tela

### Login
<img width="1807" height="802" alt="{5359638B-11D8-4F18-8A58-C3EA1D2775DF}" src="https://github.com/user-attachments/assets/ed1c1637-9190-4d30-8269-0400ee95e53a" />

### Registro
<img width="1749" height="779" alt="{1F5BA8C3-3B55-41BD-BE45-E1EBA0222DA7}" src="https://github.com/user-attachments/assets/3f703c2a-8c24-4ef5-ba60-77237754e52e" />

### Lista de Projetos
<img width="1829" height="742" alt="{0AD12D6E-FEE8-41DD-B00F-D94257858B6B}" src="https://github.com/user-attachments/assets/cfdc7e1f-510e-4696-92ae-e8ac254eea73" />

### Lista de Tarefas
<img width="1909" height="761" alt="{B131FA0F-7EA4-41FF-B3CC-F5D6826BB1CC}" src="https://github.com/user-attachments/assets/d7a54f8d-d051-4f59-85c9-be9bfa18e455" />

---

## 🔧 Scripts sugeridos
Adicione no seu `package.json`:
```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 🌐 URL de demonstração (opcional)
Se houver deploy (Vercel/Render/Railway/etc.), informe a URL aqui.

---

## 📄 Licença
MIT (ou a de sua preferência).
