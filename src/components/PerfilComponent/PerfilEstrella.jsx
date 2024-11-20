import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { IoVideocamOutline, IoPencilSharp, IoPlayCircleOutline , IoMailUnreadOutline,IoStarOutline, IoPeopleOutline, IoBarChartOutline, IoLogOutOutline  } from 'react-icons/io5';
import axios from 'axios';
import './PerfilEstrella.css';
import SubirVideoForm from './SubirVideoForm';
import EditarUsuarioComponent from './EditarUsuarioComponent';
import EstrellaFoto from '../../assets/imagenes/Estrella-foto.png';
import Comments from './Comments';
import Calificaciones from './Calificaciones';
import TopConsumidores from './TopConsumidores';
import DashPerfilComponent from './DashPerfilComponent/DashPerfilComponent';
import MisVideosComponent from './MisVideosComponent/MisVideosComponent';


function PerfilEstrella() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [isCalificacionesVisible, setCalificacionesVisible] = useState(false);
  const [isTopConsumidoresVisible, setTopConsumidoresVisible] = useState(false);
  const [isDashPerfilVisible, setDashPerfilVisible] = useState(false);
  const [isMisVideosVisible, setMisVideosVisible] = useState(false);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const toggleEdit = () => {
    setEditVisible(!isEditVisible);
  };
  const toggleCommentsForm = () => {
    setCommentsVisible(!isCommentsVisible);
  };
  const toggleCalificacionesForm = () => {
    setCalificacionesVisible(!isCalificacionesVisible);
  };
  const toggleTopConsumidoresForm = () => {
    setTopConsumidoresVisible(!isTopConsumidoresVisible);
  };
  const toggleDashPerfilForm = () => {
    setDashPerfilVisible(!isDashPerfilVisible); 
  };
  const toggleMisVideosForm = () => {
    setMisVideosVisible(!isMisVideosVisible); 
  };


  const handleLogout = async () => {
    const confirmLogout = window.confirm('¿Seguro quieres cerrar la sesión?');
    if (confirmLogout) {
      try {
        const response = await axios.post('https://streaming-paradise-server.onrender.com/users/logout', {
          remember_token: user.remember_token 
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

  return (
    <div className="perfil-estrella">
      <div className="card-estrella">
        {/* Ícono de Cerrar Sesión */}
      <IoLogOutOutline 
        className="logout-icon" 
        onClick={handleLogout} 
        size={30} 
        color="#00063D" 
        title="Cerrar Sesión" 
      />
        <div className="card_load-estrella">
          <img src={EstrellaFoto} alt="Perfil Novato" className="perfil-imagen-estrella" />
        </div>
        <div className="card_info-estrella">
          <div className="card_title-estrella">{user?.name || 'Nombre del Usuario'}</div>
          <div className="card_description-estrella">Email: {user?.email || 'No especificado'}</div>
          <div className="card_description-estrella">Género Favorito: {user?.favoriteGenre || 'No especificado'}</div>
          <div className="card_description-estrella">País: {user?.country || 'No especificado'}</div>
          <div className="card_description-estrella"> Edad: {user?.age || 'No especificado'}</div>
          <div className="card_description-estrella">Tipo de Suscripción: Estrella</div>
          <div className="card_buttons-estrella">
            <button className="btn-subir-video-estrella" onClick={toggleForm}>
              <IoVideocamOutline size={20} /> {isFormVisible ? 'Cancelar' : 'Subir Video'}
            </button>
            <button className="btn-subir-video-estrella" onClick={toggleMisVideosForm}>
              <IoPlayCircleOutline  size={20} /> {isMisVideosVisible ? 'Cancelar' : 'Mis Videos'}
            </button>
            <button className="btn-subir-video-estrella" onClick={toggleCommentsForm}>
              <IoMailUnreadOutline size={20} /> {isCommentsVisible ? 'Cancelar' : 'Comentarios'}
            </button>
            <button className="btn-subir-video-estrella" onClick={toggleCalificacionesForm}>
              <IoStarOutline size={20} /> {isCalificacionesVisible ? 'Cancelar' : 'Calificaciones'}
            </button>
            <button className="btn-subir-video-estrella" onClick={toggleTopConsumidoresForm}>
              <IoPeopleOutline size={20} /> {isTopConsumidoresVisible ? 'Cancelar' : 'Consumidores'}
            </button>
            <button className="btn-subir-video-estrella" onClick={toggleDashPerfilForm}>
              <IoBarChartOutline  size={20} /> {isDashPerfilVisible ? 'Cancelar' : 'Estadísticas'}
            </button>
            <button className="btn-editar-perfil-estrella" onClick={toggleEdit}>
              <IoPencilSharp size={20} /> {isEditVisible ? 'Cancelar' : 'Editar Perfil'}
            </button>
            
          </div>
        </div>
      </div>

      {isFormVisible && (
        <div className="form-container-estrella">
          <SubirVideoForm formClass="subir-video-estrella-form-estrella" setFormVisible={setFormVisible} />
        </div>
      )}

      {isMisVideosVisible && (
        <div className="form-container-estrella">
          <MisVideosComponent userId={user?.id} setMisVideosVisible={setMisVideosVisible} />
        </div>
      )}


      {isCommentsVisible && (
        <div className="form-container-estrella">
          <Comments userId={user?.id} setCommentsVisible={setCommentsVisible} />
        </div>
      )}
      {isCalificacionesVisible && (
        <div className="form-container-estrella">
          <Calificaciones userId={user?.id} setCalificacionesVisible={setCalificacionesVisible} />
        </div>
      )}

       {isTopConsumidoresVisible && (
        <div className="form-container-estrella">
          <TopConsumidores userId={user?.id} setTopConsumidoresVisible={setTopConsumidoresVisible} />
        </div>
      )}

      {isDashPerfilVisible && (
        <div className="form-container-estrella">
          <DashPerfilComponent userId={user?.id} setDashPerfilVisible={setDashPerfilVisible} />
        </div>
      )}


      {isEditVisible && (
        <div className="form-container-estrella">
          <EditarUsuarioComponent userId={user?.id} setEditVisible={setEditVisible} />
        </div>
      )}
    </div>
  );
}

export default PerfilEstrella;
