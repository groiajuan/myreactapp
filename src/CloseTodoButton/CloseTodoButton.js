import React from 'react';
import './CloseTodoButton.css';

// function CreateTodoButton(props) {
//   const onClickButton = (msg) => {
//     alert(msg);
//   };

  function CloseTodoButton(props) {
    const onClickButton = () => {
      props.setOpenModal(false);
    };
  
  return (
    <button
      className="CloseTodoButton"
      // onClick={() => onClickButton('Aquí se debería abrir el modal')}
       onClick={onClickButton}
    >
      +
    </button>
  );
}

export { CloseTodoButton };
