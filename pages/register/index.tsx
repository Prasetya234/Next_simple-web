import { useRouter } from 'next/router'
import { useState } from 'react'
import { Text } from '@chakra-ui/react'
import { RegisterAuth } from '../../service/auth'

export default function Register() {
  const router = useRouter()
  const [laoding, setLoading] = useState(false),
    [isValidEmail, setIsValidEmail] = useState(true),
    [isValidPass, setIsValidPass] = useState(true),
    [isValidPhone, setIsValidPhone] = useState(true),
    [message, setMessage] = useState('')
  const ConditionalWrapper = ({ children, condition }: any) => {
    return condition ? (
      children
    ) : (
      <div>
        <span>Register</span>
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
  function validPhone(phone: string) {
    if (phone === '') {
      setIsValidPhone(false)
    } else {
      setIsValidPhone(true)
      return true
    }
  }
  const toLogin = async (event: any) => {
    event.preventDefault()
    const email = validEmail(event.target.email.value)
    const password = validPass(event.target.password.value)
    const phone = validPhone(event.target.phone.value)
    if (password && email && phone) {
      setLoading(true)
      const res = await RegisterAuth(
        'auth/register',
        {
          email: event.target.email.value,
          password: event.target.password.value,
          phoneNumber: event.target.phone.value
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
  }
  return (
    <div className="container" style={{ padding: 30 }}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <Text fontSize="4xl">Register Here</Text>
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
              <div className="forms-inputs mb-4">
                <span>No Phone</span>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  autoComplete="phone"
                  className={`w-100 form-control ${
                    !isValidPhone ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  Nomor telpon harus di isi!
                </div>
              </div>
              <div className="mb-3">
                <button className="btn btn-dark w-100">
                  <ConditionalWrapper condition={laoding}>
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  </ConditionalWrapper>
                </button>
                <p className="text" onClick={() => router.push('/login')}>
                  Login
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
