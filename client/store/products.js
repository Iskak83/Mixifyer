import axios from 'axios'

//ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT'
const REMOVE_SELECTED_PRODUCT = 'REMOVE_SELECTED_PRODUCT'

//ACTION CREATORS
const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products})
const createNewProduct = product => ({type: CREATE_NEW_PRODUCT, product})
const removeSelectedProduct = id => ({type: REMOVE_SELECTED_PRODUCT, id})

//INITIAL STATE
let initialState = []

//THUNK CREATORS

export const thunkFetchAllProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getAllProducts(data))
  } catch (error) {
    console.log(error)
  }
}

export const thunkCreateNewProduct = product => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', product)
    dispatch(createNewProduct(data))
  } catch (error) {
    console.log(error)
  }
}

export const thunkRemoveProduct = id => async dispatch => {
  try {
    console.log('data-->: ', id)
    const data = await axios.delete(`/api/products/${id}`)

    dispatch(removeSelectedProduct(id))
  } catch (error) {
    console.log(error)
  }
}
export const thunkEditProduct = (id, product, products) => async dispatch => {
  console.log('PUT R in PRODUCTS', id)
  try {
    const {data} = await axios.put(`/api/products/${id}`, product)
    console.log('PUT R in PRODUCTS', data)
    dispatch(getAllProducts(products))
  } catch (error) {
    console.log(error)
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case CREATE_NEW_PRODUCT:
      return [...state, action.product]
    case REMOVE_SELECTED_PRODUCT:
      return state.filter(product => product.id !== action.id)

    default:
      return state
  }
}
