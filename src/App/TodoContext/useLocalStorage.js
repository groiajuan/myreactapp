import React from "react";

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

  export {useLocalStorage};