import Head from 'next/head'
import type { AppProps } from 'next/app'
import '~/styles/index.css'
import { Nav } from '../components/Layouts/Nav'

// This default export is required in a new `pages/_app.tsx` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}
