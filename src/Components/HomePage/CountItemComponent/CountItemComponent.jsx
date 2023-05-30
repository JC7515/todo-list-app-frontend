import {React, useContext } from 'react'
import styles from '../../../../styles/Home.module.css'
import { TodoContext } from '@/src/Context/TodoContext'

const CountItemComponent = () => {

    const {countItem, elemCountOfTodos} = useContext(TodoContext) 

  return (
    // <p className={styles.countOfTodos}>{countItem < 0 ? 
    //                                                 0 : 
    //                                                 countItem} item left</p>
    <p ref={elemCountOfTodos} className={[styles.countOfTodos].join('')}>{countItem} item left</p>
                                                    
  )
}

export default CountItemComponent