import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './pages/MainPage/Page';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { connect } from 'react-redux';
import Header from './components/header';
import NewsPage from './pages/NewsPage/Page';
import NewsInfoPage from './pages/NewsInfoPage/NewsInfoPage';
import NotFoundPage from './pages/NotFoundPage/Page';
import './App.css';

const App = ({ user }) => {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route
          exact
          path='/'
          render={() => (user ? <MainPage /> : <Redirect to='/signin' />)}
        />
        <Route
          path='/signin'
          render={() => (user ? <Redirect to='/' /> : <Signin />)}
        />
        <Route
          path='/signup'
          render={() => (user ? <Redirect to='/' /> : <Signup />)}
        />
        <Route
          exact
          path='/news'
          render={() => (user ? <NewsPage /> : <Redirect to='/signin' />)}
        />
        <Route
          path='/news/:newsId'
          render={() => (user ? <NewsInfoPage /> : <Redirect to='/signin' />)}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});
export default connect(mapStateToProps)(App);
