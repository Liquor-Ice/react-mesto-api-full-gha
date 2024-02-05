import React, {useState} from 'react';

function Form({title, onSubmit, buttonText}) {
  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  return (
    <form className='form' onSubmit={onSubmit(formValue)}>
      <h1 className='form__title'>{title}</h1>
      <input className='form__input' id='email' name='email' type='email' value={formValue.email} onChange={handleChange} placeholder='Email' required />
      <input className='form__input' id='password' name='password' type='password' value={formValue.password} onChange={handleChange} placeholder='Пароль' required />
      <button className='form__button' type='submit' >{buttonText}</button>
    </form>
  )
}

export default Form;