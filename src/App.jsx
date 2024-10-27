import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
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


function App() {
  const [navbarFlag, setNavbarFlag] = useState(true);
  const [footerFlag, setFooterFlag] = useState(true);

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Rutas del administrador aisladas en "/admin/*" */}
          <Route path="/admin/*" element={<ProtectedRoute  element={<AdminTemplate />} requiredRoles={[1]} />} />
          <Route path="/sinpermiso" element={<SinPermiso />} />
          {/* Rutas para el sitio principal */}
          <Route
            path="*"
            element={
              <>
                {navbarFlag && <NavbarComponent />}
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
                    <Route path="/video" element={<VideoPlayerComponent videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />} />
                    <Route path="/paquetes" element={<PaquetesComponent />} />
                    <Route path="/ofertashome" element={<HomeOfertaComponent />} />
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