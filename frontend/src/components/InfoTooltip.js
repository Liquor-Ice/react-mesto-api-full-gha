import Hehe from "../images/Hehe.png";
import NotHehe from "../images/NotHehe.png"

function InfoTooltip({isOpen, onClose, status}) {

  return (
    <div className={`popup popup_type_info ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close page__button" type="button" onClick={onClose} aria-label="закрыть форму" />
        <div className="popup__info-image" style={{backgroundImage: `url(${status ? Hehe : NotHehe})`}} />
        <p className="popup__info-tip">{status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;