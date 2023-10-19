const defaultState = {
  articles: [],
  articlesCount: null,
  articleListOffset: 1,
}
  
const ADD_ARTICLES = 'ADD_ARTICLES'
const SET_ARTICLE_LIST_OFFSET = 'SET_ARTICLE_LIST_OFFSET'
  
const articleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ARTICLES:
      return {
        ...state,
        articles: [...action.payload.articles],
        articlesCount: action.payload.articlesCount,
      }
    case SET_ARTICLE_LIST_OFFSET:
      return {
        ...state,
        articleListOffset: action.payload,
      }
    default:
      return state
  }
}
  
export const addArticlesAction = (payload) => ({ type: ADD_ARTICLES, payload })
export const setArticleListOffset = (payload) => ({
  type: SET_ARTICLE_LIST_OFFSET,
  payload,
})

export default articleReducer