import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentNews } from '../../redux/news/actions';
const NewsInfoPage = ({ getCurrentNews, currentNews }) => {
  let { newsId } = useParams();
  useEffect(() => {
    fetch('http://localhost:3001/newsinfo', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newsId,
      }),
    })
      .then((response) => response.json())
      .then((news) => {
        if (news.length) getCurrentNews(news[0]);
        console.log(news);
      });
  }, [getCurrentNews, newsId]);
  return (
    <div>
      <h1>Новость </h1>
      <h2>{currentNews.info}</h2>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentNews: state.news.currentNews,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrentNews: (news) => dispatch(getCurrentNews(news)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewsInfoPage);
