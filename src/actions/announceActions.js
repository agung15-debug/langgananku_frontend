import axios from 'axios'
import {
  ANNOUNCE_LIST_REQUEST,
  ANNOUNCE_LIST_SUCCESS,
  ANNOUNCE_LIST_FAIL,
  ANNOUNCE_DETAILS_REQUEST,
  ANNOUNCE_DETAILS_SUCCESS,
  ANNOUNCE_DETAILS_FAIL,
  ANNOUNCE_DELETE_SUCCESS,
  ANNOUNCE_DELETE_REQUEST,
  ANNOUNCE_DELETE_FAIL,
  ANNOUNCE_CREATE_REQUEST,
  ANNOUNCE_CREATE_SUCCESS,
  ANNOUNCE_CREATE_FAIL,
  ANNOUNCE_UPDATE_REQUEST,
  ANNOUNCE_UPDATE_SUCCESS,
  ANNOUNCE_UPDATE_FAIL,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_LIST_FAIL,
  TEXT_ANNOUNCE_CREATE_REQUEST,
  TEXT_ANNOUNCE_CREATE_SUCCESS,
  TEXT_ANNOUNCE_CREATE_FAIL,
  TEXT_ANNOUNCE_LIST_REQUEST,
  TEXT_ANNOUNCE_LIST_SUCCESS,
  TEXT_ANNOUNCE_LIST_FAIL,
  TEXT_ANNOUNCE_DELETE_SUCCESS,
  TEXT_ANNOUNCE_DELETE_REQUEST,
  TEXT_ANNOUNCE_DELETE_FAIL,
} from '../constants/announceConstants'
import { logout } from './userActions'

export const listAnnounces = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: ANNOUNCE_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/announces?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: ANNOUNCE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ANNOUNCE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAnnounceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ANNOUNCE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/announces/${id}`)

    dispatch({
      type: ANNOUNCE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ANNOUNCE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAnnounce = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/announces/${id}`, config)

    dispatch({
      type: ANNOUNCE_DELETE_SUCCESS,
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
      type: ANNOUNCE_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createAnnounce = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/announces`, {}, config)

    dispatch({
      type: ANNOUNCE_CREATE_SUCCESS,
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
      type: ANNOUNCE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateAnnounce = (announce) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCE_UPDATE_REQUEST,
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
      `/api/announces/${announce._id}`,
      announce,
      config
    )

    dispatch({
      type: ANNOUNCE_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: ANNOUNCE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ANNOUNCE_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const listBanners = () => async (dispatch) => {
  try {
    dispatch({ type: BANNER_LIST_REQUEST })

    const { data } = await axios.get(`/api/announces/banner`)

    dispatch({
      type: BANNER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BANNER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createTextAnnounce = (textAnnounce) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEXT_ANNOUNCE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/announces/textAnnounce`, textAnnounce, config)

    dispatch({
      type: TEXT_ANNOUNCE_CREATE_SUCCESS,
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
      type: TEXT_ANNOUNCE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const listTextAnnounce = () => async (dispatch) => {
  try {
    dispatch({ type: TEXT_ANNOUNCE_LIST_REQUEST })

    const { data } = await axios.get(`/api/announces/textAnnounce`)

    dispatch({
      type: TEXT_ANNOUNCE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TEXT_ANNOUNCE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTextAnnounce = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEXT_ANNOUNCE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/announces/textAnnounce`, config)

    dispatch({
      type: TEXT_ANNOUNCE_DELETE_SUCCESS,
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
      type: TEXT_ANNOUNCE_DELETE_FAIL,
      payload: message,
    })
  }
}