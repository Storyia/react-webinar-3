import React from 'react';
import './style.css';

function CartModal({ cart, onRemoveFromCart, totalPrice, onClose }) {
  return (
    <>
      {/* Затемняющий фон */}
      <div className="modal-overlay" onClick={onClose}></div>
        {/* Модальное окно */}
        <div className="modal">
          <div className="modal-header">
            <h2>Корзина</h2>
            <button className="close-btn" onClick={onClose}>Закрыть</button>
          </div>
          <div className="modal-body">
          <div className="empty-row"></div>
            {cart.map(item => (
              <div className="modal-item">
                <span className="item-code">{item.code}</span>
                <span className="item-title">{item.title}</span>
                <div className="item-price">{item.price} ₽</div>
                <div className="item-quantity">{item.quantity} шт.</div>
                <button className="item-remove-button" onClick={() => onRemoveFromCart(item.code)}>Удалить</button>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <span class="total-label">Итого</span>
            <span class="total-price">{totalPrice} ₽</span>
          </div>
        </div>
    </>
  );
}

export default CartModal;
