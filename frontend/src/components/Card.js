import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete, baseClass, activateClass}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `${baseClass} ${isLiked && activateClass}`
  );

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      {isOwn && <button className="card__delete page__button" type="button" onClick={handleDeleteClick} aria-label="удалить карточку" />}
      <div className="card__description">
        <h2 className="card__title page__overflow">{card.name}</h2>
        <div className="card__like-group">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} aria-label="нравится" />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
};

export default Card;