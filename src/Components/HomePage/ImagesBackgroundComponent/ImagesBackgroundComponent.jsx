import {React, useContext} from 'react'
import HomeImages from '../HomeImages'
import { TodoContext } from '@/src/Context/TodoContext'
import styles from '../../../../styles/Home.module.css'
import Image from 'next/image'

const ImagesBackgroundComponent = () => {

    const {isDarkModeActive} = useContext(TodoContext) 

  return (
    <>
      {
        isDarkModeActive ? (
          window.innerWidth < 375 ?(
          <Image className={styles.bgDesktop_img} priority={true} src={HomeImages.ImageBgMobileDark} alt="bgDesktop__dark" />
          ):
          (
          <Image className={styles.bgDesktop_img} priority={true} src={HomeImages.ImageBgDesktopDark} alt="bgDesktop__dark" />
          )
        ):
        (
          window.innerWidth < 375 ?(
          <Image className={styles.bgDesktop_img} priority={true} src={HomeImages.ImageBgMobileLight} alt="bgDesktop__dark" />
          ):
          (
          <Image className={styles.bgDesktop_img} priority={true} src={HomeImages.ImageBgDesktopLight} alt="bgDesktop__dark" />
          )
        )
      } 
    </>

  )
}

export default ImagesBackgroundComponent