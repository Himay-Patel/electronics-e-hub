import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/redux/store';

interface Category {
    _id: string,
    name: string,
    imageUrl: string
}

interface CategoryState {
    categories: Category[],
}

const initialCategories: CategoryState = {
    categories: [],
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState: initialCategories,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        }
    }
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;