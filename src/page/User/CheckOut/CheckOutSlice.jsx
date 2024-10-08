import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getOrderIdNewestService, placeOrderCODService, placeOrderPayPalService, placeOrderVNPayService } from "service/CheckOutService"

const initialState = {
    isLoading: false,
    placeOrder: {},
    messageSuccess: '',
    listProductOrder: [],
    inforShipping: {}
}

// place order COD
export const placeOrderCODAsync = createAsyncThunk("placeOrderCOD", async (params) => {
    const response = await placeOrderCODService(params)
    return response.data
})

// place order VNPay
export const placeOrderVNPayAsync = createAsyncThunk("placeOrderVNPay", async (params) => {
    const response = await placeOrderVNPayService(params)
    return response.data
})

// place order PayPal
export const placeOrderPayPalAsync = createAsyncThunk("placeOrderPayPal", async (params) => {
    const response = await placeOrderPayPalService(params)
    return response.data
})

// get order id newest
export const getOrderIdNewestAsync = createAsyncThunk("etOrderIdNewest", async () => {
    const response = await getOrderIdNewestService()
    return response.data
})

export const checkout = createSlice({
    name: 'checkoutSlice',
    initialState,
    reducers: {
        notifyCheckOutSuccess: (state, action) => {
            state.messageSuccess = action.payload
        },
        saveOrderRequest: (state, action) => {
            state.listProductOrder = action.listProductOrder
            state.inforShipping = action.inforShipping
        }
    },
    extraReducers: builder => {
        builder
            //place order COD
            .addCase(placeOrderCODAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(placeOrderCODAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.placeOrder = action.payload
            })

            //place order VNPay
            .addCase(placeOrderVNPayAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(placeOrderVNPayAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.placeOrder = action.payload
            })

            //place order PayPal
            .addCase(placeOrderPayPalAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(placeOrderPayPalAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.placeOrder = action.payload
            })

            //get order id newest
            .addCase(getOrderIdNewestAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrderIdNewestAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })
    }
})

export const { notifyCheckOutSuccess, saveOrderRequest } = checkout.actions

export const checkOutSelector = state => state.checkout

export default checkout.reducer