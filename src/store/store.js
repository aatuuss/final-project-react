import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducer/ThemeReducer";


const store = configureStore({
    reducer :{
        theme: themeReducer,

    },
});

export default store