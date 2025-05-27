import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (confirm("\u00bfSeguro que quieres eliminar este usuario?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsuarios((prev) => prev.filter((u) => u._id !== id));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${selectedUser._id}`,
        selectedUser
      );

      const updatedUser = res.data.user;
      setUsuarios((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );

      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  if (loading)
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-gray-500">Cargando usuarios...</p>
      </div>
    );

  return (
    <div className="w-full mt-6 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          👥 Lista de Usuarios
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm text-left border-separate border-spacing-y-2">
            <thead className="text-xs text-white uppercase bg-red-500 rounded">
              <tr>
                <th className="px-4 py-3 rounded-l-md">Nombre</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3 text-center rounded-r-md">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, idx) => (
                <tr
                  key={u._id}
                  className="bg-gray-50 hover:bg-red-50 rounded transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {u.nombre}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{u.correo}</td>
                  <td className="px-4 py-3 capitalize text-gray-700">
                    {u.rol}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => openEditModal(u)}
                      className="px-4 py-1 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarUsuario(u._id)}
                      className="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedUser && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
    onClick={() => {
      setShowModal(false);
      setSelectedUser(null);
    }}
  >
    <div
      className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fade-in scale-100 transition-all"
      onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro del modal
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Editar Usuario</h2>

      <div className="space-y-4">
        <input
          type="text"
          value={selectedUser.nombre}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, nombre: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          placeholder="Nombre"
        />
        <input
          type="email"
          value={selectedUser.correo}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, correo: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          placeholder="Correo"
        />
        <select
          value={selectedUser.rol}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, rol: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UserList;
