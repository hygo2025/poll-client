import { authHeader } from '../_helpers'
import { baseUrl } from '../_utils/vars'
import { handleResponse } from '../_helpers'

const createPoll = (title, fields, id) => {
  const requestOptions = {
    method: id ? 'PATCH' : 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title,
      options: (fields || []).map(s => s.value),
    }),
  }
  const url = id ? `${baseUrl}/public/polls/${id}` : `${baseUrl}/public/polls`

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(poll => {
      return poll
    })
}

const answerPoll = (pollId, answerId) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  }

  return fetch(
    `${baseUrl}/public/polls/${pollId}/answers/${answerId}`,
    requestOptions,
  )
    .then(handleResponse)
    .then(answer => {
      return answer
    })
}

const get = id => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  return fetch(`${baseUrl}/public/polls/${id}`, requestOptions)
    .then(handleResponse)
    .then(poll => {
      return poll
    })
}

const getToAssociate = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  }

  return fetch(`${baseUrl}/polls`, requestOptions)
    .then(handleResponse)
    .then(polls => {
      return polls
    })
}

const getAll = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  }

  return fetch(`${baseUrl}/polls/me`, requestOptions)
    .then(handleResponse)
    .then(polls => {
      return polls
    })
}

const graph = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  }

  return fetch(`${baseUrl}/polls/me/graph`, requestOptions)
    .then(handleResponse)
    .then(polls => {
      return polls
    })
}

const associate = ids => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pollIds: ids,
    }),
  }
  debugger
  return fetch(`${baseUrl}/polls/associate`, requestOptions)
    .then(handleResponse)
    .then(polls => {
      return polls
    })
}

export const pollService = {
  createPoll,
  get,
  answerPoll,
  getToAssociate,
  associate,
  getAll,
  graph,
}
