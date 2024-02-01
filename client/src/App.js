import React, { useContext } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import MainPage from './Pages/MainPage/MainPage';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard'
import YourProfile from './Components/YourProfile/YourProfile'
import ToDoList from './Components/ToDoList/ToDoList'
import Team from './Components/Team/Team'
import Calendar from './Components/Calendar/Calendar'
import Premium from './Components/Premium/Premium';
import Settings from './Components/Settings/Settings';
import DarkModeContext from './Contexts/DarkMode/DarkModeContext';
import Logout from './Pages/Logout/Logout';
import AssignTasks from './Components/AssignTasks/AssignTasks';
import ErrorPage from './Pages/ErrorPage/ErrorPage';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    renderAppComponent(darkMode)
  );
}

function renderAppComponent(darkMode) {
  if (darkMode) {
    return (
      <div className="App-darkMode">
        < Routes >
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<MainPage />} >
            <Route index element={<Dashboard />} ></Route>
            <Route path="yourprofile" element={<YourProfile />} ></Route>
            <Route path="todolist" element={<ToDoList />} ></Route>
            <Route path="assigntasks" element={<AssignTasks />} ></Route>
            <Route path="team" element={<Team />} ></Route>
            <Route path="calendar" element={<Calendar />} ></Route>
            <Route path="premium" element={<Premium />} ></Route>
            <Route path="settings" element={<Settings />} ></Route>
          </Route>
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/*" element={<ErrorPage />} />
        </Routes >
      </div >
    )
  } else {
    return (
      <div className="App">
        < Routes >
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<MainPage />} >
            <Route index element={<Dashboard />} ></Route>
            <Route path="yourprofile" element={<YourProfile />} ></Route>
            <Route path="todolist" element={<ToDoList />} ></Route>
            <Route path="assigntasks" element={<AssignTasks />} ></Route>
            <Route path="team" element={<Team />} ></Route>
            <Route path="premium" element={<Premium />} ></Route>
            <Route path="calendar" element={<Calendar />} ></Route>
            <Route path="settings" element={<Settings />} ></Route>
          </Route>
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/*" element={<ErrorPage />} />
        </Routes >
      </div >
    )
  }
}


export default App;
