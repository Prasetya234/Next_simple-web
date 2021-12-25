import { useToast } from '@chakra-ui/react'
import Link from 'next/link'

export default function Header() {
  const toast = useToast()
  const LogOut = () => {
    const user = JSON.parse(sessionStorage.getItem('DATA_USER') || '{}')
    toast({
      description: `Selamat tinggal ${user.email} `,
      position: 'top-right',
      status: 'success',
      duration: 4000,
      isClosable: false
    })
    sessionStorage.removeItem('DATA_USER')
  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-md">
        <Link href="/">
          <a className="navbar-brand">Simple Web</a>
        </Link>
      </div>
      <div className="nav navbar-nav navbar-right">
        <Link href="/login">
          <a className="navbar-brand" onClick={LogOut}>
            logout
          </a>
        </Link>
      </div>
    </nav>
  )
}
