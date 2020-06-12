import { SET_CURRENT_USER } from './constants';

const defaultState = {
  currentUser: null,
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
