import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";

const store = configureStore({
    reducer: {
        authentication : authSlice,
    }
})

export default store