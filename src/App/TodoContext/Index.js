import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props)
{
    const { 
        item: todos,
        saveItem: saveTodos,
        loading,
        error
       } = useLocalStorage('TODOS_V1', []);
  
  
  
  
    const [searchValue, setSearchValue] = React.useState('');
  
    const completedTodos = todos.filter(todo => !!todo.completed).length;
    const totalTodos = todos.length;

    const [openModal,setOpenModal] = React.useState(false);
  
    let searchedTodos = [];
  
    if (!searchValue.length >= 1) {
      searchedTodos = todos;
    } else {
      searchedTodos = todos.filter(todo => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      });
    }
  
    const completeTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text);
      const newTodos = [...todos];
      newTodos[todoIndex].completed = true;
      saveTodos(newTodos);
    };
  
    const deleteTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text);
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      saveTodos(newTodos);
    };
  

    const addTodo = (text) => {
      const newTodos = [...todos];
      newTodos.push({
        completed: false,
        text
      })
      saveTodos(newTodos);
    };

    // console.log('prev effect');
  
    // // El useEffect se utiliza para cargar datos sin tener que renderizar de nuevo el componente, una vez que se termina una tarea. Por ejemplo cuando termina llamada a API
    // // Si mandamos en el segundo argumento un array vacio en las dependencias, solo lo hara una vez, la primera que vez que se renderize el componente.
    // // React.useEffect(() =>
    // // {
    // //   console.log('use effect');
    // // },[]);
  
    // //En este caso dependemos del totalTodos, osea que cuando haya un cambio en esa variable volveria a renderizarse el codigo. Ejemplo: Al eliminarse o crearse uno nuevo,
    // //pero no al modificarse
    // React.useEffect(() =>
    // {
    //   console.log('use effect');
    // },[totalTodos]);
    
    // console.log('after effect');


    return (
    //todos las propiedades que querramos compartir en el contexto
    <TodoContext.Provider value = {{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        addTodo
    }}>
    {props.children}
    </TodoContext.Provider>
    );
}


export{TodoContext,TodoProvider};


