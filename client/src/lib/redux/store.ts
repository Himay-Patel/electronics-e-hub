import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/lib/redux/features/userSlice'
import productReducer from '@/lib/redux/features/productSlice'
import categoryReducer from '@/lib/redux/features/categorySlice'
import filterReducer from '@/lib/redux/features/filterSlice'
import cartReducer from '@/lib/redux/features/cartSlice'
import trendingProductReducer from './features/trendingproductSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      products: productReducer,
      trendinproducts: trendingProductReducer,
      categories: categoryReducer,
      filter: filterReducer,
      cart: cartReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']