import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import foodSlice from "./features/foodSlice"
import categorySlice from "./features/categorySlice"
import foodLogSlice from "./features/foodLogSlice"
import foodOptionsSlice from "./features/foodOptionSlice"
import confirmacionSlice from "./features/confirmacionSlice"



export const store = configureStore({
    reducer : {
        userSlice, foodSlice, categorySlice, foodLogSlice, foodOptionsSlice, confirmacionSlice
    }
})
