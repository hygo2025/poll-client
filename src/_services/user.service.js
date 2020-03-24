import { authHeader } from '../_helpers'
import { baseUrl } from '../_utils/vars'
import { handleResponse } from '../_helpers'

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  createPoll,
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }

  return fetch(`${baseUrl}/oauth/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))

      return user
    })
}

function logout() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
  }

  try {
    if (localStorage.getItem('user')) {
      return fetch(`${baseUrl}/oauth/logout`, requestOptions).then(() => {
        localStorage.removeItem('user')
      })
    }
  } catch (error) {
    localStorage.removeItem('user')
  }

  return null
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${baseUrl}/users`, requestOptions).then(handleResponse)
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${baseUrl}/users/${id}`, requestOptions).then(handleResponse)
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }

  return fetch(`${baseUrl}/users`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))

      return user
    })
}

function createPoll(title, fields) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title,
      options: fields,
    }),
  }

  return fetch(`${baseUrl}/polls`, requestOptions)
    .then(handleResponse)
    .then(poll => {
      return poll
    })
}
