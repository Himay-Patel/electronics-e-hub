import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/redux/store'

interface UserState {
    _id: string | null
    email: string | null
    username: string | null
    imageUrl: string | null
}

let initialUser: UserState = {
    _id: null,
    email: null,
    username: null,
    imageUrl: null,
}

if(typeof window !== "undefined") {
    const user = JSON.parse( window.localStorage.getItem("user") || "null");
    if(user !== null){
        initialUser._id = user._id;
        initialUser.username = user.username;
        initialUser.email = user.email;
        initialUser.imageUrl = user.imageUrl;
    }
}

const initialState: UserState = {
    _id: initialUser._id,
    email: initialUser.email,
    username: initialUser.username,
    imageUrl: initialUser.imageUrl,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.imageUrl = action.payload.imageUrl;
        }
    },
})

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState) => state.counter.value

export default userSlice.reducer