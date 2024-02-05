import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}></div>
        <img src={currentUser.avatar} alt="аватарка" className="profile__avatar" />
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name page__overflow">{currentUser.name}</h1>
            <button className="profile__edit page__button" type="button" onClick={onEditProfile} aria-label="редактировать профиль"></button>
          </div>
          <p className="profile__about page__overflow">{currentUser.about}</p>
        </div>
        <button className="profile__add-button page__button" type="button" onClick={onAddPlace} aria-label="добавить место"></button>
      </section>
      <section className="elements" aria-label="Места">
        {cards.map((item) => (
          <Card 
            key={item._id} 
            card={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            baseClass="card__like page__button"
            activateClass="card__like_liked"
          />
        ))}
      </section>
    </>
  )
};

export default Main;