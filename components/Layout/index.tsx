import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
  title: string
}

export default function Layout(props: LayoutProps) {
  const { children, title } = props
  return (
    <>
      <Head>
        <title>learn | {title}</title>
        <meta name="description" content="Learn NextJs" />
      </Head>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    </>
  )
}
