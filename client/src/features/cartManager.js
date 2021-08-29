import { createSlice } from '@reduxjs/toolkit'

const initialState = () => {
  try {
    return JSON.parse(localStorage.capCart)
  } catch {
    return []
  }
}

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return
  }
}

export const cartManager = createSlice({
  name: 'cart',
  initialState: {
    cart: initialState(),
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload]
      saveToStorage('capCart', state.cart)
    },
    removeFromCart: (state, action) => {
      state.cart = [...state.cart.filter((item) => item.id !== action.payload)]
      saveToStorage('capCart', state.cart)
    },
    emptyCart: (state) => {
      state.cart = []
      saveToStorage('capCart', [])
    },
  },
})

export const { addToCart, removeFromCart, emptyCart } = cartManager.actions

export const selectCart = (state) => state.cart

export default cartManager.reducer
