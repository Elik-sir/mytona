import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const styles = {
  textDecoration: 'none',
  color: 'black',
  display: 'inline-block',
  margin: '8px',
};
const Header = ({ user }) => (
  <div>
    {user && (
      <div>
        <Link to='/' style={styles}>
          Главная
        </Link>
        <Link to='/news' style={styles}>
          Новости
        </Link>
      </div>
    )}
  </div>
);
const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});
export default connect(mapStateToProps)(Header);
