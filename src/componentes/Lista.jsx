import { Card } from "./Card";

export function Lista({ users, deletar, editar }) {
  return (
    <div className="w-full md:w-2/3 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">
        Lista de Clientes ({users.length})
      </h2>
      {users.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">
          Nenhum cliente cadastrado
        </p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card
              key={user.id}
              user={user}
              deletar={deletar}
              editar={editar}
            />
          ))}
        </div>
      )}
    </div>
  );
}