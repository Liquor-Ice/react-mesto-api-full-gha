import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();
  

  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm 
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      valid={true}
      buttonText="Создать"
    >
      <input 
      id="place-input"
      className="popup__input popup__input_type_place"
      name="name"
      ref={nameRef}
      placeholder="Название"
      type="text"
      minLength="2"
      maxLength="30"
      required
      />
      <span className="form__input-error place-input-error"></span>
      <input
      id="link-input"
      className="popup__input popup__input_type_link"
      name="link"
      ref={linkRef}
      placeholder="Ссылка на картинку"
      type="url"
      required
      />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  )
};

export default AddPlacePopup;