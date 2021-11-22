import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    chef: null,
    cartTotal: 0,
    dishIds: [],
    selectedCartItems: [],
  },
  reducers: {
    addChef: (state, action) => {
      state.chef = action.payload;
    },
    addDish: (state, action) => {
      const item = action.payload;

      state.dishIds.push(action.payload.id);
      state.selectedCartItems.push(item);

      // Increase cart total
      const amount = item.quantity * item.price;
      state.cartTotal += amount;
    },
    decreaseDishQuantity: (state, action) => {
      const dish = action.payload;
      const dishIndex = state.selectedCartItems
        .map((sci) => sci.id)
        .indexOf(dish.id);

      state.selectedCartItems[dishIndex].quantity -= 1;

      // Decrease cart total
      const amount = dish.quantity * dish.price;
      state.cartTotal -= amount;
    },
    increaseDishQuantity: (state, action) => {
      const dish = action.payload;
      const dishIndex = state.selectedCartItems
        .map((sci) => sci.id)
        .indexOf(dish.id);

      state.selectedCartItems[dishIndex].quantity += dish.quantity;

      // Increase cart total
      const amount = dish.quantity * dish.price;
      state.cartTotal += amount;
    },
    removeDish: (state, action) => {
      const dish = action.payload;
      state.dishIds = state.dishIds.filter((id) => id !== dish.id);
      state.selectedCartItems = state.selectedCartItems.filter(
        (item) => item.id !== dish.id
      );

      // Decrease cart total
      state.cartTotal -= dish.price;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice;
// Extract and export each action creator by name
export const {
  addChef,
  addDish,
  decreaseDishQuantity,
  increaseDishQuantity,
  removeDish,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;

export const addDishToCart = (orderChef, selectedCartItem) => async (
  dispatch,
  getState
) => {
  const {
    cart: { chef, dishIds },
  } = getState();

  // Add chef to cart
  if (chef === null) {
    dispatch(addChef(orderChef));
  }
  // Update dishes in cart
  // if (dishIds.includes(selectedCartItem.id)) {
  //   await dispatch(increaseDishQuantity(selectedCartItem));
  // } else {
    // Add dishes to cart
    await dispatch(addDish(selectedCartItem));
  // }
};

export const increaseQuantity = (selectedCartItem) => async (dispatch) => {
  await dispatch(increaseDishQuantity(selectedCartItem));
};

export const decreaseQuantity = (selectedCartItem) => async (
  dispatch,
  getState
) => {
  const {
    cart: { selectedCartItems },
  } = getState();

  const dishIndex = selectedCartItems
    .map((sci) => sci.id)
    .indexOf(selectedCartItem.id);
  const dish = selectedCartItems[dishIndex];

  // If quantity is 1 remove item
  if (dish.quantity === 1) {
    dispatch(removeDish(dish));
    return;
  }

  await dispatch(decreaseDishQuantity(selectedCartItem));
};
