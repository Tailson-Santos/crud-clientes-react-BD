export function Form({ form, setForm, add, editando, cancelarEdicao }) {
  return (
    <form className="flex flex-col justify-center h-full w-1/3 bg-gray-900" onSubmit={add}>
      <h1 className="text-white text-4xl">
        {editando ? "Editar Cliente" : "Cadastro"}
      </h1>
      <div className="bg-gray-600 flex items-center justify-center flex-col p-4">
        <div>
          <input
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) =>
              setForm({
                ...form,
                nome: e.target.value
              })
            }
            className="m-2 p-2 rounded"
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Idade"
            value={form.idade}
            onChange={(e) =>
              setForm({
                ...form,
                idade: e.target.value
              })
            }
            className="m-2 p-2 rounded"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="exemplo@gmail.com"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            className="m-2 p-2 rounded"
          />
        </div>

        <div className="flex gap-2">
          <button 
            type="submit" 
            className={editando ? 
              "bg-green-600 hover:bg-green-700 transition p-2 text-white m-2 rounded" : 
              "bg-gray-900 hover:bg-amber-50 hover:text-black transition p-2 text-white m-2 rounded"
            }
          >
            {editando ? "SALVAR ALTERAÇÕES" : "ADICIONAR"}
          </button>
          
          {editando && (
            <button 
              type="button"
              onClick={cancelarEdicao}
              className="bg-red-600 hover:bg-red-700 transition p-2 text-white m-2 rounded"
            >
              CANCELAR
            </button>
          )}
        </div>
      </div>
    </form>
  )
}