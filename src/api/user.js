import { checkResponseStatus } from './articles'

export async function fetchSignUp(body) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  }
  const response = await fetch('https://blog.kata.academy/api/users', options)
  const json = await response.json()
  return json
}

export async function fetchSignIn(body) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  }
  const response = await fetch(
    'https://blog.kata.academy/api/users/login',
    options,
  )
  const json = await response.json()
  return json
}

export async function fetchEditProfile(body, token) {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  }
  const response = await fetch('https://blog.kata.academy/api/user', options)
  if (!response.ok) {
    return checkResponseStatus(response)
  }
  const json = await response.json()
  return json
}

export async function fetchGetProfile(token) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: null,
  }
  const response = await fetch('https://blog.kata.academy/api/user', options)
  if (!response.ok) {
    return checkResponseStatus(response)
  }
  const json = await response.json()
  return json
}