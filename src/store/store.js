import {configureStore} from '@reduxjs/toolkit';
import couponsStoreSlice from './slices/couponsStoreSlice';


const store = configureStore({
    reducer: {
        coupons: couponsStoreSlice
    }
})

export default store;