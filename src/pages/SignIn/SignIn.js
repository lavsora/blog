import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress'

import { fetchSignIn } from '../../api/user'
import { loginAction, setUser } from '../../store/reducers/userReducer'

const SignIn = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onChange' })

  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(false)

  async function submitForm(data) {
    setIsLoading(true)
    const responseIn = await fetchSignIn({ user: data })
    if (responseIn.user) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify(responseIn.user.token),
      )
      dispatch(setUser(responseIn.user))
      dispatch(loginAction(true))
      setAlert(false)
      history('/')
    } else {
      setAlert(true)
    }
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LinearProgress color='secondary' />}
      <div className='wrapper-form'>
        <div className='form-container sign-up'>
          <span className='form__name'>Sign In</span>
          <form className='form' onSubmit={handleSubmit(submitForm)}>
            <label className='form__label'>Email address</label>
            <input
              {...register('email', {
                required: 'empty',
              })}
              type='email'
              className='form__input'
              placeholder='Email address'
              onChange={(e) => {
                // eslint-disable-next-line no-unused-expressions
                e.target.value !== '' && setAlert(false)
              }}
            />
            {errors.email && (
              <span className='form__message' style={{ color: 'red' }}>
                {errors.email.message}
              </span>
            )}
            <label className='form__label'>Password</label>
            <input
              {...register('password', {
                required: 'empty',
              })}
              type='password'
              className='form__input'
              placeholder='Password'
              onChange={(e) => {
                // eslint-disable-next-line no-unused-expressions
                e.target.value !== '' && setAlert(false)
              }}
            />
            {errors.password && (
              <span className='form__message' style={{ color: 'red' }}>
                {errors.password.message}
              </span>
            )}
            {alert && (
              <span className='form__message' style={{ color: 'red' }}>
                email or password is incorrect — try again!
              </span>
            )}
            <input
              className='button'
              type='submit'
              value={isSubmitting ? 'Loading...' : 'Login'}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn