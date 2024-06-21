import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import WorkWave from "../../Assets/WorkWave.png"
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from '../../Contexts/UserData/UserDataContext'
import axios from 'axios'
import jscookie from "js-cookie"

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { state } = useContext(UserDataContext);
  const [isPremium, setIsPremium] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    setDarkMode(state.userData.darkMode);
    setIsPremium(state.userData.isPremium);
    setIsEmployee(localStorage.getItem("isEmployee"));
  }, [])

  const handleDarkMode = async (mode) => {
    try {
      const isEmployee = localStorage.getItem("isEmployee");
      const sessionToken = jscookie.get("sessionToken");
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/changeDarkMode?isEmployee=${isEmployee}&sessionToken=${sessionToken}`, { mode }, { withCredentials: true });
      if (response.status === 200) {
        setDarkMode(mode);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    darkMode

      ?

      (
        <div className='navbar-darkMode'>

          <div className='menu'>
            <img src={WorkWave} alt="WorkWave" />
          </div>

          <div className='userImg'>
            <img src={state.userData.profilePic} alt="Profile" />
          </div>

          <ul className='navbar-list-1'>
            <Link to="/" className='link-css'><li><i className="fa-solid fa-house-chimney"></i>&nbsp; Dashboard</li></Link>
            <Link to="/yourprofile" className='link-css'><li><i className="fa-solid fa-user"></i>&nbsp; Your Profile</li></Link>
            {
              isEmployee === "false"
                ?
                (
                  <Link to="/assigntasks" className='link-css'><li><i className="fa-solid fa-list"></i>&nbsp; Assign Tasks</li></Link>
                )
                :
                (
                  <Link to="/todolist" className='link-css'><li><i className="fa-solid fa-list"></i>&nbsp; ToDo List</li></Link>
                )
            }
            <Link to="/team" className='link-css'><li><i className="fa-solid fa-people-group"></i>&nbsp; Team</li></Link>
            {
              isEmployee === "false"
                ?
                (
                  isPremium
                    ?
                    ("")
                    :
                    (
                      <Link to="/premium" className='link-css'><li><i className="fa-solid fa-hand-holding-dollar"></i>&nbsp; Buy Premium</li></Link >
                    )
                )
                :
                (
                  <Link to="/calendar" className='link-css'><li><i className="fa-regular fa-calendar-days"></i>&nbsp; Calendar</li></Link>
                )
            }
          </ul >

          <div className="btnContainer">
            <div className="tabs">
              <input type="radio" id="radio-1" name="tabs" onChange={() => { handleDarkMode(false) }} />
              <label className="tab" htmlFor="radio-1"><i className="fa-regular fa-lightbulb"></i>&nbsp; Light</label>
              <input type="radio" id="radio-2" name="tabs" onChange={() => { handleDarkMode(true) }} />
              <label className="tab" htmlFor="radio-2"><i className="fa-regular fa-moon" ></i>&nbsp; Dark</label>
            </div>
          </div>

          <ul className='navbar-list-2'>
            <Link to="/settings" className='link-css'><li><i className="fa-solid fa-gears"></i>&nbsp; Settings</li></Link>
            <Link to="/logout" className='link-css'><li><i className="fa-solid fa-right-from-bracket"></i>&nbsp; Log Out</li></Link>
          </ul>

          <div className='proOrNot-darkMode'>
            {
              isPremium ?
                <span>
                  PRO EDITION
                </span>
                :
                <span>
                  BUY PRO
                </span>
            }
          </div>
        </div >
      )


      :


      (
        <div className='navbar'>

          <div className='menu'>
            <img src={WorkWave} alt="WorkWave" />
          </div>

          <div className='userImg'>
            <img src={state.userData.profilePic} alt="Profile" />
          </div>

          <ul className='navbar-list-1'>
            <Link to="/" className='link-css'><li><i className="fa-solid fa-house-chimney"></i>&nbsp; Dashboard</li></Link>
            <Link to="/yourprofile" className='link-css'><li><i className="fa-solid fa-user"></i>&nbsp; Your Profile</li></Link>
            {
              isEmployee === "false"
                ?
                (
                  <Link to="/assigntasks" className='link-css'><li><i className="fa-solid fa-list"></i>&nbsp; Assign Tasks</li></Link>
                )
                :
                (
                  <Link to="/todolist" className='link-css'><li><i className="fa-solid fa-list"></i>&nbsp; ToDo List</li></Link>
                )
            }
            <Link to="/team" className='link-css'><li><i className="fa-solid fa-people-group"></i>&nbsp; Team</li></Link>
            {
              isEmployee === "false"
                ?
                (
                  isPremium
                    ?
                    ("")
                    :
                    (
                      <Link to="/premium" className='link-css'><li><i className="fa-solid fa-hand-holding-dollar"></i>&nbsp; Buy Premium</li></Link >
                    )
                )
                :
                (
                  <Link to="/calendar" className='link-css'><li><i className="fa-regular fa-calendar-days"></i>&nbsp; Calendar</li></Link>
                )
            }
          </ul>


          <div className="btnContainer">
            <div className="tabs">
              <input type="radio" id="radio-1" name="tabs" onChange={() => { handleDarkMode(false) }} />
              <label className="tab" htmlFor="radio-1"><i className="fa-regular fa-lightbulb"></i>&nbsp; Light</label>
              <input type="radio" id="radio-2" name="tabs" onChange={() => { handleDarkMode(true) }} />
              <label className="tab" htmlFor="radio-2"><i className="fa-regular fa-moon"></i>&nbsp; Dark</label>
            </div>
          </div>

          <ul className='navbar-list-2'>
            <Link to="/settings" className='link-css'><li><i className="fa-solid fa-gears"></i>&nbsp; Settings</li></Link>
            <Link to="/logout" className='link-css'><li><i className="fa-solid fa-right-from-bracket"></i>&nbsp; Log Out</li></Link>
          </ul>

          <div className='proOrNot'>
            {
              isPremium
                ?
                <span>
                  PRO EDITION
                </span>
                :
                <span>
                  BUY PRO
                </span>
            }
          </div>
        </div >
      )
  )
}

export default Navbar;