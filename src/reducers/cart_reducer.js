import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, product, color, amount } = action.payload;
    // el item d bl lon da 8er el item d blon tany
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      let tempCart = state.cart.map((cartItem) => {
        // we use this id format when we add to cart
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return {
            ...cartItem,
            amount: newAmount,
          };
        } else {
          return cartItem;
        }
      });

      return {
        ...state,
        cart: tempCart,
      };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return {
      ...state,
      cart: tempCart,
    };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newItemAmount = item.amount + 1;
          if (newItemAmount > item.max) {
            newItemAmount = item.max;
          }
          return {
            ...item,
            amount: newItemAmount,
          };
        }
        if (value === "dec") {
          let newItemAmount = item.amount - 1;
          if (newItemAmount < 1) {
            newItemAmount = 1;
          }
          return {
            ...item,
            amount: newItemAmount,
          };
        }
      } else {
        return item;
      }
    });
    return {
      ...state,
      cart: tempCart,
    };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, cartItem) => {
        const { price, amount } = cartItem;
        total.totalItems += amount;
        total.totalAmount += price * amount;

        return total;
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    );
    return {
      ...state,
      totalItems,
      totalAmount,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
