import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/user/actions';
const Signin = ({ SignInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitSignIn = (email, password) => {
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          SignInUser(user);
        } else alert('123');
      });
  };
  return (
    <div>
      <h1>Email</h1>
      <input type='email' onChange={(e) => setEmail(e.target.value)} />
      <h1>Пароль</h1>
      <input type='password' onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={() => onSubmitSignIn(email, password)}>Войти</button>
      <button>
        <Link to='/signup' style={{ color: 'black', textDecoration: 'none' }}>
          Регистрация
        </Link>
      </button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  SignInUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(Signin);
