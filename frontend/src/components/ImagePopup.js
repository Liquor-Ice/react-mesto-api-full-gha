
function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card.link && 'popup_opened'}`} aria-label="Фото">
      <div className="popup__container popup__image-container">
        <button className="popup__close page__button" type="button" onClick={onClose} aria-label="закрыть фото" />
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__subtitle">{card.name}</h2>
      </div>
    </div>
  )
};

export default ImagePopup;