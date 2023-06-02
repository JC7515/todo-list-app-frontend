import TodoContext from '@/src/Context/TodoContext'
import { Html, Head, Main, NextScript } from 'next/document'
import dotenv from 'dotenv'
dotenv.config()

export default function Document() {
  return (
    <Html lang="en">
         <Head />
         <body>
           <Main />
           <NextScript />
         </body>
    </Html>
  )
}
