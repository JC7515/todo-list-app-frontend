import {useEffect, useRef, useState, useContext} from 'react'
// import Image from 'next/image'
import Link from 'next/link'
import style from '../../../styles/Todo.module.css'
import IconCross from '../IconsSvgr/IconCross/IconCross'
import { TodoContext } from '@/src/Context/TodoContext.js'

const Todo = ({idTodo, completedTodo, labelTodo}) => {

  const {
         isDarkModeActive          ,
         checkbox                  , 
         SetCountItem              , 
         countItem                 , 
         SetArrTodo                , 
         Arrtodo                   , 
         ArrTodoAllFunc            , 
         SetArrTodoAllFunc} = useContext(TodoContext)

  
  const [textDecorationStyle, SetTextDecorationStyle] = useState(style.TextDecoration__todo);
  const [taskCompleted, SetTaskCompleted] = useState(completedTodo) 
  const [deletedDisable, SetDeletedDisable] = useState(false)
  
     const todoContainer = useRef() 
     const TodoText      = useRef()
  // const checkbox      = useRef()


  const TodoFinished = () => {
    
    console.log('eh clickeado el checkbox')
    
    //Si el taskCompleted es true pasa a false y si es false a true
    SetTaskCompleted(!taskCompleted)
    
    console.log(taskCompleted)
    
    // todoContainer.current.id,
    //se invertira el valor taskCompleted, para que sea consistente con el boolean de la db
    const newTodoValues = {
        completed: !taskCompleted,
    };

    console.log(newTodoValues)

    
    fetch(`${process.env.API_URL}/Put/${idTodo}`, {
      method: 'PUT',
      body: JSON.stringify(newTodoValues),
      headers: {
        "Content-Type": "application/json" 
      }
    })
    .then(resp => resp.json())
    .catch(err => console.error(err))


    const changeValueArrTodo = Arrtodo.find(todo => todo.id == idTodo)
    if(changeValueArrTodo){
      changeValueArrTodo.completed = !taskCompleted;
    }
    
    SetArrTodoAllFunc(Arrtodo);
    console.log(ArrTodoAllFunc)

    // const changeValueAllTodo = ArrTodoAllFunc.find(todo => todo.id == idTodo)
    // if(changeValueAllTodo){
    //   changeValueAllTodo.completed = !taskCompleted;
    // }
    

    console.log(Arrtodo)
    
    if(isDarkModeActive){
      TodoText.current.classList.toggle(textDecorationStyle)
      TodoText.current.classList.remove(style.TextDecoration__todoLigthMode)
    }else if(!isDarkModeActive){
      TodoText.current.classList.remove(textDecorationStyle)
      TodoText.current.classList.toggle(style.TextDecoration__todoLigthMode)
    }
    // TextTodoLineThroughToggle()
  } 


  
  const TodoDeleted = () => {

    if(deletedDisable){
      return console.log('El deleted esta desabilitado');
    }

    const idExist = ArrTodoAllFunc.some(( arrTodo ) => arrTodo.id === idTodo)

    if(!idExist){
      return console.log('Este Registro ya fue Eliminado');
    }

    SetDeletedDisable(true)
    
    const newArr = ArrTodoAllFunc.filter(todo => todo.id != idTodo)
    SetArrTodoAllFunc(newArr)
    SetArrTodo(newArr)

    fetch(`${process.env.API_URL}}/Delete/${idTodo}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .catch(err => console.error(err))
    
    // console.log(Arrtodo)
    // console.log(idTodo)
    
    

    // console.log(idExist)
     SetCountItem(countItem < 0 ? 0 : countItem - 1)
     localStorage.setItem('countItem', countItem < 0 ? 0 : countItem )
    
    setTimeout(() => {
      SetDeletedDisable(false)
    }, 350);

    // console.log(countItem)

  }

  

  useEffect(()=>{


    if(!taskCompleted){
      TodoText.current.classList.remove(textDecorationStyle);
      // RemoveLineThroughTodo()
    }else{
      TodoText.current.classList.add(textDecorationStyle);
      // AddLineThroughTodo()
    }

    
    if(isDarkModeActive && TodoText.current.classList.contains(style.TextDecoration__todoLigthMode) ){

      TodoText.current.classList.remove(style.TextDecoration__todoLigthMode)
      TodoText.current.classList.add(textDecorationStyle)

    }else if(!isDarkModeActive && TodoText.current.classList.contains(textDecorationStyle)){

      TodoText.current.classList.remove(textDecorationStyle)
      TodoText.current.classList.add(style.TextDecoration__todoLigthMode)

    }

    
    if(isDarkModeActive){
      TodoText.current.classList.add(style.Label_todo)
      TodoText.current.classList.remove(style.Label_todoLightMode)
      todoContainer.current.classList.remove(style.Todo__containerLightMode)
    }else{
      TodoText.current.classList.remove(style.Label_todo)
      TodoText.current.classList.add(style.Label_todoLightMode)
      todoContainer.current.classList.add(style.Todo__containerLightMode)
    }


  }, [isDarkModeActive])




  return (
    <>
        <li ref={todoContainer} className={[style.Todo__container].join('')} id={idTodo}>
           <div className={style.CheckboxData__container}>

              <input ref={checkbox} checked={taskCompleted} onChange={TodoFinished} className={style.checkbox__todo} type="checkbox" name="Todo" id="Todo" />
              {/* <label htmlFor="Todo">
      
              </label> */}
              <p ref={TodoText} className={[style.Label_todo].join('')}>{labelTodo}</p>
           </div>
    

           <div onClick={TodoDeleted}  className={style.IconCross__container}>
               <IconCross  width={18} height={18}/>  
           </div>
        </li>
    </>
  )
}

export default Todo