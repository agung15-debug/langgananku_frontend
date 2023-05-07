import {
  BANK_ACCOUNT_LIST_REQUEST,
  BANK_ACCOUNT_LIST_SUCCESS,
  BANK_ACCOUNT_LIST_FAIL,
  BANK_ACCOUNT_DETAILS_REQUEST,
  BANK_ACCOUNT_DETAILS_SUCCESS,
  BANK_ACCOUNT_DETAILS_FAIL,
  BANK_ACCOUNT_DELETE_REQUEST,
  BANK_ACCOUNT_DELETE_SUCCESS,
  BANK_ACCOUNT_DELETE_FAIL,
  BANK_ACCOUNT_CREATE_RESET,
  BANK_ACCOUNT_CREATE_FAIL,
  BANK_ACCOUNT_CREATE_SUCCESS,
  BANK_ACCOUNT_CREATE_REQUEST,
  BANK_ACCOUNT_UPDATE_REQUEST,
  BANK_ACCOUNT_UPDATE_SUCCESS,
  BANK_ACCOUNT_UPDATE_FAIL,
  BANK_ACCOUNT_UPDATE_RESET,
  BANK_ACCOUNT_ALL_REQUEST,
  BANK_ACCOUNT_ALL_SUCCESS,
  BANK_ACCOUNT_ALL_FAIL,
} from '../constants/bankAccountConstants'

export const bankAccountListReducer = (state = { bankAccounts: [] }, action) => {
  switch (action.type) {
    case BANK_ACCOUNT_LIST_REQUEST:
      return { loading: true, bankAccounts: [] }
    case BANK_ACCOUNT_LIST_SUCCESS:
      return {
        loading: false,
        bankAccounts: action.payload.bankAccounts,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case BANK_ACCOUNT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bankAccountDetailsReducer = (
  state = { bankAccount: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case BANK_ACCOUNT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case BANK_ACCOUNT_DETAILS_SUCCESS:
      return { loading: false, bankAccount: action.payload }
    case BANK_ACCOUNT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bankAccountDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BANK_ACCOUNT_DELETE_REQUEST:
      return { loading: true }
    case BANK_ACCOUNT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BANK_ACCOUNT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bankAccountCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BANK_ACCOUNT_CREATE_REQUEST:
      return { loading: true }
    case BANK_ACCOUNT_CREATE_SUCCESS:
      return { loading: false, success: true, bankAccount: action.payload }
    case BANK_ACCOUNT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case BANK_ACCOUNT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const bankAccountUpdateReducer = (state = { bankAccount: {} }, action) => {
  switch (action.type) {
    case BANK_ACCOUNT_UPDATE_REQUEST:
      return { loading: true }
    case BANK_ACCOUNT_UPDATE_SUCCESS:
      return { loading: false, success: true, bankAccount: action.payload }
    case BANK_ACCOUNT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case BANK_ACCOUNT_UPDATE_RESET:
      return { bankAccount: {} }
    default:
      return state
  }
}

export const bankAccountAllReducer = (state = { bankAccounts: [] }, action) => {
  switch (action.type) {
    case BANK_ACCOUNT_ALL_REQUEST:
      return { loading: true, bankAccounts: [] }
    case BANK_ACCOUNT_ALL_SUCCESS:
      return {
        loading: false,
        bankAccounts: action.payload,
      }
    case BANK_ACCOUNT_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}