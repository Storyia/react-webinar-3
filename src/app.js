import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';
import CartInfo from './components/cart-info';

function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const [isCartOpen, setCartOpen] = useState(false);

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      
      <CartInfo cart={cart} onCartClick={callbacks.openCart} />

      <List
        list={list}
        onAction={callbacks.onAddToCart} 
        actionLabel="Добавить" 
      />
      
      {isCartOpen && (
        <PageLayout>
          <CartModal
            cart={cart}
            totalPrice={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            onRemoveFromCart={callbacks.onRemoveFromCart}
            onClose={callbacks.closeCart}
          />
        </PageLayout>
      )}
    </PageLayout>
  );
}

export default App;
