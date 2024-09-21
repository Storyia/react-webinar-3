import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item'; // Компонент с товарами
import './style.css';

function List({ list, onAction, actionLabel, isModal }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            onAction={onAction}
            actionLabel={actionLabel}
            isModal={isModal}
          />
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
      quantity: PropTypes.number, // Для товаров в корзине
    })
  ).isRequired,
  onAction: PropTypes.func.isRequired, // Функция для действий с товарами
  actionLabel: PropTypes.string.isRequired,
};

export default List;
