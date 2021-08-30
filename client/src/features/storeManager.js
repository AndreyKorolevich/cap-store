import { createSlice } from '@reduxjs/toolkit'

export const storeManager = createSlice({
  name: 'storeResults',
  initialState: {
    results: [],
    itemsCount: 0,
    genders: [{ value: 0, name: 'All' }],
    brands: [{ value: 0, name: 'All' }],
  },
  reducers: {
    setStoreResults: (state, action) => {
      state.results = action.payload
    },
    setItemsCount: (state, action) => {
      state.itemsCount = action.payload
    },
    setGenders: (state, action) => {
      state.genders = [...state.genders, ...action.payload]
    },
    setBrands: (state, action) => {
      state.brands = [...state.brands, ...action.payload]
    },
  },
})

export const { setStoreResults, setItemsCount, setBrands, setGenders } = storeManager.actions

export const selectResults = (state) => state.results
export const getItemsCount = (state) => state.results.itemsCount
export const getGenders = (state) => state.results.genders
export const getBrands = (state) => state.results.brands

export default storeManager.reducer
