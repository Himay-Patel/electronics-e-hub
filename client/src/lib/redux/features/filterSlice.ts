import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/redux/store';

interface filterState {
    value: string;
}

const initialFilterState: filterState = {
    value: '',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            if(action.payload === state.value) {
                state.value = '';
            } else {
                state.value = action.payload;
            }
        }
    }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;