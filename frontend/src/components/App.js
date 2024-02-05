import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import ProtectedRouteElement from './ProtectedRoute';
import Footer from './Footer';
import InfoTooltip from './InfoTooltip';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import * as auth from '../utils/Auth'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTiptoolOpen, setIsInfoTiptoolOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'))
  const [loggedIn, setLoggedIn] = useState(loggedInFromStorage);
  const [regStatus, setRegStatus] = useState(false);

  const navigate = useNavigate();

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if(token) {
      auth.tokenCheck(token).then(res => {
        if(res) {
          setCurrentUser({...currentUser, email: res.email});
          setLoggedIn(true);
          navigate('/')
        }
      })
        .catch(console.error);
    }
  }
  
  React.useEffect(() => {
    handleTokenCheck();

    api.getUserInfo()
    .then(data => {
      setCurrentUser(data)
    })
    .catch(console.error);

    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch(console.error);
  }, []);

  function reportError() {
    setRegStatus(false);
    setIsInfoTiptoolOpen(true);
  }

  function handleLogin({password, email}) {
    return auth.authorize(password, email).then(res => {
      if(res.token) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('loggedIn', true)
        setCurrentUser({...currentUser, email: email});
        setLoggedIn(true);
        return res
      } else {
        reportError()
      }
    }).catch(reportError)
  }
  function handleRegister({password, email}) {
    return auth.register(password, email).then(res => {
      setRegStatus(true);
      setIsInfoTiptoolOpen(true);
    })
    .catch(reportError())
  }
  function handleLogout() {
    localStorage.setItem('token', '')
    localStorage.setItem('loggedIn', false)
    setCurrentUser({...currentUser, email: ''});
    setLoggedIn(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  };
  function handleUpdateUser(data) {
    api.setUserInfo(data).then((newData) => {
      setCurrentUser(newData);
      closeAllPopups();
    })
    .catch(console.error)
  };
  function handleUpdateAvatar(data) {
    api.changeAvatar(data).then((newData) => {
      setCurrentUser(newData);
      closeAllPopups();
    })
    .catch(console.error)
  }
  function handleAddPlaceSubmit(card) {
    api.addCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(console.error)
  };
  
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setIsInfoTiptoolOpen(false)
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(console.error);
  }
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
        setCards((state) => state.filter((c) => {return c._id !== card._id}));
    })
    .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={handleLogout}/>
        <main className="content page__container">
          <Routes>
            <Route path="/" element={<ProtectedRouteElement element={Main} 
              cards={cards}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}/>} />
            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
          </Routes>
        </main>
        
        <Footer />

        <InfoTooltip isOpen={isInfoTiptoolOpen} onClose={closeAllPopups} status={regStatus} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm 
          title="Вы уверены?"
          name="confirm"
          buttonText="Да"
        />
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
