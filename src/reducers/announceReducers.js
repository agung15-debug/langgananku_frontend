import {
  ANNOUNCE_LIST_REQUEST,
  ANNOUNCE_LIST_SUCCESS,
  ANNOUNCE_LIST_FAIL,
  ANNOUNCE_DETAILS_REQUEST,
  ANNOUNCE_DETAILS_SUCCESS,
  ANNOUNCE_DETAILS_FAIL,
  ANNOUNCE_DELETE_REQUEST,
  ANNOUNCE_DELETE_SUCCESS,
  ANNOUNCE_DELETE_FAIL,
  ANNOUNCE_CREATE_RESET,
  ANNOUNCE_CREATE_FAIL,
  ANNOUNCE_CREATE_SUCCESS,
  ANNOUNCE_CREATE_REQUEST,
  ANNOUNCE_UPDATE_REQUEST,
  ANNOUNCE_UPDATE_SUCCESS,
  ANNOUNCE_UPDATE_FAIL,
  ANNOUNCE_UPDATE_RESET,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_LIST_FAIL,
  TEXT_ANNOUNCE_CREATE_REQUEST,
  TEXT_ANNOUNCE_CREATE_RESET,
  TEXT_ANNOUNCE_CREATE_FAIL,
  TEXT_ANNOUNCE_CREATE_SUCCESS,
  TEXT_ANNOUNCE_LIST_REQUEST,
  TEXT_ANNOUNCE_LIST_SUCCESS,
  TEXT_ANNOUNCE_LIST_FAIL,
  TEXT_ANNOUNCE_DELETE_REQUEST,
  TEXT_ANNOUNCE_DELETE_SUCCESS,
  TEXT_ANNOUNCE_DELETE_FAIL,
} from '../constants/announceConstants'

export const announceListReducer = (state = { announces: [] }, action) => {
  switch (action.type) {
    case ANNOUNCE_LIST_REQUEST:
      return { loading: true, announces: [] }
    case ANNOUNCE_LIST_SUCCESS:
      return {
        loading: false,
        announces: action.payload.announces,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case ANNOUNCE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const announceDetailsReducer = (
  state = { announce: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ANNOUNCE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ANNOUNCE_DETAILS_SUCCESS:
      return { loading: false, announce: action.payload }
    case ANNOUNCE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const announceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCE_DELETE_REQUEST:
      return { loading: true }
    case ANNOUNCE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ANNOUNCE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const announceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCE_CREATE_REQUEST:
      return { loading: true }
    case ANNOUNCE_CREATE_SUCCESS:
      return { loading: false, success: true, announce: action.payload }
    case ANNOUNCE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ANNOUNCE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const announceUpdateReducer = (state = { announce: {} }, action) => {
  switch (action.type) {
    case ANNOUNCE_UPDATE_REQUEST:
      return { loading: true }
    case ANNOUNCE_UPDATE_SUCCESS:
      return { loading: false, success: true, announce: action.payload }
    case ANNOUNCE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ANNOUNCE_UPDATE_RESET:
      return { announce: {} }
    default:
      return state
  }
}

export const bannerListReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case BANNER_LIST_REQUEST:
      return { loading: true, banners: [] }
    case BANNER_LIST_SUCCESS:
      return { loading: false, banners: action.payload }
    case BANNER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const textAnnounceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEXT_ANNOUNCE_CREATE_REQUEST:
      return { loading: true }
    case TEXT_ANNOUNCE_CREATE_SUCCESS:
      return { loading: false, success: true, textAnnounce: action.payload }
    case TEXT_ANNOUNCE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case TEXT_ANNOUNCE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const textAnnounceListReducer = (state = { textAnnounce: [] }, action) => {
  switch (action.type) {
    case TEXT_ANNOUNCE_LIST_REQUEST:
      return { loading: true, textAnnounce: [] }
    case TEXT_ANNOUNCE_LIST_SUCCESS:
      return { loading: false, textAnnounce: action.payload }
    case TEXT_ANNOUNCE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const textAnnounceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEXT_ANNOUNCE_DELETE_REQUEST:
      return { loading: true }
    case TEXT_ANNOUNCE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TEXT_ANNOUNCE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}