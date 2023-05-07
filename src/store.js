import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productAllReducer,
} from './reducers/productReducers'
import {
  supplierListReducer,
  supplierDetailsReducer,
  supplierDeleteReducer,
  supplierCreateReducer,
  supplierUpdateReducer,
} from './reducers/supplierReducers'
import {
  expenseListReducer,
  expenseDetailsReducer,
  expenseDeleteReducer,
  expenseCreateReducer,
  expenseUpdateReducer,
  expenseAllReducer,
} from './reducers/expenseReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  confirmOrderPayReducer,
  orderDoneReducer,
  orderListMyReducer,
  orderListReducer,
  sortOrderListReducer,
} from './reducers/orderReducers'
import {
  announceListReducer,
  announceDetailsReducer,
  announceDeleteReducer,
  announceCreateReducer,
  announceUpdateReducer,
  bannerListReducer,
  textAnnounceCreateReducer,
  textAnnounceListReducer,
  textAnnounceDeleteReducer,
} from './reducers/announceReducers'
import {
  bankAccountListReducer,
  bankAccountDetailsReducer,
  bankAccountDeleteReducer,
  bankAccountCreateReducer,
  bankAccountUpdateReducer,
  bankAccountAllReducer,
} from './reducers/bankAccountReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productAll: productAllReducer,
  supplierList: supplierListReducer,
  supplierDetails: supplierDetailsReducer,
  supplierDelete: supplierDeleteReducer,
  supplierCreate: supplierCreateReducer,
  supplierUpdate: supplierUpdateReducer,
  expenseList: expenseListReducer,
  expenseDetails: expenseDetailsReducer,
  expenseDelete: expenseDeleteReducer,
  expenseCreate: expenseCreateReducer,
  expenseUpdate: expenseUpdateReducer,
  expenseAll: expenseAllReducer,
  bankAccountList: bankAccountListReducer,
  bankAccountDetails: bankAccountDetailsReducer,
  bankAccountDelete: bankAccountDeleteReducer,
  bankAccountCreate: bankAccountCreateReducer,
  bankAccountUpdate: bankAccountUpdateReducer,
  bankAccountAll: bankAccountAllReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  confirmOrderPay: confirmOrderPayReducer,
  orderDone: orderDoneReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  sortOrderList: sortOrderListReducer,
  announceList: announceListReducer,
  announceDetails: announceDetailsReducer,
  announceDelete: announceDeleteReducer,
  announceCreate: announceCreateReducer,
  announceUpdate: announceUpdateReducer,
  bannerList: bannerListReducer,
  textAnnounceCreate: textAnnounceCreateReducer,
  textAnnounceList: textAnnounceListReducer,
  textAnnounceDelete: textAnnounceDeleteReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const pickupNoteFromStorage = localStorage.getItem('pickupNote')
  ? JSON.parse(localStorage.getItem('pickupNote'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    pickupNote: pickupNoteFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
