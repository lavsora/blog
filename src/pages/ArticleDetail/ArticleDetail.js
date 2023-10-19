import ReactMarkdown from 'react-markdown'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import uniqid from 'uniqid'

import {
  fetchAddFavoriteArticle,
  fetchArticle,
  fetchDeleteArticle,
  fetchDeleteFavoriteArticle,
} from '../../api/articles'
import { selectIsLogIn, selectUser } from '../../store/selectors/selectors'

import './ArticleDetail.scss'

const ArticleDetail = () => {
  const [articleDetail, setArticleDetail] = useState()
  const [isLiked, setFavorited] = useState()
  const [likeCount, setFavoritesCount] = useState()
  const [open, setOpen] = useState(false)

  const { slug } = useParams()
  const history = useNavigate()

  const user = useSelector(selectUser)
  const isLoginIn = useSelector(selectIsLogIn)

  const token = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(() => {
    fetchArticle(slug, token).then((body) => {
      setArticleDetail(body)
      setFavorited(body.article.favorited)
      setFavoritesCount(body.article.favoritesCount)
    })
  }, [slug, token])

  useEffect(() => {
    const handleClick = (e) => {
      e.preventDefault()
      history(-1)
    }

    window.addEventListener('popstate', handleClick)

    return () => {
      window.removeEventListener('popstate', handleClick)
    }
  }, [history])

  if (!articleDetail) {
    return <LinearProgress color="secondary" />
  }

  const { title, description, createdAt, author, tagList, body } = articleDetail.article

  const viewButton = author.username === user.username

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" variant="h6" component="h2" sx={{ mt: 2 }}>
            Are you sure to delete this article?
          </Typography>
          <button
            style={{
              fontFamily: 'Inter Regular sansSerif',
              fontSize: '18px',
              padding: '3px 10px',
              border: '1px solid red',
              color: 'red',
              borderRadius: '5px',
              background: 'transparent',
              cursor: 'pointer',
              margin: '20px 0 0 100px',
            }}
            type="button"
            onClick={() => {
              fetchDeleteArticle(slug, token)
              history('/')
            }}
          >
            YES
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
            }}
            style={{
              fontFamily: 'Inter Regular sansSerif',
              fontSize: '18px',
              padding: '3px 10px',
              border: '1px solid #52c41a',
              color: '#52c41a',
              borderRadius: '5px',
              background: 'transparent',
              cursor: 'pointer',
              margin: '5px',
            }}
          >
            NO
          </button>
        </Box>
      </Modal>
      <div className="container">
        <div className="article-detail">
          <section className="article-detail__row-one">
            <ul className="article-detail__row-one-box">
              <ul className="column-one-box">
                <li className="article__title">
                  <h5>{title}</h5>
                </li>
                <li>
                  <button
                    type="button"
                    className="article__like"
                    onClick={() => {
                      if (isLoginIn) {
                        if (isLiked) {
                          fetchDeleteFavoriteArticle(slug, token)
                          setFavoritesCount(likeCount - 1)
                        }
                        if (!isLiked) {
                          fetchAddFavoriteArticle(slug, token)
                          setFavoritesCount(likeCount + 1)
                        }
                        setFavorited(!isLiked)
                      }
                    }}
                  >
                    {isLiked ? <span>❤️️</span> : <span>🤍</span>}
                    {likeCount}
                  </button>
                </li>
              </ul>
              <li className="article__tag">
                {tagList.map((item) => (
                  <span key={uniqid()} className="tag-name">
                    {item}
                  </span>
                ))}
              </li>
            </ul>
            <ul className="article-detail__row-one">
              <div className="article-detail__box">
                <li className="article__username">{author.username}</li>
                <li className="article__date">{format(parseISO(createdAt), 'MMMM d, y')}</li>
              </div>
              <div>
                <img src={author.image} alt="" className="article__img" />
              </div>
            </ul>
          </section>
          <section className="article-detail__row-two">
            {description}
            {viewButton && (
              <div className="article-detail__row-two-box">
                <Link to={`/articles/${slug}/edit`}>
                  <button type="button" className="article-button-edit">
                    Edit
                  </button>
                </Link>
                <button
                  className="article-button-delete"
                  type="button"
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </section>
          <section className="article-detail__row-three">
            <ReactMarkdown>{body}</ReactMarkdown>
          </section>
          <ul className="column-two" />
        </div>
      </div>
    </>
  )
}

export default ArticleDetail
