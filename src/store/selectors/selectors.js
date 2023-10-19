export const selectIsLogIn = (state) => state.user.isLogIn
export const selectUser = (state) => state.user.user
export const selectArticles = (state) => state.article.articles
export const selectArticlesCount = (state) => state.article.articlesCount
export const selectArticleListOffset = (state) =>
  state.article.articleListOffset