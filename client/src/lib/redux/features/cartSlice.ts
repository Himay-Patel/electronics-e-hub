import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/redux/store';

interface Product {
    _id: string
    name: string
    price: number
    description: string
    category: {
        _id: string,
        name: string
    }
    images: string[]
    company: string
    color: string,
    quantity: number
}

interface CartState {
    items: Product[]
    totalItems: number
    total: number
}

let initialCart: CartState = {
    items: [],
    total: 0,
    totalItems: 0
}

if (typeof window !== "undefined") {
    const cart = sessionStorage.getItem('cart');
    if (cart) {
        initialCart = JSON.parse(cart);
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        initiate(state, action: PayloadAction<CartState>) {
            state.items = action.payload.items;
            state.total = action.payload.total;
            state.totalItems = action.payload.totalItems;
        },
        increaseQuantityOrAdd(state, action: PayloadAction<Product>) {
            const product = action.payload;
            const existingProduct = state.items.find(item => item._id === product._id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.items.push(product);
            }
            state.totalItems += product.quantity;
            const subtotal = product.price * product.quantity;
            state.total += subtotal;
        },
        decreaseQuantityOrDelete(state, action: PayloadAction<Product>) {
            const product = action.payload;
            const existingProduct = state.items.find(item => item._id === product._id);
            if(existingProduct) {
                if(existingProduct.quantity === 1) {
                    state.items = state.items.filter(item => item._id !== product._id);
                } else {
                    existingProduct.quantity--;
                }
                state.totalItems -= product.quantity;
                const subtotal = product.price * product.quantity;
                state.total -= subtotal;
            }
        },
        remove(state, action: PayloadAction<Product>) {
            const product = action.payload;
            const existingProduct = state.items.find(item => item._id === product._id);
            if(existingProduct) {
                state.items = state.items.filter(item => item._id !== product._id);
                state.totalItems -= product.quantity;
                state.total -= product.quantity * product.price;
            }
        },
        add(state, action:PayloadAction<Product>) {
            const product = action.payload;
            state.items.push(product);
            state.totalItems += product.quantity;
            state.total += product.price * product.quantity;
        }
    }
});

export const { increaseQuantityOrAdd, decreaseQuantityOrDelete, initiate, remove } = cartSlice.actions;
export default cartSlice.reducer;