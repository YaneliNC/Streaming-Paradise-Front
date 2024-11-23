import React from "react";
import "./AboutComponent.css";
import historiaImage from "../../assets/imagenes/ImgTeam.jpg";
import queHacemosImage from "../../assets/imagenes/ImgCel.jpg";
import nosImportasImage from "../../assets/imagenes/ImgPersonas.jpg";
import Persona1 from "../../assets/imagenes/Persona1.jpg"; // Reemplaza con las imágenes de los integrantes
import Persona2 from "../../assets/imagenes/Persona2.jpg";
import Persona3 from "../../assets/imagenes/Persona3.jpg";
import Persona4 from "../../assets/imagenes/Persona4.jpg";
import Persona5 from "../../assets/imagenes/Persona5.jpg";

const AboutComponent = () => {
  return (
    <div className="about-page">
      <section className="intro-section">
        <h1>Nos emociona llevar la magia del entretenimiento hasta ti</h1>
        <p>
          Bienvenido a Streaming Paradise, la plataforma ideal para descubrir y
          apoyar a creadores audiovisuales. Aquí, los usuarios pueden explorar
          un catálogo diverso de contenido, desde películas y documentales hasta
          videoblogs, donde podrán calificar, comentar y disfrutar del talento
          emergente..
        </p>
        <p>
          Los creadores de contenido pueden difundir su trabajo mediante una
          suscripción, con la opción de acceder a beneficios adicionales a
          través de diferentes planes. Nuestro compromiso es ofrecer un espacio
          de crecimiento y visibilidad para quienes buscan compartir su
          creatividad con el mundo. ¡Únete a nosotros y explora un paraíso de
          entretenimiento!
        </p>
      </section>

      <section className="info-section">
        <div className="info-card">
          <h2>Nuestra historia</h2>
          <p>
            Desde nuestros inicios, hemos evolucionado con la misión de apoyar a
            creadores audiovisuales. Empezamos como una plataforma de difusión
            digital y hoy en día nos enfocamos en ser un espacio donde el
            talento emergente encuentra su público y su oportunidad de brillar.
          </p>
          <img src={historiaImage} alt="Reunión de equipo" />
        </div>
        <div className="info-card">
          <h2>Qué hacemos</h2>
          <p>
            Ofrecemos un catálogo amplio y diverso de contenido creado por
            talentos independientes, accesible desde cualquier dispositivo
            conectado a internet. En Streaming Paradise, los usuarios pueden
            disfrutar, calificar y comentar cada obra, conectándose con los
            creadores de forma fácil y segura.
          </p>
          <img src={queHacemosImage} alt="Dispositivo móvil mostrando la app" />
        </div>
        <div className="info-card">
          <h2>Nos Importas</h2>
          <p>
            Trabajamos para ofrecer una experiencia positiva en cada visita a
            Streaming Paradise. Valoramos la creatividad y la conexión con el
            público, asegurándonos de que cada creador y espectador encuentre un
            lugar especial en nuestra comunidad.
          </p>
          <img
            src={nosImportasImage}
            alt="Grupo de personas disfrutando una película"
          />
        </div>
      </section>

      <section className="team-section">
        <h2>Nuestro Equipo</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={Persona1} alt="Nombre del Integrante 1" />
            <h3>Eduardo Uc</h3>
            <p>Lider del equipo de Backend</p>
          </div>
          <div className="team-member">
            <img src={Persona2} alt="Nombre del Integrante 2" />
            <h3>Yaneli</h3>
            <p>Area de Backend y PWA</p>
          </div>
          <div className="team-member">
            <img src={Persona3} alt="Nombre del Integrante 3" />
            <h3>Cristian Cetz</h3>
            <p>Area de Front-end</p>
          </div>
          <div className="team-member">
            <img src={Persona4} alt="Nombre del Integrante 4" />
            <h3>M.Martinez</h3>
            <p>Lider del equipo de Front-end</p>
          </div>
          <div className="team-member">
            <img src={Persona5} alt="Nombre del Integrante 5" />
            <h3>M.E.C.Y</h3>
            <p>Area de Front-end</p>
          </div>
        </div>
      </section>
      
    </div>
  );
};


export default AboutComponent;
