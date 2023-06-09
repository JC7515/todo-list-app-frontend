import dotenv from 'dotenv'
dotenv.config()
import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
// import Todo from '@/src/Todo'
import HomePage from '@/src/Components/HomePage/HomePage'
import { TodoContextProvider } from '@/src/Context/TodoContext.js'

// const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
    <TodoContextProvider>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <HomePage/>
    </TodoContextProvider>
    </>
  )
}
