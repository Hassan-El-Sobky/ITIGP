import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM ,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHODS} from '../constants/cartConst'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)




    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    let products = getState().cart.cartItems

    products = products.filter(x => x.product !== id)

    dispatch({ type: CART_REMOVE_ITEM, payload: id })
    localStorage.setItem('cartItems', JSON.stringify(products))
}

export const saveShippingAddress = (data) => async (dispatch) => {
  

    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {
  

    dispatch({ type: CART_SAVE_PAYMENT_METHODS, payload: data })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}