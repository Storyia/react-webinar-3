import React from 'react';
import Modal from '../modal';
import Head from '../head';
import List from '../list'; 
import './style.css';

function CartModal({ cart, onRemoveFromCart, totalPrice, onClose }) {
  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <Head title="Корзина" />
        <button className="close-btn" onClick={onClose}>Закрыть</button>
      </div>
      <div className="modal-body">
        <div className="empty-row"></div>
        <List
          list={cart} 
          onAction={onRemoveFromCart} 
          actionLabel="Удалить" 
          isModal={true}
        />
      </div>
      <div className="modal-footer">
        <span className="total-label">Итого:</span>
        <span className="total-price">{formatPrice(totalPrice)}</span>
      </div>
    </Modal>
  );
}

export default CartModal;
