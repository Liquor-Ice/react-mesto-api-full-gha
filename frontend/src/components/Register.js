import React from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

function Register({onRegister}) {
  
  const handleSubmit = ({password, email}) => (e) => {
    e.preventDefault();
    onRegister({password, email})
      .catch(console.error)
  }

  return (
    <div className='register page__small-container'>
      <Form title='Регистрация' onSubmit={handleSubmit} buttonText='Зарегистрироваться' />
      <p className='register__subtitle'>Уже зарегистрированы? <Link to='sign-in' className='page__link page__button'>Войти</Link></p>
    </div>
  )
}

export default Register;