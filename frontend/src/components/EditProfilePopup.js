import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameValid, setNameValid] = React.useState(Boolean(currentUser.name));
  const [descriptionValid, setDescriptionValid] = React.useState(Boolean(currentUser.about));
  
  const formValid = nameValid && descriptionValid;

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
    setNameValid(e.target.validity.valid);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    setDescriptionValid(e.target.validity.valid);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      valid={true}
      buttonText="Сохранить"
    >
      <input 
        id="name-input"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Имя"
        type="text"
        value={name || ''}
        onChange={handleNameChange}
        minLength="2"
        maxLength="40"
        required 
      />
      <span className="form__input-error name-input-error"></span>
      <input 
        id="about-input"
        className="popup__input popup__input_type_about"
        name="about"
        placeholder="О себе"
        type="text"
        value={description || ''}
        onChange={handleDescriptionChange}
        minLength="2"
        maxLength="200"
        required 
      />
      <span className="form__input-error about-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;