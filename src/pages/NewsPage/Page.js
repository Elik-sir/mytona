import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { getNews } from '../../redux/news/actions';
import NewsComponent from '../../components/NewsComponent';
import Pagination from '@material-ui/lab/Pagination';

const NewsPage = ({ getCurrentNews, news }) => {
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(1);
  const getNews = useCallback(() => {
    fetch('http://localhost:3001/news', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numberNews: page,
      }),
    })
      .then((response) => response.json())
      .then((news) => {
        if (news.length > 0) getCurrentNews(news);
      });
  }, [getCurrentNews, page]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    fetch('http://localhost:3001/newscount')
      .then((response) => response.json())
      .then((data) => {
        setCountPage(Math.ceil(data[0].count / 3));
      });

    getNews();
  }, [getNews, setCountPage]);
  return (
    <div>
      <h1>Новости</h1>
      <div
        style={{
          display: 'flex',
          width: '350px',
          marginLeft: 'auto',
          marginRight: 'auto',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {news.map((oneOfNew, id) => (
          <NewsComponent news={oneOfNew} key={id} />
        ))}
        <Pagination count={countPage} page={page} onChange={handleChange} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  news: state.news.listOfNews,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrentNews: (news) => dispatch(getNews(news)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
