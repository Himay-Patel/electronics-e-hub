import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/redux/store'

interface Product {
    _id: string
    name: string
    price: Number
    description: string
    category: {
        _id: string,
        name: string
    }
    images: string[]
    company: string
    color: string
}

interface LatestProductsState {
    latestproducts: Product[]
}

const initialLatestProducts: LatestProductsState = {
    latestproducts: []
}

export const latestproductSlice = createSlice({
    name: 'latestproducts',
    initialState: initialLatestProducts,
    reducers: {
        setLatestProducts(state, action: PayloadAction<Product[]>) {
            state.latestproducts = action.payload
        }
    }
});

export const { setLatestProducts } = latestproductSlice.actions;
export default latestproductSlice.reducer