import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cartManager'
import storeReducer from '../features/storeManager'

export default configureStore({
  reducer: {
    cart: cartReducer,
    results: storeReducer,
  },
})
