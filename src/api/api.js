const config = {
  baseUrl: 'https://api.react-learning.ru',
  groupId: '/v2/group-12',
}
const onResponse = (res) => {
  return res.ok ? res.json() : res.json().then(res => Promise.reject(res))
}

const freshHeaders = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('token')
    }
  }
};

class Api {
  constructor(data, freshHeaders) {
    this.baseUrl = data.baseUrl
    this.groupId = data.groupId
    this.freshHeaders = freshHeaders;

  }

  getProductList() {
    return fetch(`${this.baseUrl}/products`, {
      method: "GET",
      ...this.freshHeaders(),
    }).then(onResponse)
  }

  getAllUsers() {
    return fetch(`${this.baseUrl}/users`, {
      method: "GET",
      ...this.freshHeaders(),
    }).then(onResponse)
  }

  getUserMe() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      ...this.freshHeaders(),
    }).then(onResponse)
  }

  uppdateUserMe(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      ...this.freshHeaders(),
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  uppdateUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      ...this.freshHeaders(),
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  searchProduct(path) {
    return fetch(`${this.baseUrl}/products/search?query=${path}`, {
      method: "GET",
      ...this.freshHeaders(),
    }).then(onResponse)
  }

  addLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      method: "PUT",
      ...this.freshHeaders(),
    }).then(onResponse)
  }

  deleteLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      method: "DELETE",
      ...this.freshHeaders(),
    }).then(onResponse)
  }

  getProductId(productId) {
    return fetch(`${this.baseUrl}/products/${productId}`, {
      method: "GET",
      ...this.freshHeaders(),
    }).then(onResponse)
  }

  addProductReviews(productId, data) {
    return fetch(`${this.baseUrl}/products/review/${productId}`, {
      method: "POST",
      ...this.freshHeaders(),
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  deleteProductReviews(productId, reviewId) {
    return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
      method: "DELETE",
      ...this.freshHeaders(),
    }).then(onResponse)
  }

  getProductIdAll(productId) {
    return fetch(`${this.baseUrl}/products/review/${productId}`, {
      method: "GET",
      ...this.freshHeaders(),
    }).then(onResponse)
  }

  addUserAuthorization(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      ...this.freshHeaders(),
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  addUserRegistration(data) {
    return fetch(`${this.baseUrl}/signup `, {
      method: "POST",
      ...this.freshHeaders(),
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  addPasswordReset(data) {
    return fetch(`${this.baseUrl}/forgot-password `, {
      method: "POST",
      ...this.freshHeaders(),
      body: JSON.stringify(data)
    }).then(onResponse)
  }

  addPasswordResetToken(data, token) {
    return fetch(`${this.baseUrl}/password-reset/${token} `, {
      method: "PATCH",
      ...this.freshHeaders(),
      body: JSON.stringify(data)
    }).then(onResponse)
  }



}

export const api = new Api(config, freshHeaders);
