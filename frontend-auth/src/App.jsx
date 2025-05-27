import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import Usuarios from "./pages/admin/UserList";
import Productos from "./pages/admin/Productos";
import Reportes from "./pages/admin/Reportes";
import AdminWelcome from "./components/Welcome";
import NotFound from "./pages/NotFound";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <Routes>
        {/* públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* dashboard único */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* rutas protegidas del panel admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout user={user} onLogout={onLogout} />
            </AdminRoute>
          }
        >
          <Route index element={<AdminWelcome user={user} />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="productos" element={<Productos />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>

        {/* ruta no válida */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
