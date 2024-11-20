import React, { useState, useEffect } from 'react';
import './PaquetesComponent.css';
import Paq1 from '../../assets/imagenes/Paq1.png';
import Paq2 from '../../assets/imagenes/Paq2.png';
import Paq3 from '../../assets/imagenes/Paq3.png';

const PaquetesComponent = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [purchaseDetails, setPurchaseDetails] = useState(null); // Guardar detalles de la compra

  useEffect(() => {
    if (selectedPackage) {
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AWGD2AfDr_V-jJDKsZURjp_8nX_V0f0HIOpjcHArkLuepfP3Bfpc2-JUyzj50kpABNYoOZrTXUadeYkN&currency=USD";
      script.async = true;
      script.onload = () => {
        const createPaypalButton = (amount, containerId) => {
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: amount,
                  },
                }],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then(details => {
                // Guardar detalles de la compra en el estado
                setPurchaseDetails(details);
                console.log('Detalles de la transacción:', details);

                // Crear los datos que vas a enviar al backend usando los mismos datos que muestras en el frontend
                const transactionData = {
                  email_address: details.payer.email_address,
                  name: `${details.payer.name.given_name} ${details.payer.name.surname}`,
                  transaction_id: details.id,
                  status: details.status,
                  amount: details.purchase_units[0].amount.value,
                  currency: details.purchase_units[0].amount.currency_code,
                  payer_id: details.payer.payer_id,
                };

                // Enviar una solicitud POST al backend con los detalles de la compra
                fetch('https://streaming-paradise-server.onrender.com/payments/capture', {  // Cambia esta URL por la de tu backend
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(transactionData),
                })
                .then(response => response.json())
                .then(data => {
                  console.log('Respuesta del backend:', data);
                })
                .catch(error => {
                  console.error('Error al enviar los datos al backend:', error);
                });
              });
            },
          }).render(containerId);
        };

        // Crear el botón PayPal para el paquete seleccionado
        if (selectedPackage === '50') createPaypalButton('50.00', '#paypal-button-container');
        if (selectedPackage === '100') createPaypalButton('100.00', '#paypal-button-container');
        if (selectedPackage === '200') createPaypalButton('200.00', '#paypal-button-container');
      };
      document.body.appendChild(script);
    }
  }, [selectedPackage]);

  const closeModal = () => setSelectedPackage(null);

  return (
    <div className='container-paq'>
      {/* Modal */}
      {selectedPackage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Comprar Paquete de ${selectedPackage}</h2>
            <div id="paypal-button-container"></div>
          </div>
        </div>
      )}

      {/* Mostrar detalles de la compra después de que se complete 
      {purchaseDetails && (
        <div className="purchase-details">
          <h3>Detalles de la Compra</h3>
          <p><strong>Comprador:</strong> {purchaseDetails.payer.name.given_name} {purchaseDetails.payer.name.surname}</p>
          <p><strong>Email:</strong> {purchaseDetails.payer.email_address}</p>
          <p><strong>ID de la transacción:</strong> {purchaseDetails.id}</p>
          <p><strong>Estado:</strong> {purchaseDetails.status}</p>
          <p><strong>Monto:</strong> {purchaseDetails.purchase_units[0].amount.value} {purchaseDetails.purchase_units[0].amount.currency_code}</p>
        </div>
      )} */}

      {/* Paquete Novato */}
      <div className='cardp novato'>
        <div className='cardp_info'>
          <img src={Paq1} alt="Paquete 1" className='Paq1' />
          <h2 className='cardp_sub'>Novato</h2>
          <p className='cardp_price'>$50.00 <span className='cardp_priceSpan'>/mes</span></p>
        </div>
        <div className='cardp_content'>
          <div className='cardp_rows'>
            <p className='cardp_row'>Sube tus vídeos</p>
          </div>
          <button className="buy-button" onClick={() => setSelectedPackage('50')}>Comprar</button>
        </div>
      </div>

      {/* Paquete Artista */}
      <div className='cardp'>
        <div className='cardp_info'>
          <img src={Paq2} alt="Paquete 2" className='Paq2' />
          <h2 className='cardp_sub'>Artista</h2>
          <p className='cardp_price'>$100.00 <span className='cardp_priceSpan'>/mes</span></p>
        </div>
        <div className='cardp_content'>
          <div className='cardp_rows'>
            <p className='cardp_row'>Sube tus vídeos</p>
            <p className='cardp_row'>Ve tus calificaciones y comentarios</p>
          </div>
          <button className="buy-button" onClick={() => setSelectedPackage('100')}>Comprar</button>
        </div>
      </div>

      {/* Paquete Estrella */}
      <div className='cardp'>
        <div className='cardp_info'>
          <img src={Paq3} alt="Paquete 3" className='Paq3' />
          <h2 className='cardp_sub'>Estrella</h2>
          <p className='cardp_price'>$200.00 <span className='cardp_priceSpan'>/mes</span></p>
        </div>
        <div className='cardp_content'>
          <div className='cardp_rows'>
            <p className='cardp_row'>Sube tus vídeos</p>
            <p className='cardp_row'>Ve tus calificaciones y comentarios</p>
            <p className='cardp_row'>Visualiza el top 5 de mayores consumidores</p>
          </div>
          <button className="buy-button" onClick={() => setSelectedPackage('200')}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default PaquetesComponent;
