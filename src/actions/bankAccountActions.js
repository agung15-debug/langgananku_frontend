import axios from 'axios'
import {
  BANK_ACCOUNT_LIST_REQUEST,
  BANK_ACCOUNT_LIST_SUCCESS,
  BANK_ACCOUNT_LIST_FAIL,
  BANK_ACCOUNT_DETAILS_REQUEST,
  BANK_ACCOUNT_DETAILS_SUCCESS,
  BANK_ACCOUNT_DETAILS_FAIL,
  BANK_ACCOUNT_DELETE_SUCCESS,
  BANK_ACCOUNT_DELETE_REQUEST,
  BANK_ACCOUNT_DELETE_FAIL,
  BANK_ACCOUNT_CREATE_REQUEST,
  BANK_ACCOUNT_CREATE_SUCCESS,
  BANK_ACCOUNT_CREATE_FAIL,
  BANK_ACCOUNT_UPDATE_REQUEST,
  BANK_ACCOUNT_UPDATE_SUCCESS,
  BANK_ACCOUNT_UPDATE_FAIL,
  BANK_ACCOUNT_ALL_REQUEST,
  BANK_ACCOUNT_ALL_SUCCESS,
  BANK_ACCOUNT_ALL_FAIL,
} from '../constants/bankAccountConstants'
import { logout } from './userActions'

export const listBankAccounts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: BANK_ACCOUNT_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/bankAccounts?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: BANK_ACCOUNT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BANK_ACCOUNT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBankAccountDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BANK_ACCOUNT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/bankAccounts/${id}`)

    dispatch({
      type: BANK_ACCOUNT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BANK_ACCOUNT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBankAccount = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BANK_ACCOUNT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/bankAccounts/${id}`, config)

    dispatch({
      type: BANK_ACCOUNT_DELETE_SUCCESS,
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
      type: BANK_ACCOUNT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createBankAccount = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BANK_ACCOUNT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/bankAccounts`, {}, config)

    dispatch({
      type: BANK_ACCOUNT_CREATE_SUCCESS,
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
      type: BANK_ACCOUNT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateBankAccount = (bankAccount) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BANK_ACCOUNT_UPDATE_REQUEST,
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
      `/api/bankAccounts/${bankAccount._id}`,
      bankAccount,
      config
    )

    dispatch({
      type: BANK_ACCOUNT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: BANK_ACCOUNT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BANK_ACCOUNT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const allBankAccounts = () => async (dispatch) => {
  try {
    dispatch({ type: BANK_ACCOUNT_ALL_REQUEST })

    const { data } = await axios.get(`/api/bankAccounts/all`)

    dispatch({
      type: BANK_ACCOUNT_ALL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BANK_ACCOUNT_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}