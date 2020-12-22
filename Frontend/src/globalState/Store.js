import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();
const initialState = {confirm: false};

const reducer = (state, action) => {
  switch(action.type) {
    case "toggle":
      return {
        confirm: !(state.confirm),
      }
    
      case "reset":
        return {
          confirm: false,
         
        }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);