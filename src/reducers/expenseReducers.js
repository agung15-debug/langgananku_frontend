import {
  EXPENSE_LIST_REQUEST,
  EXPENSE_LIST_SUCCESS,
  EXPENSE_LIST_FAIL,
  EXPENSE_DETAILS_REQUEST,
  EXPENSE_DETAILS_SUCCESS,
  EXPENSE_DETAILS_FAIL,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_DELETE_SUCCESS,
  EXPENSE_DELETE_FAIL,
  EXPENSE_CREATE_RESET,
  EXPENSE_CREATE_FAIL,
  EXPENSE_CREATE_SUCCESS,
  EXPENSE_CREATE_REQUEST,
  EXPENSE_UPDATE_REQUEST,
  EXPENSE_UPDATE_SUCCESS,
  EXPENSE_UPDATE_FAIL,
  EXPENSE_UPDATE_RESET,
  EXPENSE_ALL_REQUEST,
  EXPENSE_ALL_SUCCESS,
  EXPENSE_ALL_FAIL,
} from '../constants/expenseConstants'

export const expenseListReducer = (state = { expenses: [] }, action) => {
  switch (action.type) {
    case EXPENSE_LIST_REQUEST:
      return { loading: true, expenses: [] }
    case EXPENSE_LIST_SUCCESS:
      return {
        loading: false,
        expenses: action.payload.expenses,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case EXPENSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const expenseDetailsReducer = (
  state = { expense: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case EXPENSE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case EXPENSE_DETAILS_SUCCESS:
      return { loading: false, expense: action.payload }
    case EXPENSE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const expenseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DELETE_REQUEST:
      return { loading: true }
    case EXPENSE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case EXPENSE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const expenseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_CREATE_REQUEST:
      return { loading: true }
    case EXPENSE_CREATE_SUCCESS:
      return { loading: false, success: true, expense: action.payload }
    case EXPENSE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case EXPENSE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const expenseUpdateReducer = (state = { expense: {} }, action) => {
  switch (action.type) {
    case EXPENSE_UPDATE_REQUEST:
      return { loading: true }
    case EXPENSE_UPDATE_SUCCESS:
      return { loading: false, success: true, expense: action.payload }
    case EXPENSE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case EXPENSE_UPDATE_RESET:
      return { expense: {} }
    default:
      return state
  }
}

export const expenseAllReducer = (state = { expenses: [] }, action) => {
  switch (action.type) {
    case EXPENSE_ALL_REQUEST:
      return { loading: true, expenses: [] }
    case EXPENSE_ALL_SUCCESS:
      return {
        loading: false,
        expenses: action.payload,
      }
    case EXPENSE_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}