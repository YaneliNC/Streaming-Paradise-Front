import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import "./LoginComponent.css";
import Logo from "../../assets/imagenes/Logo.png"; // Importa el logo aquí

const LoginComponent = ({ handleNavbar, handleFooter }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUser } = useUser();

  useEffect(() => {
    handleNavbar(false);
    handleFooter(false);
    return () => {
      handleNavbar(true);
      handleFooter(true);
    };
  }, [handleNavbar, handleFooter]);

  const showNotification = (userName) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Bienvenido de vuelta", {
        body: `Hola, ${userName}!`,
        icon: Logo, // Usa el logo como icono en la notificación
      });
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Bienvenido de vuelta", {
            body: `Hola, ${userName}!`,
            icon: Logo,
          });
        }
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://streaming-paradise-server.onrender.com/users/login", { email, password });
      
      if (response.data && response.data.rememberToken && response.data.user) {
        const { rememberToken, user } = response.data;

        localStorage.setItem("token", rememberToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        // Mostrar notificación
        showNotification(user.name);

        if (user.idrol === 1) {
          navigate("/admin");
        } else if (user.idrol === 2) {
          navigate("/");
        } else if (user.idrol === 3) {
          navigate("/perfil/artista");
        } else if (user.idrol === 4) {
          navigate("/perfil/novato");
        } else if (user.idrol === 5) {
          navigate("/perfil/estrella");
        } else {
          console.error("Rol de usuario no reconocido");
          setError("Rol de usuario no reconocido");
        }
      } else {
        setError("Error en la respuesta del servidor");
        console.error("Error: Respuesta no válida del servidor", response.data);
      }
    } catch (err) {
      setError("Credenciales inválidas o error en el servidor");
      console.error("Error al iniciar sesión:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="log-left-side">
          <img src={Logo} alt="Logo" className="log-logo" />
        </div>
        <div className="log-right-side">
          <h2 className="log-title">Streaming Paradise</h2>
          <div className="log-form-container">
            <form className="log-form" onSubmit={handleLogin}>
              <div className="input-container" style={{ position: "relative" }}>
                <input
                  type="email"
                  placeholder="Ingrese correo"
                  className="log-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-container" style={{ position: "relative" }}>
                <input
                  type="password"
                  placeholder="Ingrese contraseña"
                  className="log-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Iniciar Sesión
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <p className="register-text">
                ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
