import React from 'react';
import { format } from 'date-fns';
const NewsComponent = ({ news }) => {
  return (
    <div
      style={{
        width: '300px',
        height: '68px',
        border: '3px solid black',
        borderRadius: '4px',
        padding: '8px',
        margin: '8px',
        display: 'flex',
      }}
    >
      <div style={{ width: '80%' }}>
        {news.title}
        <p>{format(new Date(news.date), 'MM/dd/yyyy')}</p>
      </div>
      <div>
        <span style={{ cursor: 'pointer' }}>Подробнее</span>
      </div>
    </div>
  );
};

export default NewsComponent;
