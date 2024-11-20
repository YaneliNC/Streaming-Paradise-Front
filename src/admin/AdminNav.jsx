import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoLogOutOutline } from "react-icons/io5";
import { useUser } from "../contexts/UserContext";
import Adminfoto from "../assets/imagenes/Admin-foto.png";
import LogoConRelleno from "../icons/logoconrelleno.jsx";
import "./AdminNav.css";

const AdminNav = () => {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm('¿Seguro quieres cerrar la sesión?');
    if (confirmLogout) {
      try {
        const response = await axios.post('https://streaming-paradise-server.onrender.com/users/logout', {
          remember_token: user.remember_token,
        });
        if (response.status === 200) {
          setUser(null);
          alert('Sesión cerrada exitosamente');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Hubo un error al cerrar sesión');
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <nav className="admin-nav">
      <div className="logo-container-admin">
        <button className="MiniLogo-admin">
          <a href="/">
            <LogoConRelleno className="logo-a-admin" />
          </a>
        </button>
      </div>
      <div className="user-info">
        {/* Botón de cerrar sesión antes de la foto */}
        {/* <button className="btn-cerrar-sesion-nav" onClick={handleLogout}>
          <IoLogOutOutline size={20} /> Cerrar Sesión
        </button> */}
        <img src={Adminfoto} alt="Perfil" className="profile-image" />
        {user ? (
          <div className="user-details">
            <span className="text-white">{user.name}</span>
          </div>
        ) : (
          <span className="text-white">Invitado</span>
        )}
      </div>
    </nav>
  );
};

export default AdminNav;
