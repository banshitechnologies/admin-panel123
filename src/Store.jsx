import { configureStore } from "@reduxjs/toolkit";
import { auth, countrydetails, order, products } from "./Reducers";

const store = configureStore({
    reducer:{
        auth : auth,
        products: products,
        order: order,
        countrydetails:countrydetails
    }
})

export default store;