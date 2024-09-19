import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';
import CartInfo from './components/cart-info';

function App({ store }) {
  // Получаем список товаров и корзину
  const list = store.getState().list;
  const cart = store.getState().cart;

  // Управляем состоянием модального окна корзины (открыто/закрыто)
  const [isCartOpen, setCartOpen] = useState(false);

  const callbacks = {
    // Добавляем товар в корзину
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store], // Запоминаем store
    ),

    // Удаляем товар из корзины
    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store], // Запоминаем store
    ),

    // Открываем/закрываем корзину
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  };

  return (
    <PageLayout> {/* Вся страница внутри макета */}
      <Head title="Магазин" />
      
      <CartInfo cart={cart} onCartClick={callbacks.openCart} />   {/* Информация о корзине и кнопка перехода */}

      <List list={list} onAddToCart={callbacks.onAddToCart} />      {/* Список товаров и кнопка добавить */}
      
      {isCartOpen && (      /* Если корзина открыта, показываем модальное окно */
        <PageLayout>
          <CartModal
            cart={cart}       /* Список товаров в корзине */
            totalPrice={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}        /* Считаем общую сумму */
            onRemoveFromCart={callbacks.onRemoveFromCart}                               /* Удаление товара из корзины */
            onClose={callbacks.closeCart}                        /* Закрытие корзины */
          />
        </PageLayout>
      )}
    </PageLayout>
  );
}

export default App;
