import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DarkModeState from './Contexts/DarkMode/DarkModeState';
import UserDataState from "./Contexts/UserData/UserDataState"
import { BrowserRouter } from "react-router-dom"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <UserDataState>
        <DarkModeState>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DarkModeState>
      </UserDataState>
  </React.StrictMode>
);
