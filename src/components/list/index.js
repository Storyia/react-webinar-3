import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item'; // Компонент с товарами
import './style.css';

function List({ list, totalQuantity, totalPrice, onAddToCart }) {
  return (
    <div className="List">     
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalQuantity: PropTypes.number.isRequired, // Количество товаров в корзине
  totalPrice: PropTypes.number.isRequired, // Общая сумма
  onAddToCart: PropTypes.func.isRequired, // Функция для добавления товара в корзину
};

export default List;
