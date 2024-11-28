import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline, IoVideocamOutline, IoPencilSharp, IoBarChartOutline, IoPlayCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import './PerfilNovato.css';
import SubirVideoForm from './SubirVideoForm';
import EditarUsuarioComponent from './EditarUsuarioComponent';
import NovatoFoto from '../../assets/imagenes/Novato-foto.png';
import DashPerfilComponent from './DashPerfilComponent/DashPerfilComponent';
import MisVideosComponent from './MisVideosComponent/MisVideosComponent';

function PerfilNovato() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [isDashPerfilVisible, setDashPerfilVisible] = useState(false);
  const [isMisVideosVisible, setMisVideosVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para el modal

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const toggleEdit = () => {
    setEditVisible(!isEditVisible);
  };
  const toggleDashPerfilForm = () => {
    setDashPerfilVisible(!isDashPerfilVisible); 
  };
  const toggleMisVideosForm = () => {
    setMisVideosVisible(!isMisVideosVisible); 
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

  return (
    <div className="perfil-novato">
      <div className="card">
        {/* Ícono de Cerrar Sesión */}
        <IoLogOutOutline 
          className="logout-icon" 
          onClick={() => setShowLogoutModal(true)} // Mostrar el modal
          size={30} 
          color="#00063D" 
          title="Cerrar Sesión" 
        />
        <div className="card_load">
          <img src={NovatoFoto} alt="Perfil Novato" className="perfil-imagen" />
        </div>
        <div className="card_info">
          <div className="card_title">{user?.name || 'Nombre del Usuario'}</div>
          <div className="card_description">Email: {user?.email || 'No especificado'}</div>
          <div className="card_description-novato">Género Favorito: {user?.favoriteGenre || 'No especificado'}</div>
          <div className="card_description-novato">País: {user?.country || 'No especificado'}</div>
          <div className="card_description-novato"> Edad: {user?.age || 'No especificado'}</div>
          <div className="card_description">Tipo de Suscripción: Novato</div>
          <div className="card_buttons">
            <button className="btn-subir-video" onClick={toggleForm}>
              <IoVideocamOutline size={20} /> {isFormVisible ? 'Cancelar' : 'Subir Video'}
            </button>
            <button className="btn-subir-video" onClick={toggleMisVideosForm}>
              <IoPlayCircleOutline  size={20} /> {isMisVideosVisible ? 'Cancelar' : 'Mis Videos'}
            </button>
            <button className="btn-editar-perfil" onClick={toggleEdit}>
              <IoPencilSharp size={20} /> {isEditVisible ? 'Cancelar' : 'Editar Perfil'}
            </button>
            <button className="btn-subir-video" onClick={toggleDashPerfilForm}>
              <IoBarChartOutline  size={20} /> {isDashPerfilVisible ? 'Cancelar' : 'Estadísticas'}
            </button>
          </div>
        </div>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <SubirVideoForm formClass="subir-video-novato-form" setFormVisible={setFormVisible} />
        </div>
      )}
      {isMisVideosVisible && (
              <div className="form-container-novato">
                <MisVideosComponent userId={user?.id} setMisVideosVisible={setMisVideosVisible} />
              </div>
            )}

      {isDashPerfilVisible && (
              <div className="form-container-novato">
                <DashPerfilComponent userId={user?.id} setDashPerfilVisible={setDashPerfilVisible} />
              </div>
            )}

      {isEditVisible && (
        <div className="form-container">
          <EditarUsuarioComponent userId={user?.id} setEditVisible={setEditVisible} />
        </div>
      )}

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

export default PerfilNovato;
