import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNews } from '../../redux/news/actions';
import NewsComponent from '../../components/NewsComponent';
const NewsPage = ({ getCurrentNews, news }) => {
  useEffect(() => {
    fetch('http://localhost:3001/news', {
      method: 'post',
      header: { 'Content-Type': 'application:json' },
      body: JSON.stringify({
        numberNews: 1,
      }),
    })
      .then((response) => response.json())
      .then((news) => {
        if (news.length > 0) getCurrentNews(news);
        console.log(news);
      });
  }, [getCurrentNews]);
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
