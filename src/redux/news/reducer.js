import { GET_NEWS } from './constants';

const defaultState = {
  news: [],
};

const newsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return { ...state, news: action.payload };
    default:
      return state;
  }
};

export default newsReducer;
