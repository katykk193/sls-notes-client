import { createContext, useReducer } from 'react';
import { actionTypes } from './types';

const initialState = {
  currentNo: 1,
  cards: [],
  showModal: false
};

export const GlobalContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_NO:
      return {
        ...state,
        currentNo: action.payload
      };

    case actionTypes.UPDATE_CARDS:
      return {
        ...state,
        cards: action.payload
      };

    case actionTypes.UPDATE_SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      };

    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateCurrentNo = (currentNo) => {
    dispatch({
      type: actionTypes.UPDATE_CURRENT_NO,
      payload: currentNo
    });
  };

  const updateCards = (cards) => {
    dispatch({
      type: actionTypes.UPDATE_CARDS,
      payload: cards
    });
  };

  const updateShowModal = (showModal) => {
    dispatch({
      type: actionTypes.UPDATE_CARDS,
      payload: showModal
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        currentNo: state.currentNo,
        updateCurrentNo,
        cards: state.cards,
        updateCards,
        showModal: state.showModal,
        updateShowModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
