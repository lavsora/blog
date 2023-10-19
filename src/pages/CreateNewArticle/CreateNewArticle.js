import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'
import uniqid from 'uniqid'

import { fetchArticleCreate } from '../../api/articles'

import './CreateNewArticle.scss'

const CreateNewArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [primitiveString, setPrimitiveString] = useState({ tag: '' })
  const history = useNavigate()

  const submitForm = (data) => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem('currentUser'))
    fetchArticleCreate({ article: { ...data, tagList: tags } }, token).then(
      (response) => {
        history(`/article/${response.article.slug}`)
      },
    )
    setIsLoading(false)
  }

  const handleAddTag = (tag) => {
    if (!primitiveString.tag.trim()) {
      return
    }
    setTags([...tags, tag])
  }

  const handleDeleteTag = (index) => {
    const newTags = tags.filter((_, ind) => ind !== index)
    setTags(newTags)
  }

  return (
    <div className='wrapper-form'>
      <div className='form-container'>
        <span className='form__name'>Create new article</span>
        <form
          className='form'
          id='article-create-form'
          onSubmit={handleSubmit(submitForm)}
        >
          <label className='form__label'>
            Title
            <input
              type='text'
              className='form__input'
              placeholder='Title'
              {...register('title', {
                required: 'empty',
              })}
            />
            {errors.title && (
              <span className='form__message' style={{ color: 'red' }}>
                {errors.title.message}
              </span>
            )}
          </label>
          <label className='form__label'>
            Short description
            <input
              type='text'
              className='form__input'
              placeholder='Short description'
              {...register('description', {
                required: 'empty',
              })}
            />
            {errors.description && (
              <span className='form__message' style={{ color: 'red' }}>
                {errors.description.message}
              </span>
            )}
          </label>
          <label className='form__label'>
            Text
            <input
              type='text'
              className='form__input'
              placeholder='Text'
              {...register('body', {
                required: 'empty',
              })}
            />
            {errors.body && (
              <span className='form__message' style={{ color: 'red' }}>
                {errors.body.message}
              </span>
            )}
          </label>
        </form>
        <form
          className='form tag'
          onSubmit={(evt) => {
            evt.preventDefault()
            handleAddTag(evt.target.tag.value)
            evt.target.tag.value = ''
          }}
        >
          <label className='form__label tag'>
            Tags
            <input
              type='text'
              name='tag'
              className='form__input'
              placeholder='Tag'
              onChange={(e) => {
                const trimmedValue = e.target.value.trim()
                setPrimitiveString({ tag: trimmedValue })
              }}
              required
            />
          </label>
          <input className='button tag' type='submit' value='Add tag' />
        </form>
        {tags.map((item, ind) => (
          <div className='tags' key={uniqid()}>
            <span className='tags__name'>{item}</span>
            <button
              className='tags__button'
              type='button'
              onClick={() => handleDeleteTag(ind)}
            >
              Delete
            </button>
          </div>
        ))}
        <input
          className='button'
          type='submit'
          value='Send'
          form='article-create-form'
        />
        {isLoading && <LinearProgress color='secondary' />}
      </div>
    </div>
  )
}

export default CreateNewArticle