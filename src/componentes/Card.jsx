export function Card({ user, deletar, editar }) {
  return (
    <div className="relative p-4 m-2 bg-white rounded shadow">
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={() => editar(user)}
          className="bg-blue-400 hover:bg-blue-500 text-white p-1 rounded text-sm"
        >
          ✏️
        </button>
        <button
          onClick={() => deletar(user.id)}
          className="bg-red-400 hover:bg-red-500 text-white p-1 rounded text-sm"
        >
          🗑️
        </button>
      </div>

      <p className="font-bold text-lg">{user.nome}</p>
      <p className="text-gray-600">Idade: {user.idade}</p>
      <p className="text-gray-600">Email: {user.email}</p>
    </div>
  );
}