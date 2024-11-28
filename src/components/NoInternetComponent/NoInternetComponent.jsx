import React, { useState, useEffect } from "react";
import { MdWifiOff } from "react-icons/md"; // React Icon para simbolizar falta de conexión
import "./NoInternetComponent.css";

const NoInternetComponent = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return null; // Si hay conexión, no mostramos nada
  }

  return (
    <div className="no-internet-container">
      <div className="icon-container">
        <MdWifiOff size={80} color="#FF6347" />
      </div>
      <h2 className="message">¡Oops! Sin conexión a Internet</h2>
      <p className="sub-message">Por favor, verifica tu conexión e inténtalo nuevamente.</p>
     
    </div>
  );
};

export default NoInternetComponent;
