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

interface TendingProductsState {
    trendingproducts: Product[]
}

const initialProducts: TendingProductsState = {
    trendingproducts: []
}

export const trendingProductSlice = createSlice({
    name: 'trendingproducts',
    initialState: initialProducts,
    reducers: {
        setTrendingProducts(state, action: PayloadAction<Product[]>) {
            state.trendingproducts = action.payload
        }
    }
});

export const { setTrendingProducts } = trendingProductSlice.actions;
export default trendingProductSlice.reducer