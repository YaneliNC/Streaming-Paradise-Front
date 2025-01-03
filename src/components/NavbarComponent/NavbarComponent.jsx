import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NavbarComponent.css";
import LogoConRelleno from "../../icons/logoconrelleno.jsx";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function NavbarComponent({ toggleTheme, darkMode }) {
  const { user, setUser } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para el modal
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Usuario en NavbarComponent:", user);
    }
  }, [user]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://streaming-paradise-server.onrender.com/users/logout",
        { remember_token: user.remember_token }
      );
      if (response.status === 200) {
        setUser(null); // Remover el usuario del contexto
        navigate("/login"); // Redirigir al login
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un error al cerrar sesión");
    }
  };

  const handleProfileClick = () => {
    if (user && user.idrol === 1) {
      window.location.href = "/admin";
    } else if (user && user.idrol === 2) {
      window.location.href = "/";
    } else if (user && user.idrol === 3) {
      window.location.href = "/perfil/artista";
    } else if (user && user.idrol === 4) {
      window.location.href = "/perfil/novato";
    } else if (user && user.idrol === 5) {
      window.location.href = "/perfil/estrella";
    } else {
      console.warn("No se encontró un ID de rol válido para redireccionar.");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <button className="MiniLogo">
            <a href="/">
              <LogoConRelleno className="logo-a" />
            </a>
          </button>
        </div>
        <div className="nav-links-container">
          <div className="nav-links center-links">
            <a href="/catalogo">Videos</a>
            <a href="/sorprendeme">Sorpréndeme</a>
            <a href="/paquetes">Paquetes</a>
            <a href="/contacto">Contacto</a>
            <a href="/about">Acerca de</a>
          </div>
          <div className="nav-links right-links">
            {user ? (
              <div className="profile-dropdown">
                <span
                  onClick={toggleDropdown}
                  className="profile-name"
                >
                  {user.name}
                </span>
                {dropdownVisible && (
                  <div className="dropdown-menu-profile">
                    <a onClick={handleProfileClick}>Mi perfil</a>
                    <a onClick={() => setShowLogoutModal(true)}>Cerrar sesión</a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a href="/login">Iniciar sesión</a>
                <a className="register-link" href="/registro">
                  Registrarse
                </a>
              </>
            )}
          </div>
        </div>
        <button
          className="mobile-menu-icon"
          onClick={() => {
            document
              .querySelector(".nav-links-container")
              .classList.toggle("active");
          }}
        >
          ☰
        </button>
      </nav>

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div className="modal">
        <div className="modal-content">
          <h2>¿Estás seguro de que quieres cerrar sesión?</h2>
          <div className="modal-actions">
            <button
              className="confirm-button"
              onClick={() => {
                handleLogout(); // Confirmar cierre de sesión
                setShowLogoutModal(false); // Cerrar el modal
              }}
            >
              Confirmar
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowLogoutModal(false)} // Cerrar modal
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default NavbarComponent;
