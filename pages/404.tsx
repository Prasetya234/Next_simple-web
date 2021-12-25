import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Custom.module.css'

export default function Custom404() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }, [])
  return (
    <div className={styles.content}>
      <div className={styles.body}>
        <p className={styles.first}>404</p>
        <p className={styles.second}>Page Not Found</p>
        <p className={styles.third}>
          <Link href="/">
            <a> Back to Home</a>
          </Link>
        </p>
      </div>
    </div>
  )
}
