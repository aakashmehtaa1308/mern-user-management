import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Navbar from './Components/Layouts/Navbar';
import MainRouter from './Components/MainRouter';
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: true,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'SIGNOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useEffect(() => {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      dispatch({
        type: 'SIGNIN',
        payload: {
          user: JSON.parse(localStorage.getItem('user')),
          token: JSON.parse(localStorage.getItem('token')),
        },
      });
    } else {
      dispatch({
        type: 'SIGNOUT',
      });
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Navbar />
      <div className='App'>
        <MainRouter />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
