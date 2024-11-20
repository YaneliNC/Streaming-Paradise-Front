import React, { useEffect, useState } from 'react';
import IMG from '../../assets/imagenes/IMG.jpg';
import './Comments.css';

const Comments = ({ userId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (userId) {
      const fetchComments = async () => {
        try {
          const response = await fetch(`https://streaming-paradise-server.onrender.com/comments/miscomentarios/${userId}`);
          const data = await response.json();
          setComments(data);
        } catch (error) {
          console.error('Error al recuperar los comentarios:', error);
        }
      };

      fetchComments();
    }
  }, [userId]);

  return (
    <div className="comments-container">
      {comments.map((comment) => (
        <div key={comment.idcoment} className="comment">
          <div className="comment-header">
            <img src={IMG} alt="Foto de perfil" className="comment-avatar" />
            <div className="comment-info">
              <span className="comment-username">Usuario: {comment.nombre_usuario_comentador}</span>
              <span className="comment-date">Video:{comment.title}</span>
              <span className="comment-date">{new Date(comment.fecha).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="comment-text">
            <p>{comment.comentario}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
