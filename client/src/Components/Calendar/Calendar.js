import React, { useState, useContext, useEffect } from 'react'
import Header from "../Header/Header"
import CalendarLayout from './Components/CalendarLayout'
import Events from './Components/Events'
import "./Calendar.css"
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from '../../Contexts/UserData/UserDataContext'
import LoadingBar from 'react-top-loading-bar'

const Calendar = () => {
    const [progress, setProgress] = useState(0);
    const { darkMode } = useContext(DarkModeContext);
    const { state } = useContext(UserDataContext);

    const [isPremium, setIsPremium] = useState(false);
    const [tasksOnDate, setTasksOnDate] = useState([]);
    const [value, setChangeDate] = useState(new Date());

    useEffect(() => {
        setProgress(70);
        setIsPremium(state.userData.isPremium);
        setProgress(100);
    }, [])

    useEffect(() => {
        setProgress(70);
        const date = getFormattedDate(value);
        setTasksOnDate([]);
        const allTask = state.userData.tasks;
        for (let i = 0; i < allTask.length; i++) {
            let taskObj = allTask[i];
            if (taskObj.taskDate === date) {
                setTasksOnDate(taskObj.task);
            }
        }
        setProgress(100);
    }, [value])


    const getFormattedDate = (value) => {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    return (
        true       // isEmployee
            ?
            (
                darkMode
                    ?
                    (
                        <div className='parentCalendarContainer-darkMode' >
                            <LoadingBar color={"red"} progress={progress}
                                onLoaderFinished={() => setProgress(0)} />
                            <Header darkMode={darkMode} heading="Calendar" />
                            <CalendarLayout
                                darkMode={darkMode}
                                value={value}
                                setChangeDate={setChangeDate}
                            />
                            <div className='eventsOnDate-darkMode'>
                                <h4>
                                    <hr />
                                    {getFormattedDate(value)}
                                    <hr />
                                </h4>

                                <div className={isPremium ? "" : 'eventsList-darkMode-withFilter'}>
                                    <ol className='eventsList-darkMode'>
                                        {
                                            tasksOnDate[0] === undefined ?
                                                "No task assigned"
                                                :
                                                tasksOnDate.map((taskObj, index) => {
                                                    return <Events key={index} event={taskObj.task} />
                                                })
                                        }
                                    </ol>
                                </div>
                            </div>
                        </div >
                    )
                    :
                    (
                        <div className='parentCalendarContainer' >
                            <LoadingBar color={"red"} progress={progress}
                                onLoaderFinished={() => setProgress(0)} />
                            <Header heading="Calendar" />
                            <CalendarLayout
                                value={value}
                                setChangeDate={setChangeDate}
                            />
                            <div className='eventsOnDate'>
                                <h4>
                                    <hr />
                                    {getFormattedDate(value)}
                                    <hr />
                                </h4>

                                <ol className='eventsList'>
                                    {
                                        tasksOnDate[0] === undefined ?
                                            "No task assigned"
                                            :
                                            tasksOnDate.map((taskObj, index) => {
                                                return <Events key={index} event={taskObj.task} />
                                            })
                                    }
                                </ol>
                            </div>
                        </div >
                    )
            )

            :       // else of isEmployee

            ("")
    )
}


export default Calendar;