import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'
import uniqid from 'uniqid'

import { fetchArticle, fetchEditArticle } from '../../api/articles'

const EditArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const [isLoading, setIsLoading] = useState(false)
  const [primitiveString, setPrimitiveString] = useState({ tag: '' })
  const [editArticle, setEditArticle] = useState()
  const [tags, setTags] = useState([])

  const { slug } = useParams()
  const history = useNavigate()

  useEffect(() => {
    fetchArticle(slug).then((body) => {
      setEditArticle(body)
      setTags([...body.article.tagList])
    })
  }, [slug])

  if (!editArticle) {
    return <LinearProgress color="secondary" />
  }

  const { title, description, body } = editArticle.article

  const submitForm = async (data) => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem('currentUser'))
    await fetchEditArticle({ article: { ...data, tagList: tags } }, token, slug)
    history(`/article/${slug}`)
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
    <div className={`wrapper-form ${isLoading ? 'active' : ''}`}>
      <div className="form-container">
        <span>Edit article</span>
        <form id="article-create-form" className="form" onSubmit={handleSubmit(submitForm)}>
          <label className="form__label">
            Title
            <input
              {...register('title', {
                required: 'empty',
              })}
              type="text"
              className="form__input"
              placeholder="Title"
              name="title"
              disabled={isLoading}
              defaultValue={title}
            />
            {errors.title && (
              <span className="form__message" style={{ color: 'red' }}>
                {errors.title.message}
              </span>
            )}
          </label>
          <label className="form__label">
            Short description
            <input
              {...register('description', {
                required: 'empty',
              })}
              type="text"
              className="form__input"
              placeholder="Short description"
              disabled={isLoading}
              defaultValue={description}
            />
            {errors.description && (
              <span className="form__message" style={{ color: 'red' }}>
                {errors.description.message}
              </span>
            )}
          </label>
          <label className="form__label">
            Text
            <textarea
              type="text"
              className="form__input"
              placeholder="Text"
              {...register('body', {
                required: 'empty',
              })}
              disabled={isLoading}
              defaultValue={body}
            />
            {errors.body && (
              <span className="form__message" style={{ color: 'red' }}>
                {errors.body.message}
              </span>
            )}
          </label>
        </form>
        <form
          className="form tag"
          onSubmit={(evt) => {
            evt.preventDefault()
            handleAddTag(evt.target.tag.value)
            evt.target.tag.value = ''
          }}
        >
          <label className="form__label tag">
            Tags
            <input
              name="tag"
              type="text"
              className="form__input"
              placeholder="Tag"
              onChange={(e) => {
                const trimmedValue = e.target.value.trim()
                setPrimitiveString({ tag: trimmedValue })
              }}
              required
              disabled={isLoading}
            />
          </label>
          <button className="button tag" type="submit">
            Add tag
          </button>
        </form>
        {tags.map((item, ind) => (
          <div className="tags" key={uniqid()}>
            <span className="tags__name">{item}</span>
            <button className="tags__button" type="button" onClick={() => handleDeleteTag(ind)}>
              Delete
            </button>
          </div>
        ))}
        <button form="article-create-form" className="button" type="submit" disabled={isLoading}>
          Send
        </button>
        {isLoading && <LinearProgress color="secondary" />}
      </div>
    </div>
  )
}

export default EditArticle
