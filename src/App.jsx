import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserProvider } from "./contexts/UserContext";
import AdminTemplate from './templates/AdminTemplate';
import HomeComponent from "./components/HomeComponent/HomeComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import RegistroComponent from "./components/RegistroComponent/RegistroComponent";
import AboutComponent from "./components/AboutComponent/AboutComponent";
import CatalogoComponent from "./components/CatalogoComponent/CatalogoComponent";
import ContactoComponent from "./components/ContactoComponent/ContactoComponent";
import PaquetesComponent from "./components/PaquetesComponent/PaquetesComponent";
import PaypalPage from "./components/PaypalComponent/PaypalPage";
import UploadVideoComponent from "./components/UploadVideoComponent/UploadVideoComponent";
import VideoPlayerComponent from "./components/VideoPlayerComponent/VideoPlayerComponent";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import HomeOfertaComponent from "./components/HomeOfertaComponent/HomeOfertaComponent";
import SinPermiso from './SinPermiso';
import ProtectedRoute from './ProtectedRoute';
import PerfilNovato from './components/PerfilComponent/PerfilNovato';
import PerfilArtista from './components/PerfilComponent/PerfilArtista';
import PerfilEstrella from './components/PerfilComponent/PerfilEstrella';
import SubirVideoForm from './components/PerfilComponent/SubirVideoForm';
import Calificaciones from './components/PerfilComponent/Calificaciones';
import TopConsumidores from './components/PerfilComponent/TopConsumidores';
import EditarUsuarioComponent from "./components/PerfilComponent/EditarUsuarioComponent";
import EditarVideoForm from "./components/PerfilComponent/EditarVideoForm";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  position: {
    x: 'left', 
    y: 'bottom'   
  },
  dismissible: true,
});


function App() {
  const [navbarFlag, setNavbarFlag] = useState(true);
  const [footerFlag, setFooterFlag] = useState(true);
  const [darkMode, setDarkMode] = useState(false);


  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  useEffect(() => {
    
    // Función para mostrar alerta cuando no hay conexión
    const handleOffline = () => {
      notyf.error('En este momento no tienes conexión.');
    };

    // Función para cuando se restablece la conexión
    const handleOnline = () => {
      notyf.success('Se restauró la conexión a internet.');
    };

    // Añadir los event listeners para conexión y desconexión
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Limpiar los event listeners cuando el componente se desmonte
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<ProtectedRoute element={<AdminTemplate />} requiredRoles={[1]} />} />
          <Route path="/sinpermiso" element={<SinPermiso />} />
          <Route
            path="*"
            element={
              <>
                {navbarFlag && <NavbarComponent toggleTheme={toggleTheme} darkMode={darkMode} />}
                <div>
                  <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/login" element={<LoginComponent handleNavbar={setNavbarFlag} handleFooter={setFooterFlag} />} />
                    <Route path="/registro" element={<RegistroComponent handleNavbar={setNavbarFlag} handleFooter={setFooterFlag} />} />
                    <Route path="/paypalPage" element={<PaypalPage />} />
                    <Route path="/about" element={<AboutComponent />} />
                    <Route path="/upload" element={<UploadVideoComponent />} />
                    <Route path="/catalogo" element={<CatalogoComponent handleFooter={setFooterFlag} />} />
                    <Route path="/contacto" element={<ContactoComponent />} />
                    <Route path="/video/:id" element={<VideoPlayerComponent />} />
                    <Route path="/sorprendeme" element={<VideoPlayerComponent random={true} />} />
                    <Route path="/paquetes" element={<PaquetesComponent />} />
                    <Route path="/ofertashome" element={<HomeOfertaComponent />} />
                    <Route path="/perfil/novato" element={<PerfilNovato />} />
                    <Route path="/perfil/artista" element={<PerfilArtista />} />
                    <Route path="/perfil/estrella" element={<PerfilEstrella />} />
                    <Route path="/subir-video" element={<SubirVideoForm />} />
                    <Route path="/calificaciones" element={<Calificaciones />} />
                    <Route path="/top-consumidores" element={<TopConsumidores />} />
                    <Route path="/editar/:id" element={<EditarUsuarioComponent />} />
                    <Route path="/editarvideo/:videoId" element={<EditarVideoForm />} />
                  </Routes>
                </div>
                {footerFlag && <FooterComponent />}
              </>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
