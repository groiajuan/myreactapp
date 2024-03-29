import React from 'react';
import './CreateTodoButton.css';

// function CreateTodoButton(props) {
//   const onClickButton = (msg) => {
//     alert(msg);
//   };

  function CreateTodoButton(props) {
    const onClickButton = () => {
      props.setOpenModal(true);
    };
  
  return (
    <button
      className="CreateTodoButton"
      // onClick={() => onClickButton('Aquí se debería abrir el modal')}
       onClick={onClickButton}
    >
      +
    </button>
  );
}

export { CreateTodoButton };
