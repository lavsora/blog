import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
  
import articleReducer from './reducers/articleReducer'
import userReducer from './reducers/userReducer'
  
export const rootReducer = combineReducers({
  article: articleReducer,
  user: userReducer,
})
  
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)