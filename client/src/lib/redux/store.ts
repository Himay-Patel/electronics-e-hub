import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/lib/redux/features/userSlice'
import productReducer from '@/lib/redux/features/productSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      products: productReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']