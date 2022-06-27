import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS
} from '../constants/orderConst';
import axios from 'axios'



export const createOrder = (order) => async (dispatch, getState) => {
    try {
          console.log(order);

        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        // adding  toke Authorization header to access a protect route 
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders`,order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        }
    catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message : err.message
        })
    }
}



export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
          console.log(id);

        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        // adding  toke Authorization header to access a protect route 
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

        }
    catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message : err.message
        })
    }
}