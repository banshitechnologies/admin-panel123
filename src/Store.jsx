import { configureStore } from "@reduxjs/toolkit";
import { auth, order, products } from "./Reducers";

const store = configureStore({
    reducer:{
        auth : auth,
        products: products,
        order: order
    }
})

export default store;