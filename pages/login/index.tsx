import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import service from '../../service/auth'
import { Text } from '@chakra-ui/react'

export default function Login() {
  const router = useRouter()
  useEffect(() => {
    const dataLogin = sessionStorage.getItem('DATA_USER')
    if (dataLogin) {
      router.push('/')
    }
  }, [])
  const [laoding, setLoading] = useState(false),
    [isValidEmail, setIsValidEmail] = useState(true),
    [isValidPass, setIsValidPass] = useState(true),
    [message, setMessage] = useState('')
  const postData = async (mail: string, pass: string) => {
    setLoading(true)
    const res = await service(
      '/auth/login',
      {
        email: mail,
        password: pass
      },
      {
        'Content-Type': 'application/json'
      }
    )
    if (res.length !== 0) {
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
    setLoading(false)
  }
  const ConditionalWrapper = ({ children, condition }: any) => {
    return condition ? (
      children
    ) : (
      <div>
        <span>Login</span>
      </div>
    )
  }
  function validEmail(mail: string) {
    if (mail === '') {
      setMessage('Email Harus Di Isi')
      setIsValidEmail(false)
    } else {
      var re = /(.+)@(.+){2,}\.(.+){2,}/
      if (re.test(mail.toLowerCase())) {
        setIsValidEmail(true)
        return true
      } else {
        setMessage('Format Email Tidak Benar')
        setIsValidEmail(false)
      }
    }
  }
  function validPass(pass: string) {
    if (pass === '') {
      setIsValidPass(false)
    } else {
      setIsValidPass(true)
      return true
    }
  }
  const toLogin = async (event: any) => {
    event.preventDefault()
    const email = validEmail(event.target.email.value)
    const pass = validPass(event.target.password.value)
    if (email && pass) {
      postData(event.target.email.value, event.target.password.value)
    }
  }
  return (
    <div className="container" style={{ padding: 30 }}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <Text fontSize="4xl">Login</Text>
          <div className="card px-5 py-5">
            <form className="form-data" onSubmit={toLogin}>
              <div className="forms-inputs mb-4 ">
                <span>Email</span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className={`w-100 form-control ${
                    !isValidEmail ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">{message}!</div>
              </div>
              <div className="forms-inputs mb-4">
                <span>Password</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  className={`w-100 form-control ${
                    !isValidPass ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">Password Harus di isi!</div>
              </div>
              <div className="mb-3">
                <button className="btn btn-dark w-100">
                  <ConditionalWrapper condition={laoding}>
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  </ConditionalWrapper>
                </button>
                <p className="text" onClick={() => router.push('/register')}>
                  Register
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
