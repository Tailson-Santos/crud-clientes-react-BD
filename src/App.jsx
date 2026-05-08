import { useEffect, useState } from "react";
import { Lista } from "./componentes/Lista";
import { Form } from "./componentes/Form";
import { supabase } from "./supabase";

function App() {
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    email: ""
  });
  
  const [lista, setLista] = useState([]);
  const [editando, setEditando] = useState(null); // ID do cliente sendo editado

  // Adicionar ou Editar
  const add = async (e) => {
    e.preventDefault();

    if (editando) {
      // EDITAR cliente existente
      const { data, error } = await supabase
        .from("clientes")
        .update({
          nome: form.nome,
          idade: parseInt(form.idade),
          email: form.email
        })
        .eq("id", editando)
        .select();

      if (error) {
        console.log(error);
        return;
      }

      if (data && data.length > 0) {
        setLista(lista.map(user => 
          user.id === editando ? data[0] : user
        ));
      }
      
      setEditando(null); // Sair do modo edição
    } else {
      // ADICIONAR novo cliente
      const { data, error } = await supabase
        .from("clientes")
        .insert([
          {
            nome: form.nome,
            idade: parseInt(form.idade),
            email: form.email
          }
        ])
        .select();

      if (error) {
        console.log(error);
        return;
      }

      if (data && data.length > 0) {
        setLista((prev) => [...prev, data[0]]);
      }
    }

    // Limpar formulário
    setForm({
      nome: "",
      idade: "",
      email: ""
    });
  };

  // Função para preparar edição
  const editarCliente = (user) => {
    setEditando(user.id);
    setForm({
      nome: user.nome,
      idade: user.idade,
      email: user.email
    });
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setEditando(null);
    setForm({
      nome: "",
      idade: "",
      email: ""
    });
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  async function deletarCliente(id) {
    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    setLista(lista.filter((user) => user.id !== id));
  }

  async function buscarClientes() {
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .order('id', { ascending: true });

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setLista(data);
    }
  }

  return (
    <div className='flex h-screen w-screen'>
      <Form
        form={form}
        setForm={setForm}
        add={add}
        editando={editando}
        cancelarEdicao={cancelarEdicao}
      />

      <Lista 
        users={lista}
        deletar={deletarCliente}
        editar={editarCliente}
      />
    </div>
  )
}

export default App