import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: [], // Инициализация корзины
      totalQuantity: 0, // Общее количество товаров
      totalPrice: 0, // Общая стоимость товаров
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  // Функция для обновления общей суммы и количества
  updateCartTotals() {
    const totalQuantity = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.setState({
      ...this.state,
      totalQuantity,
      totalPrice,
    });
  }

  /** Добавление товара в корзину */
  addToCart(productCode) {
    const itemInCart = this.state.cart.find(item => item.code === productCode);
    if (itemInCart) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item =>
          item.code === productCode ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      const product = this.state.list.find(item => item.code === productCode);
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...product, quantity: 1 }],
      });
    }

    // Обновляем общую сумму и количество после добавления
    this.updateCartTotals();
  }
   /** Удаление товара из корзины */
  removeFromCart(productCode) {
    const itemInCart = this.state.cart.find(item => item.code === productCode);
    if (itemInCart) {
      // Полностью удаляем товар из корзины
      this.setState({
        ...this.state,
        cart: this.state.cart.filter(item => item.code !== productCode),
      });
    }

    // Обновляем общую сумму и количество после удаления
    this.updateCartTotals();
  }

}

export default Store;
