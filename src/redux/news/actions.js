import { GET_NEWS, GET_CURRENT_NEWS } from './constants';

export const getNews = (news) => ({
  type: GET_NEWS,
  payload: news,
});

export const getCurrentNews = (news) => ({
  type: GET_CURRENT_NEWS,
  payload: news,
});
