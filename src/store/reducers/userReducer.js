const defaultState = {
  isLogIn: false,
  user: {},
}
  
const LOG_IN = 'LOG_IN'
const SET_USER = 'SET_USER'
const UPDATE_USER_DATA = 'UPDATE_USER_DATA'
  
const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLogIn: action.payload,
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case UPDATE_USER_DATA:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
  
export const loginAction = (payload) => ({ type: LOG_IN, payload })
export const setUser = (payload) => ({
  type: SET_USER,
  payload,
})
  
export const updateUserDataAction = (payload) => ({
  type: UPDATE_USER_DATA,
  payload,
})

export default userReducer