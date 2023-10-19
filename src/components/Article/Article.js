import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import uniqid from 'uniqid'

import './Article.scss'

import { fetchAddFavoriteArticle, fetchDeleteFavoriteArticle } from '../../api/articles'
import { selectIsLogIn } from '../../store/selectors/selectors'

const Article = ({ item }) => {
  const {
    title,
    author,
    description,
    tagList,
    createdAt,
    favorited: initialFavorited,
    favoritesCount: initialFavoritesCount,
    body,
    slug,
  } = item

  const [favorited, setFavorited] = useState(initialFavorited)
  const [favoritesCount, setFavoritesCount] = useState(initialFavoritesCount)
  const isLoginIn = useSelector(selectIsLogIn)

  const favoriteArticle = () => {
    const token = JSON.parse(localStorage.getItem('currentUser'))
    if (isLoginIn) {
      if (favorited) {
        fetchDeleteFavoriteArticle(slug, token)
      } else {
        fetchAddFavoriteArticle(slug, token)
      }
      setFavorited(!favorited)
      setFavoritesCount(favorited ? favoritesCount - 1 : favoritesCount + 1)
    }
  }

  return (
    <div className="article">
      <ul className="column-one">
        <ul className="column-one-box">
          <Link to={`/article/${slug}`}>
            <li className="article__title">{title}</li>
          </Link>
          <ul className="column-two">
            <li>
              <button type="button" className="article__like" onClick={favoriteArticle}>
                {favorited ? <span>❤️️</span> : <span>🤍</span>}
                {favoritesCount}
              </button>
            </li>
            <ul className="column-box">
              <li className="article__username">{author.username}</li>
              <li className="article__date">{format(parseISO(createdAt), 'MMMM d, y')}</li>
            </ul>
            <img src={author.image} alt="" className="article__img" />
          </ul>
        </ul>
        <li className="article__tag">
          {tagList.map((item) => (
            <span key={uniqid()} className="tag-name">
              {item}
            </span>
          ))}
        </li>
        <span className="article__description">{description}</span>
        <span className="article__body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </span>
      </ul>
    </div>
  )
}

export default Article
