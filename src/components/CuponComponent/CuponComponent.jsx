import React from 'react';
import './CuponComponent.css'; 

const CuponComponent = ({ couponCode, description }) => {
  return (
    <div className="Cupon-bar">
      <div className="Cupon-header">Cupón disponible</div>
      <div className="Cupon-code">{couponCode}BLACKFRIDAY20</div>
      <div className="Cupon-description">{description}Ingresa el cupón y obten 20% de descuento en tu paquete de afiliado</div>
    </div>
  );
};

export default CuponComponent;
