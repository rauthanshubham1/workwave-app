import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import Header from "../Header/Header"
import "./ToDoList.css"
import Task from './Task/Task'
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from '../../Contexts/UserData/UserDataContext'
import LoadingBar from 'react-top-loading-bar'

const ToDoList = () => {
    const [progress, setProgress] = useState(0);
    const { darkMode } = useContext(DarkModeContext);
    const { state, dispatch } = useContext(UserDataContext);

    const [tasks, setTasks] = useState([]);
    const [isPremium, setIsPremium] = useState(false);

    const todayDate = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const setTodaysTasks = (date) => {
        const userTasksArray = state.userData.tasks;
        if (userTasksArray[0] === undefined) {
            setTasks([]);
        } else {
            const length = userTasksArray.length;
            const latestTaskObj = userTasksArray[length - 1];
            if (latestTaskObj.taskDate === date) {
                setTasks(latestTaskObj.task);
            } else {
                setTasks([]);
            }
        }
    }

    const handleTaskDone = async (index, done) => {
        try {
            var newTaskArr = [];
            for (let i = 0; i < tasks.length; i++) {
                if (i === index) {
                    tasks[index].done = !done;
                }
                newTaskArr.push(tasks[i]);
            }
            setTasks(newTaskArr);

            state.userData.tasks[state.userData.tasks.length - 1].task = newTaskArr;
            dispatch({ type: "LOGIN", payload: { userData: state.userData, isAuthenticated: true } });

            const isEmployee = localStorage.getItem("isEmployee");
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/updateTodayTasks?isEmployee=${isEmployee}`, { todayDate: todayDate(), updatedTasksArr: newTaskArr }, { withCredentials: true });
            if (response.status === 200) {
                console.log("Task Updated");
            }
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        setProgress(70);
        const date = todayDate();
        setTodaysTasks(date);
        setIsPremium(state.userData.isPremium);
        setProgress(100);
    }, [])

    return (
        darkMode ?
            <div className='parentToDoContainer-darkMode'>
                <LoadingBar color={"red"} progress={progress}
                    onLoaderFinished={() => setProgress(0)} />
                <Header darkMode={darkMode} heading="ToDoList"></Header>
                <div className='todoContainer-darkMode'>
                    <div className='todoContainer1-darkMode'>
                        <h4>Tasks For Today</h4>
                        <div className='todayEvents'>

                            {
                                tasks[0] === undefined
                                    ?
                                    <h4 style={{ marginLeft: "30px", textDecoration: "none" }}>No task assigned</h4>
                                    :
                                    tasks.map((taskObj, index) => {
                                        return <Task handleTaskDone={handleTaskDone} key={index} taskId={index} task={taskObj.task} done={taskObj.done} darkMode="-darkMode" isPremium={isPremium} />
                                    })
                            }

                        </div>
                        <h4>{isPremium === false && tasks.length > 4 ? "Buy premium to view all tasks" : ""}</h4>
                    </div>
                </div>
            </div >

            :

            <div className='parentToDoContainer'>
                <LoadingBar color={"red"} progress={progress}
                    onLoaderFinished={() => setProgress(0)} />
                <Header darkMode={darkMode} heading="ToDoList"></Header>
                <div className='todoContainer'>
                    <div className='todoContainer1'>
                        <h4>Tasks For Today</h4>
                        <div className='todayEvents'>

                            {
                                tasks[0] === undefined
                                    ?
                                    <h4 style={{ marginLeft: "30px", textDecoration: "none" }}>No task assigned</h4>
                                    :
                                    tasks.map((taskObj, index) => {
                                        return <Task key={index} taskId={index} task={taskObj.task} done={taskObj.done} darkMode="" isPremium={isPremium} />
                                    })
                            }

                        </div>
                        <h4>{isPremium === false && tasks.length >= 4 ? "Buy premium to view all tasks" : ""}</h4>
                    </div>
                </div>
            </div >
    )
}

export default ToDoList;