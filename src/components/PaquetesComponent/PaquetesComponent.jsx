import React, { useState, useEffect } from 'react';
import './PaquetesComponent.css';
import Paq1 from '../../assets/imagenes/Paq1.png';
import Paq2 from '../../assets/imagenes/Paq2.png';
import Paq3 from '../../assets/imagenes/Paq3.png';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaquetesComponent = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [finalAmount, setFinalAmount] = useState(0); // Monto final con descuento

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromStorage && userFromStorage.id) {
      setUserId(userFromStorage.id);
    }

    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/coupons/cupones');
        if (response.status === 200) {
          setCoupons(response.data);
        }
      } catch (error) {
        console.error('Error al obtener los cupones:', error);
      }
    };

    fetchCoupons();
  }, []);

  const handleCouponChange = (event) => {
    const couponId = event.target.value;
    const selected = coupons.find((coupon) => coupon.idcupon === parseInt(couponId));
    setSelectedCoupon(selected);
    setDiscount(selected ? selected.porcentaje : 0);
  };

  const calculateFinalAmount = () => {
    const baseAmount = parseFloat(selectedPackage);
    const additionalDiscount = selectedPackage === '200' ? 0.2 : 0; // Descuento adicional del 20%
    const totalDiscount = (discount / 100) + additionalDiscount;
    return (baseAmount * (1 - totalDiscount)).toFixed(2);
  };

  useEffect(() => {
    if (selectedPackage) {
      setFinalAmount(calculateFinalAmount());
    }
  }, [selectedPackage, discount]);

  const handlePaymentSuccess = async (details, selectedPackage) => {
    try {
      const roleMapping = {
        '50': 3,
        '100': 4,
        '200': 5,
      };

      const transactionData = {
        email_address: details.payer.email_address,
        name: `${details.payer.name.given_name} ${details.payer.name.surname}`,
        transaction_id: details.id,
        status: details.status,
        amount: finalAmount,
        currency: details.purchase_units[0].amount.currency_code,
        payer_id: details.payer.payer_id,
        userId: userId,
        new_role: roleMapping[selectedPackage],
        coupon_code: selectedCoupon ? selectedCoupon.codigo : null,
      };

      const paymentResponse = await axios.post('http://localhost:5000/payments/capture', transactionData);

      if (paymentResponse.status === 201) {
        const updatedUser = { ...user, idrol: roleMapping[selectedPackage] };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);

        alert('¡Compra exitosa! Tu cuenta ha sido actualizada.');
        closeModal();
        navigate('/catalogo');
      } else {
        console.error('Payment response was not 200:', paymentResponse);
      }
    } catch (error) {
      console.error('Error durante el proceso de compra:', error);
      alert('Hubo un error durante el proceso de compra. Por favor, intenta nuevamente.');
    }
  };

  useEffect(() => {
    if (selectedPackage) {
      const script = document.createElement('script');
      script.src =
        'https://www.paypal.com/sdk/js?client-id=AWGD2AfDr_V-jJDKsZURjp_8nX_V0f0HIOpjcHArkLuepfP3Bfpc2-JUyzj50kpABNYoOZrTXUadeYkN&currency=USD';
      script.async = true;
      script.onload = () => {
        const createPaypalButton = (amount, containerId) => {
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const details = await actions.order.capture();
              handlePaymentSuccess(details, selectedPackage);
            },
          }).render(containerId);
        };

        createPaypalButton(finalAmount, '#paypal-button-container');
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [selectedPackage, finalAmount]);

  const closeModal = () => {
    setSelectedPackage(null);
    setSelectedCoupon(null);
    setDiscount(0);
  };

  return (
    <div className="container-paq">
      {selectedPackage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Comprar Paquete de ${selectedPackage}</h2>
            <div className="coupon-section">
              <h2>Selecciona un cupón para aplicar descuento:</h2>
              <select className="cupon-select" onChange={handleCouponChange}>
                <option value="">Selecciona un cupón</option>
                {coupons.map((coupon) => (
                  <option key={coupon.idcupon} value={coupon.idcupon}>
                    {coupon.codigo} - {coupon.porcentaje}% descuento
                  </option>
                ))}
              </select>
              {selectedCoupon && <small>Descuento aplicado: {discount}%</small>}
            </div>
            <h3>Monto final: ${finalAmount}</h3>
            <div id="paypal-button-container" style={{ marginTop: '20px' }}></div>
          </div>
        </div>
      )}

      {/* Paquete Novato */}
      <div className="cardp">
        <div className="cardp_info">
          <img src={Paq1} alt="Paquete Novato" className="Paq1" />
          <h2 className="cardp_sub">Novato</h2>
          <p className="cardp_price">$50.00 <span className="cardp_priceSpan">/mes</span></p>
        </div>
        <div className="cardp_content">
          <p className="cardp_row">Sube tus vídeos</p>
          <button className="buy-button" onClick={() => setSelectedPackage('50')}>Comprar</button>
        </div>
      </div>

      {/* Paquete Artista */}
      <div className="cardp">
        <div className="cardp_info">
          <img src={Paq2} alt="Paquete Artista" className="Paq2" />
          <h2 className="cardp_sub">Artista</h2>
          <p className="cardp_price">$100.00 <span className="cardp_priceSpan">/mes</span></p>
        </div>
        <div className="cardp_content">
          <p className="cardp_row">Sube tus vídeos</p>
          <p className="cardp_row">Ve tus calificaciones y comentarios</p>
          <button className="buy-button" onClick={() => setSelectedPackage('100')}>Comprar</button>
        </div>
      </div>

      {/* Paquete Estrella */}
      <div className="cardp">
        <div className="cardp_info">
          <div className="ribbon">¡Oferta de Temporada! 20% OFF</div>
          <img src={Paq3} alt="Paquete Estrella" className="Paq3" />
          <h2 className="cardp_sub">Estrella</h2>
          <p className="cardp_price">$200.00 <span className="cardp_priceSpan">/mes</span></p>
        </div>
        <div className="cardp_content">
          <p className="cardp_row">Sube tus vídeos</p>
          <p className="cardp_row">Ve tus calificaciones y comentarios</p>
          <p className="cardp_row">Visualiza el top 5 de mayores consumidores</p>
          <button className="buy-button" onClick={() => setSelectedPackage('200')}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default PaquetesComponent;
