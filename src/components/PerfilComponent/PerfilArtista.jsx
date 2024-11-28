import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { IoPlayCircleOutline, IoBarChartOutline, IoVideocamOutline, IoPencilSharp, IoLogOutOutline, IoMailUnreadOutline, IoStarOutline } from 'react-icons/io5';
import axios from 'axios';
import './PerfilArtista.css';
import SubirVideoForm from './SubirVideoForm';
import EditarUsuarioComponent from './EditarUsuarioComponent';
import ArtistaFoto from '../../assets/imagenes/Artista-foto.png';
import Comments from './Comments';
import Calificaciones from './Calificaciones';
import DashPerfilComponent from './DashPerfilComponent/DashPerfilComponent';
import MisVideosComponent from './MisVideosComponent/MisVideosComponent';

function PerfilArtista() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isVideoFormVisible, setVideoFormVisible] = useState(false);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [isCalificacionesVisible, setCalificacionesVisible] = useState(false);
  const [isDashPerfilVisible, setDashPerfilVisible] = useState(false);
  const [isMisVideosVisible, setMisVideosVisible] = useState(false);

  const toggleVideoForm = () => setVideoFormVisible(!isVideoFormVisible);
  const toggleCommentsForm = () => setCommentsVisible(!isCommentsVisible);
  const toggleEdit = () => setEditVisible(!isEditVisible);
  const toggleCalificacionesForm = () => setCalificacionesVisible(!isCalificacionesVisible);
  const toggleDashPerfilForm = () => setDashPerfilVisible(!isDashPerfilVisible);
  const toggleMisVideosForm = () => setMisVideosVisible(!isMisVideosVisible);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para el modal

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
    <div className="perfil-artista">
      
      <div className="card-artista">
       {/* Ícono de Cerrar Sesión */}
       <IoLogOutOutline 
          className="logout-icon" 
          onClick={() => setShowLogoutModal(true)} // Mostrar el modal
          size={30} 
          color="#00063D" 
          title="Cerrar Sesión" 
        />
        <div className="card_load-artista">
          <img src={ArtistaFoto} alt="Perfil Novato" className="perfil-imagen-artista" />
        </div>
        <div className="card_info-artista">
          <div className="card_title-artista">{user?.name || 'Nombre del Usuario'}</div>
          <div className="card_description-artista">Gmail: {user?.email || 'No especificado'}</div>
          <div className="card_description-artista">Género Favorito: {user?.favoriteGenre || 'No especificado'}</div>
          <div className="card_description-artista">País: {user?.country || 'No especificado'}</div>
          <div className="card_description-artista">Edad: {user?.age || 'No especificado'}</div>
          <div className="card_description-artista">Tipo de Suscripción: Artista</div>
          <div className="card_buttons-artista">
            <button className="btn-subir-video-artista" onClick={toggleVideoForm}>
              <IoVideocamOutline size={20} /> {isVideoFormVisible ? 'Cancelar' : 'Subir Video'}
            </button>
            <button className="btn-subir-video-artista" onClick={toggleMisVideosForm}>
              <IoPlayCircleOutline size={20} /> {isMisVideosVisible ? 'Cancelar' : 'Mis Videos'}
            </button>
            <button className="btn-subir-video-artista" onClick={toggleCommentsForm}>
              <IoMailUnreadOutline size={20} /> {isCommentsVisible ? 'Cancelar' : 'Comentarios'}
            </button>
            <button className="btn-subir-video-artista" onClick={toggleCalificacionesForm}>
              <IoStarOutline size={20} /> {isCalificacionesVisible ? 'Cancelar' : 'Calificaciones'}
            </button>
            <button className="btn-editar-perfil-artista" onClick={toggleEdit}>
              <IoPencilSharp size={20} /> {isEditVisible ? 'Cancelar' : 'Editar Perfil'}
            </button>
            <button className="btn-subir-video-artista" onClick={toggleDashPerfilForm}>
              <IoBarChartOutline size={20} /> {isDashPerfilVisible ? 'Cancelar' : 'Estadísticas'}
            </button>
          </div>
        </div>
      </div>

      {/* Componente Condicional */}
      {isVideoFormVisible && <SubirVideoForm formClass="subir-video-artista-form-artista" setFormVisible={setVideoFormVisible} />}
      {isDashPerfilVisible && <DashPerfilComponent userId={user?.id} setDashPerfilVisible={setDashPerfilVisible} />}
      {isMisVideosVisible && <MisVideosComponent userId={user?.id} setMisVideosVisible={setMisVideosVisible} />}
      {isCommentsVisible && <Comments userId={user?.id} setEditVisible={setEditVisible} />}
      {isCalificacionesVisible && <Calificaciones userId={user?.id} setCalificacionesVisible={setCalificacionesVisible} />}
      {isEditVisible && <EditarUsuarioComponent userId={user?.id} setEditVisible={setEditVisible} />}
   
      {/*Modal de confirmación */}
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

export default PerfilArtista;
