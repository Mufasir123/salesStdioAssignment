import {createSlice} from '@reduxjs/toolkit';

const couponsStoreSlice = createSlice({
    name: 'coupons',
    initialState: {
        coupons: [],
    },
    reducers: {
        getCoupons:(state , action)=>{
            state.coupons = action.payload;
        },
        deleteCoupon: (state, action) => {
            state = state.filter((coupon) => coupon.id!== action.payload);
        },
    },
})

export const {getCoupons, deleteCoupon} = couponsStoreSlice.actions;

export default couponsStoreSlice.reducer;