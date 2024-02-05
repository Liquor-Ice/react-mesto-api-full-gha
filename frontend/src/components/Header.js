import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



function Header({onLogout}) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();
  const SwitchHeader = () => {
    switch(location.pathname) {
      case "/signin":
        return(
          <Link className="page__button page__link" to="/signup">Регистрация</Link>
        );
        break;
      case "/signup":
        return(
          <Link className="page__button page__link" to="/signin">Войти</Link>
        );
        break;
      default:
        return(
          <>
            <p className="header__user">{currentUser.email}<Link onClick={onLogout} className="page__button page__link header__logout" to="/signin">Выйти</Link></p>
            
          </>
        );
    }
  };

  return (
    <header className="header page__container">
      {SwitchHeader()}
    </header>
  )
};

export default Header;