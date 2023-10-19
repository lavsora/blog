import { addArticlesAction } from '../store/reducers/articleReducer'

export const checkResponseStatus = async (response) => {
  if (!response.ok) {
    throw new Error(`Could not fetch, received ${response.status}`)
  }
  return response.json()
}

export const fetchArticles = (offset, token) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: null,
  }
  return (dispatch) =>
    fetch(
      `https://blog.kata.academy/api/articles?offset=${offset}&limit=5`,
      options,
    )
      .then((response) => response.json())
      .then((json) => dispatch(addArticlesAction(json)))
      .catch((err) => {
        throw new Error(`Could not fetch, received ${err}`)
      })
}

export const fetchArticle = async (slug, token) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: null,
  }
  const response = await fetch(
    `https://blog.kata.academy/api/articles/${slug}`,
    options,
  )
  if (!response.ok) {
    return checkResponseStatus(response)
  }
  const json = await response.json()

  return json
}

export const fetchArticleCreate = async (data, token) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }

  const response = await fetch(
    'https://blog.kata.academy/api/articles',
    options,
  )
  if (!response.ok) {
    return checkResponseStatus(response)
  }
  const json = await response.json()

  return json
}

export const fetchEditArticle = async (data, token, slug) => {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }

  const response = await fetch(
    `https://blog.kata.academy/api/articles/${slug}`,
    options,
  )
  if (!response.ok) {
    return checkResponseStatus(response)
  }
  const json = await response.json()
  return json
}

export const fetchDeleteArticle = async (slug, token) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  }
  try {
    await fetch(`https://blog.kata.academy/api/articles/${slug}`, options)
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`)
  }
}

export const fetchAddFavoriteArticle = async (slug, token) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  }

  try {
    await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      options,
    )
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`)
  }
}

export const fetchDeleteFavoriteArticle = async (slug, token) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  }
  try {
    await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      options,
    )
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`)
  }
}