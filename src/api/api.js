const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQzZTRmZjMyOTFkNzkwYjNmZmEzZjciLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMTcxMzY5LCJleHAiOjE3MTM3MDczNjl9.J1ZspeME8W1X2jvmHzvSBo3owrruATl8z6pQ9wuS7lk",
    'Content-Type': 'application/json'
  },
  groupId: '/v2/group-12'
}

class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl
    this.headers = data.headers
    this.groupId = data.groupId
  }

  getProductList() {
    return fetch(`${this.baseUrl}/products`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject('что-то пошло не так, данные не получены')
    })
  }

  getAllUsers() {
    return fetch(`${this.baseUrl}/users`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject('что-то пошло не так, данные не получены')
    })
  }

  getUserMe() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject('что-то пошло не так, данные не получены')
    })
  }

  searchProduct(path) {
    return fetch(`${this.baseUrl}/products/search?query=${path}`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject('что-то пошло не так, данные не получены')
    })
  }

  addLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject('что-то пошло не так, данные не получены')
    })
  }

  deleteLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject('что-то пошло не так, данные не получены')
    })
  }

  getProductId(productId) {
    return fetch(`${this.baseUrl}/products/${productId}`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject('что-то пошло не так, данные не получены')
    })
  }



  // другие методы работы с API
}

export const api = new Api(config);
