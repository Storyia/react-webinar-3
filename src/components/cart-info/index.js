import React from 'react';
import PropTypes from 'prop-types';
import './style.css'; 
import plural from 'plural-ru';

function CartInfo({ cart, onCartClick }) {
  // Вычисляем количество уникальных товаров и общую сумму
  const totalQuantity = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="CartInfo">
      <span className="cart-info-text">В корзине:</span>
      <span className="cart-info-bold">
      {totalQuantity} {plural(totalQuantity, 'товар', 'товара', 'товаров')} / {totalPrice} ₽
    </span>
      <button className="cart-button" onClick={onCartClick}>Перейти</button>
    </div>
  );
}

CartInfo.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onCartClick: PropTypes.func.isRequired,
};

export default CartInfo;
