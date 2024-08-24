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

interface ProductsState {
    products: Product[]
}

const initialProducts: ProductsState = {
    products: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState: initialProducts,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload
        }
    }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer