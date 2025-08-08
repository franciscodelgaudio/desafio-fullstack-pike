'use client'

export default function Register() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="bg-blue-500 bg-opacity-50 w-full md:w-1/2 lg:w-1/3 p-6 rounded-md shadow">
        <p className="text-xl font-semibold text-center text-white">Tela de Registro</p>
        <form className="mt-4 space-y-3">
          <div className="flex flex-col">
            <label htmlFor="nome">Nome completo:</label>
            <input 
              type="text" 
              id="nome" 
              placeholder="Digite seu nome" 
              required
              className="mt-1 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              required
              className="mt-1 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="date">Data de nascimento</label>
            <input 
              type="date" 
              id="data" 
              placeholder="Entre com sua data de nascimento" 
              required
              className="mt-1 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="genero">Gênero</label>
            <select name="genero" id="cor-select">
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="login">Login</label>
            <input 
              type="text" 
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
              id="senha"
              placeholder="Digite sua senha"
              required
              className="mt-1 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <button type="submit" className="w-full mt-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
}
