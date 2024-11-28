import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../admin/AdminSidebar.css';
import {
  IoPeopleOutline,
  IoCopyOutline,
  IoCartOutline,
  IoPricetagsOutline,
  IoLogOutOutline,
  IoOptionsOutline,
  IoTicketOutline,
  IoLockClosedOutline,
  IoPodiumOutline,
  IoChevronBackOutline, 
  IoChevronForwardOutline,
  IoTvOutline,
  IoChatbubbleEllipsesOutline 
} from 'react-icons/io5';
import axios from 'axios';

const AdminSidebar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar el modal

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://streaming-paradise-server.onrender.com/users/logout', {
        remember_token: user.remember_token,
      });
      if (response.status === 200) {
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    }
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className={`admin-sidebar ${isExpanded ? 'expanded-ad' : ""}`}>
        <button className="expand-button-ad" onClick={toggleSidebar}>
          {isExpanded ? <IoChevronBackOutline /> : <IoChevronForwardOutline />}
        </button>
        <ul className="mt-6">
          <li className="li-sidebar">
            <NavLink to="/admin/" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoPodiumOutline className="icon" />
              <span className="ml-4">Dash</span>
            </NavLink>
          </li>
          <li className="li-sidebar">
            <NavLink to="/admin/usuarios/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoPeopleOutline className="icon" />
              <span className="ml-4">Creadores</span>
            </NavLink>
          </li>
          <li className="li-sidebar">
            <NavLink to="/admin/productos/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoCopyOutline className="icon" />
              <span className="ml-4">Suscripciónes</span>
            </NavLink>
          </li>
          <li className="li-sidebar">
            <NavLink to="/admin/catalogo/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoTvOutline className="icon" />
              <span className="ml-4">Catálogo</span>
            </NavLink>
          </li>
          <li className="li-sidebar">
            <NavLink to="/admin/compras/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoCartOutline className="icon" />
              <span className="ml-4">Compras</span>
            </NavLink>
          </li>
          <li className="li-sidebar">
            <NavLink to="/admin/permisos/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoLockClosedOutline className="icon" />
              <span className="ml-4">Permisos</span>
            </NavLink>
          </li>
          <li className="li-sidebar">
            <NavLink to="/admin/roles/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoOptionsOutline className="icon" />
              <span className="ml-4">Roles</span>
            </NavLink>
          </li>
          <li className="li-sidebar">
            <NavLink to="/admin/comentarios/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoChatbubbleEllipsesOutline className="icon" />
              <span className="ml-4">Comentarios</span>
            </NavLink>
          </li>
          <li className="li-sidebar">
            <NavLink to="/admin/cupones/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoTicketOutline className="icon" />
              <span className="ml-4">Cupones</span>
            </NavLink>
          </li>
          <li className="li-sidebar">
            <NavLink to="/admin/ofertas/listado" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoPricetagsOutline className="icon" />
              <span className="ml-4">Ofertas</span>
            </NavLink>
          </li>
          <br />
          <li className="li-sidebar">
            <NavLink to="#" onClick={openLogoutModal} className="logout-link">
              <IoLogOutOutline className="icon" />
              <span className="ml-4">Cerrar sesión</span>
            </NavLink>
          </li>
        </ul>
      </div>

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
    </>
  );
};

export default AdminSidebar;
