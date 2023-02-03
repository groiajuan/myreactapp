import React from 'react';
import { AppUI } from './AppUI';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Llorar con la llorona', completed: true },
//   { text: 'LALALALAA', completed: false },
// ];

function useLocalStorage(itemName, initialValue) {
  const [loading,setLoading] = React.useState(true);
  const [error,setError] = React.useState(false);
  const [item, setItem] = React.useState(initialValue);


  React.useEffect( () =>{
    setTimeout( () =>
    {
      try 
      {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        //para tirar un error
        // const ad=40;
        // ad=41;
        setItem(parsedItem);
        setLoading(false);
        setError(false);
      } catch (error) 
      {
        console.log('Hubo un error 2waka' + error);
        setLoading(false);
        setError(error);
      }
    }, 1000);
  });

  // const localStorageItem = localStorage.getItem(itemName);
  // let parsedItem;
  
  // if (!localStorageItem) {
  //   localStorage.setItem(itemName, JSON.stringify(initialValue));
  //   parsedItem = initialValue;
  // } else {
  //   parsedItem = JSON.parse(localStorageItem);
  // }

  // const [item, setItem] = React.useState(parsedItem);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
    
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}

function App() {
  // // Desestructuramos los datos que retornamos de nuestro custom hook, y le pasamos los argumentos que necesitamos (nombre y estado inicial)
  // const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);

  // Desestructuramos los datos que retornamos de nuestro custom hook, y le pasamos los argumentos que necesitamos (nombre y estado inicial)
  const { 
      item: todos,
      saveItem: saveTodos,
      loading,
      error
     } = useLocalStorage('TODOS_V1', []);




  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

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
    <AppUI
      loading={loading}
      error={error}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;