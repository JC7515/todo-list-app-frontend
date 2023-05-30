import { useEffect, useRef, useState, useContext } from 'react'
import Todo from '../Todo/Todo.jsx'
import styles from '../../../styles/Home.module.css'
// import IconCheck from '../IconsSvgr/IconCheck/IconCheck'
// import IconCross from '../IconsSvgr/IconCross/IconCross'
import IconSun from '../IconsSvgr/IconSun/IconSun'
import { TodoContext } from '@/src/Context/TodoContext.js'
import dynamic from 'next/dynamic.js'
import IconMoon from '../IconsSvgr/IconMoon/IconMoon.jsx'


const DynamicBarOptions = dynamic( 
()=>import('../HomePage/BarOptionsComponent/BarOptionsComponent')
, {ssr: false} )

const DynamicImagesBackground = dynamic( 
()=>import('./ImagesBackgroundComponent/ImagesBackgroundComponent')
, {ssr: false} )

const DynamicButtomChangeThemes = dynamic( 
()=>import('./ButtomChangeThemes/ButtomChangeThemes')
, {ssr: false} )

const HomePage = () => {

    const { formContainer,
            homeElem,
            Arrtodo,
            ArrTodoAllFunc,
            textInput,
            checkboxInput,
            NewTodoSubmit,
            checkboxCheked,
            isDarkModeActive,
            SwitchToDarkModeOrLightModeFunc,
            containerOfListandOptions,
          } = useContext(TodoContext) 

  
  // const DynamicCountItemProps = {
  //   styles: styles.countOfTodos,
  //   label: countItem,
  // };

  if(!ArrTodoAllFunc) return <span>...cargando</span>

  return (
    <main ref={homeElem} className={[styles.Home].join('')}>

        <DynamicImagesBackground /> 

        <section className={styles.SectionApp__container}>

          <div className={styles.SectionData__container}>

            <div className={styles.TitleAndBar__container}>

                <div className={styles.TitleAndViewMode__container}>
                  <h1 className={styles.titleTodo}>TODO</h1>
                  {/* <div onClick={SwitchToDarkModeOrLightModeFunc}>
                    { 
                      isDarkModeActive ? 
                      (
                        <IconSun/> 
                      ) : (
                        <IconMoon/>
                      )
                    }
                  </div> */}

                  <DynamicButtomChangeThemes />
                </div>
    
                <form ref={formContainer} onSubmit={NewTodoSubmit}  className={styles.BarInsertTodo__Container}>
                  <input ref={checkboxInput} onClick={checkboxCheked} className={[styles.Checkbox__bar].join('')} type="checkbox" name="todo_checkbox" id="" />
                  
                  <input ref={textInput} className={[styles.Bar__todo].join('')} placeholder='Create a new todo...' type="text" name="todo_text" id="" />
                </form>

            </div>

            <div ref={containerOfListandOptions} className={[styles.ListAndOptions__container].join('')}>

              <ul className={styles.listTodo__container}>
                  {
                   Arrtodo.map(({id, completed, todotext}) => {
                      return <Todo key={id} idTodo={id} completedTodo={completed} labelTodo={todotext} />
                    })
                  }

              </ul>
                
                <DynamicBarOptions />
                {/* <BarOptionsComponent /> */}

            </div>

          </div>

              <p className={styles.Bottom__message} >Drag and drop to reorder List</p>
        </section>
      </main>
  )
}

export default HomePage