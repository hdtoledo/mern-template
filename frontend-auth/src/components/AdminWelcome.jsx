const AdminWelcome = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Bienvenido al Panel de Administración</h1>
      <p className="text-gray-700 mb-2">
        Hola <strong>{user?.nombre}</strong>, estás ingresando como <span className="italic text-gray-800">administrador</span>.
      </p>
      <p className="text-gray-600">
        Desde este panel puedes gestionar usuarios, productos, reportes y la configuración general de la plataforma.
      </p>
    </div>
  );
};

export default AdminWelcome;