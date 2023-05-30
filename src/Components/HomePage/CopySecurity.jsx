import React from 'react'

const CopySecurity = () => {

    const [Arrtodo, SetArrTodo] = useState([])
    const [newTodo, SetNewTodo] = useState()
    const [countItem, SetCountItem] = useState()
    
    const textInput     = useRef()
    const checkboxInput = useRef()
  
    
    
    const NewTodoSubmit = (event) => {
    
  
      let newTodoObject = {
        id: uuidv4(),
        completed : checkboxInput.current.checked,
        todotext: textInput.current.value,
      }
      
      
      fetch(`http://localhost:4500/`, {
        method:'POST',
        body: JSON.stringify(newTodoObject),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(console.log(newTodoObject))
      .catch(error => {
        console.log(error)
      })
  
      SetCountItem(Arrtodo.length + 1)
      
      console.log(countItem)
  
      event.preventDefault()
  
    }
  
    const TodoDeleteFunc = () => {
  
      // const todoDeleted = {
      //   id: Id
      // }
      
      // fetch(`http://localhost:4500/`, {
      //   method: 'DELETE',
      //   body: JSON.stringify(todoDeleted),
      //   headers: {
      //     "Content-Type": "application/json" 
      //   }
      // })
      // .then(resp => resp.json())
      // .catch(err => console.error(err))
  
      // SetCountItem(countItem - 1)
      console.log(countItem)
    }
  
  
    useEffect(()=> {
  
      
      fetch("http://localhost:4500/")
      .then(async(resp) => await resp.json())
      .then((data) => {
        console.log(data)
        SetArrTodo(data)
        SetCountItem(data.length)
      })
      .catch(() => {
        console.log('ah ocurrido un error')
      })
      
      console.log(countItem)
  
    }, [countItem])
  

  return (
    <>
    </>
  )
}

export default CopySecurity