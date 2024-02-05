class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }
  _getToken() {
    return localStorage.getItem('token');
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status} ${response.statusText}`);
    }
  }

  // /users/me
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {...this._headers, 
        authorization: `Bearer ${this._getToken()}`},
      method: 'GET'
    })
      .then((response) => this._checkResponse(response))
  }

  // /users/me
  setUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      headers: {...this._headers, 
        authorization: `Bearer ${this._getToken()}`},
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((response) => this._checkResponse(response))
  }

  // /cards
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {...this._headers, 
        authorization: `Bearer ${this._getToken()}`},
      method: 'GET'
    })
      .then((response) => this._checkResponse(response))
  }

  // /cards
  addCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      headers: {...this._headers, 
        authorization: `Bearer ${this._getToken()}`},
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((response) => this._checkResponse(response))
  }

  // /cards/*cardID*
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: {...this._headers, 
        authorization: `Bearer ${this._getToken()}`},
      method: 'DELETE'
    })
    .then((response) => this._checkResponse(response))
  }

  // /cards/*cardID*/likes
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: {...this._headers, 
        authorization: `Bearer ${this._getToken()}`},
      method: isLiked ? 'DELETE' : 'PUT'
    })
    .then((response) => this._checkResponse(response))
  }

  // /users/me/avatar
  changeAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {...this._headers, 
        authorization: `Bearer ${this._getToken()}`},
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((response) => this._checkResponse(response))
  }
}

const api = new Api({
  url: 'https://api.plasticworld.nomoredomainswork.ru',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;