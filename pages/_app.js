import '@/styles/globals.css'
import dotenv from 'dotenv'
dotenv.config()

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
