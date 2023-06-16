const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQzZTRmZjMyOTFkNzkwYjNmZmEzZjciLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMTcxMzY5LCJleHAiOjE3MTM3MDczNjl9.J1ZspeME8W1X2jvmHzvSBo3owrruATl8z6pQ9wuS7lk",
    'Content-Type': 'application/json'
  },
  groupId: '/v2/group-12'
}

const onResponse = (res) => {
  return res.ok ? res.json() : res.json().then(res => Promise.reject(res))
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
    }).then(onResponse)
  }

  getAllUsers() {
    return fetch(`${this.baseUrl}/users`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse)
  }

  getUserMe() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse)
  }

  uppdateUserMe(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  uppdateUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  searchProduct(path) {
    return fetch(`${this.baseUrl}/products/search?query=${path}`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse)
  }

  addLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      method: "PUT",
      headers: this.headers,
    }).then(onResponse)
  }

  deleteLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(onResponse)
  }

  getProductId(productId) {
    return fetch(`${this.baseUrl}/products/${productId}`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse)
  }

  addProductReviews(productId, data) {
    return fetch(`${this.baseUrl}/products/review/${productId}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  deleteProductReviews(productId, reviewId) {
    return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(onResponse)
  }

  getProductIdAll(productId) {
    return fetch(`${this.baseUrl}/products/review/${productId}`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse)
  }

  addUserAuthorization(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  addUserRegistration(data) {
    return fetch(`${this.baseUrl}/signup `, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  addPasswordReset(data) {
    return fetch(`${this.baseUrl}/forgot-password `, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  addPasswordResetToken(data, token) {
    return fetch(`${this.baseUrl}/password-reset/${token} `, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(onResponse)
  }



}

export const api = new Api(config);
