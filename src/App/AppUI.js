import React from 'react';
import { TodoCounter } from '../TodoCounter/TodoCounter';
import { TodoSearch } from '../TodoSearch/TodoSearch';
import { TodoList } from '../TodoList/TodoList';
import { TodoItem } from '../TodoItem/TodoItem';
import { CreateTodoButton } from '../CreateTodoButton/CreateTodoButton';
import { TodoContext } from './TodoContext/Index';
import { Modal } from '../Modal';
import { CloseTodoButton } from '../CloseTodoButton/CloseTodoButton';
import { TodoForm } from '../TodoForm';

function AppUI()
{

  const {
        error,
        loading,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal
    } = React.useContext(TodoContext);

    return ( 
    <React.Fragment>
        <TodoCounter />
        <TodoSearch/>
       
            <TodoList>
            {error && <p>Hubo un error</p>}
            {loading && <p>Cargando</p>}
            {(!loading && !searchedTodos.length) && <p>Crea tu primer TODO</p>}
            
              {searchedTodos.map(todo => (
                <TodoItem
                  key={todo.text}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.text)}
                  onDelete={() => deleteTodo(todo.text)}
                />
              ))}
            </TodoList>
          
          {!!openModal && 
            (
              <Modal>
                <TodoForm></TodoForm>
                <CloseTodoButton setOpenModal = {setOpenModal} />
              </Modal>
            )
          }
  
        <CreateTodoButton
          setOpenModal = {setOpenModal}       
        />
      </React.Fragment>
      );
}

export { AppUI }