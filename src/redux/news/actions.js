import { GET_NEWS } from './constants';

export const getNews = (news) => ({
  type: GET_NEWS,
  payload: news,
});
