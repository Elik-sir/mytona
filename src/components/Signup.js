import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/user/actions';

const Signup = ({ SignUpUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitSignup = (email, password) => {
    fetch('http://localhost:3001/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          SignUpUser(user);
        }
      })
      .catch((err) => alert('пользователь существует или ошибка сервера'));
  };
  return (
    <div>
      <h1>Email</h1>
      <input type='email' onChange={(e) => setEmail(e.target.value)} />
      <h1>password</h1>
      <input type='password' onChange={(e) => setPassword(e.target.value)} />
      <h1>Confirm password</h1>
      <input type='password' />
      <br />
      <button onClick={() => onSubmitSignup(email, password)}>
        Зарегистрироваться
      </button>
      <button>
        <Link to='/signin' style={{ color: 'black', textDecoration: 'none' }}>
          Авторизоваться
        </Link>
      </button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  SignUpUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(Signup);
