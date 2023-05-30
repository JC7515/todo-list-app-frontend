import {React, useContext, useEffect, useState} from 'react'
import styles from '../../../../styles/Home.module.css'
import dynamic from 'next/dynamic.js'
import { TodoContext } from '@/src/Context/TodoContext'



const DynamicCountItem = dynamic( 
    ()=>import('../CountItemComponent/CountItemComponent')
    , {ssr: false} )


const BarOptionsComponent = () => {
     
   const {bottomActive,
          bottomCompletd,
          bottomClearCompleted,
          ALLFilterFunc,
          ActiveFilterFunc,
          CompletedFilterFunc,
          ClearCompletedFunc,
          groupBlocksMobileDesing,
          BlockOneMobileDesign,
          BlockTwoMobileDesign,} 
          = useContext(TodoContext)

    // const [windowWidth, SetWindowWidth] = useState(window.innerWidth)

    // const windowWidthIsOfMobil = () => {
    //     // SetWindowWidth(window.innerWidth)
    //     SetWindowWidth(window.innerWidth)
    //     const value =  windowWidth < 700
        
    //     return value
        
    // } 
    
    useEffect( () => {
        
        // console.log(windowWidth)
        console.log(window.innerWidth)

  },[])


  return (
    
      <>
          {
              window.innerWidth < 600 ?
              (

                <div ref={groupBlocksMobileDesing} className={[styles.groupsBlocks__container].join('')}>
                    <div ref={BlockOneMobileDesign} className={[styles.counterAndClearCompleted__Container].join('')}>
                        <DynamicCountItem />

                        <button ref={bottomClearCompleted} onClick={ClearCompletedFunc} className={[styles.clear__Option].join('')}>Clear Completed</button>
                    </div>
                    
                    <div ref={BlockTwoMobileDesign} className={[styles.optionsGroup__container].join('')}>
                        <div className={styles.options__container}>
                          <button onClick={ALLFilterFunc} className={styles.all__Option}>All</button>
                          <button ref={bottomActive} onClick={ActiveFilterFunc} className={[styles.active__Option].join('')}>Active</button>
                          <button ref={bottomCompletd} onClick={CompletedFilterFunc} className={[styles.completed__Option].join('')}>Completed</button>
                        </div>
                    </div>

                </div>
              )
              :
              (
                  <div className={styles.BarOptions__container}>
  
                      <DynamicCountItem />
  
                      <div className={styles.OptionData__container}>
  
                          <div className={styles.options__container}>
                          <button onClick={ALLFilterFunc} className={styles.all__Option}>All</button>
                          <button ref={bottomActive} onClick={ActiveFilterFunc} className={[styles.active__Option].join('')}>Active</button>
                          <button ref={bottomCompletd} onClick={CompletedFilterFunc} className={[styles.completed__Option].join('')}>Completed</button>
                          </div>
  
                      <button ref={bottomClearCompleted} onClick={ClearCompletedFunc} className={[styles.clear__Option].join('')}>Clear Completed</button>
  
                      </div>
                  </div>
              )
          }
      </>
    
  )
}

export default BarOptionsComponent