import {  useEffect, useState, useRef, createContext } from "react";
import { v4 as uuidv4 } from 'uuid'
import styles from '../../styles/Home.module.css'
import style from '../../styles/Todo.module.css'

const TodoContext = createContext()


const TodoContextProvider = ({children}) => {
         
    
    
    
    const [countItem, SetCountItem] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedCountItem = Number(localStorage.getItem('countItem'));
            return storedCountItem || 0;
        }
        return 0;
      })
    const [Arrtodo, SetArrTodo] = useState([])
    const [ArrTodoAllFunc, SetArrTodoAllFunc] = useState()
    const [newTodo, SetNewTodo] = useState()
    const [counter, SetCounter] = useState()
    const [isbuttomSubmitDisable, SetisbuttomSubmitDisable] = useState(false)
    
    // const [textDecorationStyle, SetTextDecorationStyle] = useState(style.TextDecoration__todo);
    const [isDarkModeActive, SetIsDarkModeActive] = useState(true)
    
    
    const textInput     = useRef()
    const checkboxInput = useRef()
   
    /************* Light Mode Ref *************/
    const homeElem                   = useRef()
    const TodoText                   = useRef()
    const checkbox                   = useRef()
    const containerOfListandOptions  = useRef()
    const bottomActive               = useRef()
    const bottomCompletd             = useRef()
    const bottomClearCompleted       = useRef()
    const elemCountOfTodos           = useRef()
    const formContainer              = useRef()
    // const todoContainer              = useRef() 
    const groupBlocksMobileDesing    = useRef()
    const BlockOneMobileDesign       = useRef()
    const BlockTwoMobileDesign       = useRef()   


    const LogicOfChangeTheme = () => {
        
        if(window.innerWidth < 600){
        BlockOneMobileDesign.current.classList.toggle(styles.counterAndClearCompleted__ContainerLightMode)
        BlockTwoMobileDesign.current.classList.toggle(styles.optionsGroup__containerLightMode)
        groupBlocksMobileDesing.current.classList.toggle(styles.groupsBlocks__containerLightMode)
        }
        
        homeElem.current.classList.toggle(styles.HomeLightMode)
        containerOfListandOptions.current.classList.toggle(styles.ListAndOptions__containerLightMode)
        bottomActive.current.classList.toggle(styles.active__OptionLightMode)
        bottomCompletd.current.classList.toggle(styles.completed__OptionLightMode)
        bottomClearCompleted.current.classList.toggle(styles.clear__OptionLightMode)
        elemCountOfTodos.current.classList.toggle(styles.countOfTodosLightMode)
        textInput.current.classList.toggle(styles.Bar__todoLightMode)
        formContainer.current.classList.toggle(styles.BarInsertTodo__ContainerLightMode)

        // todoContainer.current.classList.toggle(style.Todo__containerLightMode)
        
    }

    const SwitchToDarkModeOrLightModeFunc = () => {
        SetIsDarkModeActive(!isDarkModeActive)
        
        console.log()

        if(isDarkModeActive == true){
            localStorage.setItem('themeApp', 'Ligth')
        }else if(isDarkModeActive == false){
            localStorage.setItem('themeApp', 'Black')
        }

        
        // if(toString(localStorage.getItem('themeApp')) === 'Black'){
        //     localStorage.setItem('themeApp', 'Ligth')
        // }else if(toString(localStorage.getItem('themeApp')) === 'Ligth'){
        //     localStorage.setItem('themeApp', 'Black')
        // }

        LogicOfChangeTheme()
    }
    
    
    const checkboxCheked = () => {
        
        console.log(checkboxInput.current.checked)
    }
    
    
    const ALLFilterFunc = () => {
       SetArrTodo(ArrTodoAllFunc)   
    }


    const ActiveFilterFunc = () => {
        SetArrTodo(ArrTodoAllFunc.filter( todo => todo.completed === false))
    }
    
    
    const CompletedFilterFunc = () => {
        SetArrTodo(ArrTodoAllFunc.filter( todo => todo.completed === true))
    }


    const ClearCompletedFunc = () => {

        const arrFilterTodoFalse = ArrTodoAllFunc.filter( todo => todo.completed === false)
        
        SetArrTodo(arrFilterTodoFalse)
        SetArrTodoAllFunc(arrFilterTodoFalse)


        const todosCompletedToDeleted = countItem - arrFilterTodoFalse.length;

        const countItemValue = countItem - todosCompletedToDeleted  
        SetCountItem(countItemValue)
        localStorage.setItem('countItem', countItemValue)


        console.log(countItem)

        
        fetch(`http://localhost:4500/ClearCompleted`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .catch(err => console.error(err))
        
    }

    
    
    
    
    const NewTodoSubmit = (event) => {
        
        if(isbuttomSubmitDisable){
            return event.preventDefault()
        }
        
        const todoTextValue = textInput.current.value.trim();
        
        
        if(todoTextValue === ""){
            return event.preventDefault()
        }
        
        event.preventDefault()
        
        SetisbuttomSubmitDisable(true)
        
        let newTodoObject = {
            id: uuidv4(),
            completed : checkboxInput.current.checked,
            todotext: textInput.current.value,
        }
        
        ArrTodoAllFunc.push(newTodoObject)
        SetArrTodo(ArrTodoAllFunc)
        
        fetch(`http://localhost:4500/Post`, {
            
            method:'POST',
            body: JSON.stringify(newTodoObject),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        // .then(console.log(newTodoObject))
        .catch(error => {
            console.log(error)
        })
        
        // console.log(countItem)
        
        
        setTimeout(() => {
            SetCountItem(countItem + 1)
            localStorage.setItem('countItem', countItem + 1)
            SetisbuttomSubmitDisable(false)
        }, 350)
        
    }
    
    
    useEffect(()=> {
        
        if(!localStorage.getItem('themeApp')){
            localStorage.setItem('themeApp', 'Black')
        }

        setTimeout(()=>{
            
            if(localStorage.getItem('themeApp') == "Ligth"){
                SwitchToDarkModeOrLightModeFunc()
            }

        }, 500)    
        
        fetch("http://localhost:4500/")
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
                SetArrTodo(data)
                SetArrTodoAllFunc(data)
                if(typeof window !== "undefined"){
                    SetCountItem(data.length)
                    localStorage.setItem('countItem', countItem)
                }
                // console.log(countItem)
            })
            .catch((e) => {
                console.log('ah ocurrido un error')
                console.log(e)
            }) 
            
            

        console.log(localStorage.getItem('themeApp'))
    

    },[])
        
    
    const values = {
        groupBlocksMobileDesing,
        BlockOneMobileDesign,
        BlockTwoMobileDesign,
        formContainer,
        elemCountOfTodos,
        bottomActive,
        bottomCompletd,
        bottomClearCompleted,
        containerOfListandOptions,
        homeElem,
        isDarkModeActive,
        // todoContainer,
        TodoText,
        checkbox,
        Arrtodo,
        ArrTodoAllFunc,
        countItem,
        textInput,
        checkboxInput,
        NewTodoSubmit,
        SetCountItem,
        ALLFilterFunc,
        ActiveFilterFunc,
        CompletedFilterFunc,
        ClearCompletedFunc,
        checkboxCheked,
        SetArrTodo,
        SetArrTodoAllFunc,
        SwitchToDarkModeOrLightModeFunc,
        
    }


    return (
        <TodoContext.Provider value={values}>
         {children}
       </TodoContext.Provider>

)

}


export {TodoContext, TodoContextProvider}