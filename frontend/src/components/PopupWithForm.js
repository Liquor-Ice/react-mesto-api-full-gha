function PopupWithForm({title, name, children, isOpen, onClose, onSubmit, valid, buttonText}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} aria-label={title}>
      <div className="popup__container">
        <button className="popup__close page__button" type="button" onClick={onClose} aria-label="закрыть форму" />
        <h2 className="form__title">{title}</h2>
        <form action="#" className="popup__form" name={name} onSubmit={onSubmit} method="post">
          {children}
          <button className={`popup__button ${(!valid || false) && "popup__button_disabled"} page__button`} type="submit" aria-label={buttonText} disabled={(!valid || false)}>{buttonText}</button>
        </form>
      </div>
    </div>
  )
};

export default PopupWithForm;