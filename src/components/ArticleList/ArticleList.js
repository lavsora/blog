import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '@mui/material/Pagination'
import LinearProgress from '@mui/material/LinearProgress'
import uniqid from 'uniqid'

import Article from '../Article'
import { fetchArticles } from '../../api/articles'
import { setArticleListOffset } from '../../store/reducers/articleReducer'
import {
  selectArticleListOffset,
  selectArticles,
  selectArticlesCount,
} from '../../store/selectors/selectors'

import './ArticleList.scss'

const ArticlesList = () => {
  const dispatch = useDispatch()

  const articles = useSelector(selectArticles)
  const articlesCount = useSelector(selectArticlesCount)
  const articleListOffset = useSelector(selectArticleListOffset)
  const totalPages = Math.ceil(articlesCount / 5)

  const [isLoading, setIsLoading] = useState(false)

  const token = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchArticles((articleListOffset - 1) * 5, token)).finally(() => {
      setIsLoading(false)
    })
  }, [dispatch, token, articleListOffset])

  if (isLoading) {
    return <LinearProgress color='secondary' />
  }

  return (
    <div className='container'>
      {articles.map((item) => (
        <Article key={uniqid()} item={item} />
      ))}
      <Pagination
        count={totalPages}
        page={articleListOffset}
        variant='outlined'
        shape='rounded'
        color='secondary'
        onChange={(_, page) => dispatch(setArticleListOffset(page))}
      />
    </div>
  )
}

export default ArticlesList