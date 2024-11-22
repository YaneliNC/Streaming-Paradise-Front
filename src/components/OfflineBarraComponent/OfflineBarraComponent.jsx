import React from 'react';
import { IoCloudOfflineOutline } from 'react-icons/io5';
import './OfflineBarraComponent.css'; // Asegúrate de tener este archivo CSS en el mismo directorio

const OfflineBarraComponent = () => {
  return (
    <header className="offline-banner">
      <IoCloudOfflineOutline className="offline-icon" />
      <p>No tienes conexión a Internet. Por favor, verifica tu conexión.</p>
    </header>
  );
};

export default OfflineBarraComponent;
