import { createStore } from 'redux';
import employees from './db/employees.js';

const initialState = {
  employees: employees,
  language: 'en',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    case 'UPDATE_EMPLOYEE':
      return { ...state, employees: action.payload };
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'DELETE_EMPLOYEE':
      return { ...state, employees: state.employees.filter(emp => emp.id !== action.payload) };
    default:
      return state;
  }
}


export const store = createStore(reducer);


export function subscribeToStore(callback) {
  store.subscribe(() => callback(store.getState()));
}
