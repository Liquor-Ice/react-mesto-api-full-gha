import React from 'react';
import {useNavigate} from 'react-router-dom';
import Form from './Form';

function Login({onLogin}) {
  
  const navigate = useNavigate();

  const handleSubmit = ({password, email}) => (e) => {
    e.preventDefault();
    onLogin({password, email}).then(res => {
      navigate('/')
    })
      .catch(console.error)
  }
  
  return (
    <div className='login page__small-container'>
      <Form title='Вход' onSubmit={handleSubmit} buttonText='Войти' />
    </div>
  )
}

export default Login;