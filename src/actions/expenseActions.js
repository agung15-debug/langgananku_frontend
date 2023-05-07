import axios from 'axios'
import {
  EXPENSE_LIST_REQUEST,
  EXPENSE_LIST_SUCCESS,
  EXPENSE_LIST_FAIL,
  EXPENSE_DETAILS_REQUEST,
  EXPENSE_DETAILS_SUCCESS,
  EXPENSE_DETAILS_FAIL,
  EXPENSE_DELETE_SUCCESS,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_DELETE_FAIL,
  EXPENSE_CREATE_REQUEST,
  EXPENSE_CREATE_SUCCESS,
  EXPENSE_CREATE_FAIL,
  EXPENSE_UPDATE_REQUEST,
  EXPENSE_UPDATE_SUCCESS,
  EXPENSE_UPDATE_FAIL,
  EXPENSE_ALL_REQUEST,
  EXPENSE_ALL_SUCCESS,
  EXPENSE_ALL_FAIL,
} from '../constants/expenseConstants'
import { logout } from './userActions'

export const listExpenses = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: EXPENSE_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/expenses?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: EXPENSE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EXPENSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listExpenseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/expenses/${id}`)

    dispatch({
      type: EXPENSE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EXPENSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteExpense = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/expenses/${id}`, config)

    dispatch({
      type: EXPENSE_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EXPENSE_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createExpense = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/expenses`, {}, config)

    dispatch({
      type: EXPENSE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EXPENSE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateExpense = (expense) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/expenses/${expense._id}`,
      expense,
      config
    )

    dispatch({
      type: EXPENSE_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: EXPENSE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EXPENSE_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const allExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_ALL_REQUEST })

    const { data } = await axios.get(`/api/expenses/all`)

    dispatch({
      type: EXPENSE_ALL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EXPENSE_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}