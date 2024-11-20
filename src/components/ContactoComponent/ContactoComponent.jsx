import React, { useState } from "react";
import axios from "axios";
import "./ContactoComponent.css";
import Claqueta from "../../assets/imagenes/Claqueta.png";

const ContactoComponent = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://streaming-paradise-server.onrender.com/api/contact", {
        nombre,
        correo,
        mensaje,
      });

      if (response.status === 201) {
        setStatus("Mensaje enviado con éxito");
        setNombre("");
        setCorreo("");
        setMensaje("");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setStatus("Hubo un error al enviar el mensaje");
    }
  };

  return (
    <div className="contacto-body">
      <div className="contacto-container">
        <div className="contacto-left">
          <img src={Claqueta} alt="Clapboard" className="Claqueta-img" />
        </div>
        <div className="contacto-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Joseph Kelce"
              required
            />

            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="joseph@email.com"
              required
            />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Hola, tengo una duda..."
              required
            ></textarea>

            <button type="submit">Enviar</button>
            {status && <p>{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactoComponent;
