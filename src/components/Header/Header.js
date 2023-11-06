import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { selectUser, selectIsLogIn } from '../../store/selectors/selectors'
import { loginAction } from '../../store/reducers/userReducer'

import './Header.scss'

const Header = () => {
  const dispatch = useDispatch()
  const history = useNavigate()

  const isLogIn = useSelector(selectIsLogIn)
  const user = useSelector(selectUser)

  const handleLogOut = () => {
    dispatch(loginAction(false))
    localStorage.removeItem('currentUser')
    history('/')
  }

  return (
    <div className="wrapper-header">
      <div className="header">
        <Link to="/">
          <span className="header__logo">Real world Blog</span>
        </Link>
        <div className="nav">
          {isLogIn && (
            <>
              <Link to="/new-article">
                <button type="button" className="nav__item create__article">
                  create article{' '}
                </button>
              </Link>
              <Link to="/profile">
                <button className="nav__item" type="button">
                  {user.username}
                  <img src={user.image} alt="user_image" />
                </button>
              </Link>
              <Link to="/" onClick={handleLogOut}>
                <button className="nav__item" type="button">
                  Log Out
                </button>
              </Link>
            </>
          )}
          {!isLogIn && (
            <>
              <Link to="/sign-in">
                <button className="nav__item" type="button">
                  Sign In
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="nav__item" type="button">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
