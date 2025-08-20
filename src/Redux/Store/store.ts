import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Slice/authSlice'
const store = configureStore({
    reducer: {
        auth: authSlice
    },
    devTools: true
})

export default store;