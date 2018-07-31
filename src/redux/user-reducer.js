// ACTION TYPES
const USER_REQUEST = 'user/REQUEST'
const USER_SUCCESS = 'user/SUCCESS'
const USER_FAIL = 'user/FAIL'
const USER_UPDATE = 'user/UPDATE'

// THE REDUCER
const initialState = {
  counter: 1,
  users: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })

    case USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        counter: state.counter + 1,
        users: [
          ...state.users,
          {
            id: state.counter,
            ...action.newUser
          }
        ]
      })

    case USER_FAIL:
      return Object.assign({}, state, {
        loading: false,
      })

    case USER_UPDATE:
      return Object.assign({}, state, {
        loading: false,
        users: state.users.map((user) => {
          if (user.id === action.updateUser.id) {
            return action.updateUser
          }

          return user
        })
      })

    default:
      return state;
  }
}

// ACTION
export const userRequest = () => ({
  type: USER_REQUEST,
})

export const userSuccess = (newUser) => ({
  type: USER_SUCCESS,
  newUser
})

export const userFail = () => ({
  type: USER_FAIL,
})

export const userUpdate = (updateUser) => ({
  type: USER_UPDATE,
  updateUser
})

// SELECTOR
export const userSelector = (state, name) => state.userReducer[name];
