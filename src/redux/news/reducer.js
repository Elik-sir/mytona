import { GET_NEWS, GET_CURRENT_NEWS } from './constants';

const defaultState = {
  listOfNews: [],
  currentNews: {},
};

const newsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return { ...state, listOfNews: action.payload };
    case GET_CURRENT_NEWS:
      return { ...state, currentNews: action.payload };
    default:
      return state;
  }
};

export default newsReducer;
