import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAction, actionLabel, isModal }) {
  function formatPrice(price) {
    return price.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    });
  }

  return (
    <div className={`item ${isModal ? 'modal-item' : 'catalog-item'}`}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className={`item-price ${isModal ? 'modal-price' : 'catalog-price'}`}>{formatPrice(item.price)}</div>
      {item.quantity && <div className="item-quantity">{item.quantity} шт.</div>} 
      <div className="Item-actions">
        <button onClick={() => onAction(item.code)}>{actionLabel}</button> 
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number, // Для отображения количества в корзине
  }).isRequired,
  onAction: PropTypes.func.isRequired, // Функция действия (Добавить или Удалить)
  actionLabel: PropTypes.string.isRequired, 
};

export default React.memo(Item);
