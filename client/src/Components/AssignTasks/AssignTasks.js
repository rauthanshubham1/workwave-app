import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import Header from '../Header/Header'
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from '../../Contexts/UserData/UserDataContext'
import "./AssignTasks.css"
import ListItem from './ListItem/ListItem'

const AssignTasks = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { state } = useContext(UserDataContext);
    const [searchUser, setSearchUser] = useState("");
    const [allTeamMembers, setAllTeamMembers] = useState([]);
    const [inputTask, setInputTask] = useState("");

    const [selectedTeamMember, setSelectedTeamMember] = useState({ name: "", email: "" });
    const [seletedTeamMemberTasks, setSelectedTeamMemberTasks] = useState([]);

    const [selectDate, setSelectDate] = useState("");

    useEffect(() => {
        setAllTeamMembers(state.userData.teams);
    }, [])


    const todayDate = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const handleAddTaskButton = async () => {
        try {
            if (inputTask === "" || selectedTeamMember.name === "") {
                alert("Please fill the task");
            } else {
                if (seletedTeamMemberTasks[0] === undefined) {
                    const newArray = [
                        {
                            employeeEmail: selectedTeamMember.email,
                            taskDate: selectDate,
                            tasks: [{ task: inputTask.trim(), done: false }]
                        }
                    ];
                    setSelectedTeamMemberTasks(newArray);
                    // add to db
                    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/assignTask`, { taskDetails: newArray }, { withCredentials: true });
                    if (response.status === 200) {
                        alert("Task Assigned Successfully");
                    }
                }
                else {
                    const newArray = [
                        {
                            employeeEmail: selectedTeamMember.email,
                            taskDate: selectDate,
                            tasks: [...(seletedTeamMemberTasks[0].tasks), { task: inputTask.trim(), done: false }]
                        }
                    ]
                    setSelectedTeamMemberTasks(newArray);
                    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/assignTask`, { taskDetails: newArray }, { withCredentials: true });
                    if (response.status === 200) {
                        alert("Task Assigned");
                    }
                }
                setInputTask("");
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTask = async (index) => {
        seletedTeamMemberTasks[0].tasks.splice(index, 1)
        const modifiedArr = [
            {
                employeeEmail: selectedTeamMember.email,
                taskDate: selectDate,
                tasks: [...(seletedTeamMemberTasks[0].tasks)]
            }
        ]
        setSelectedTeamMemberTasks(modifiedArr);

        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/deleteTask`, { taskDetails: modifiedArr }, { withCredentials: true });

        if (response.status === 200) {
            alert("Task Deleted Successfully");
        }
    }

    const handleShowAllTasks = async () => {
        if (selectedTeamMember.name === "" || selectedTeamMember.email === "" || selectDate === "") {
            alert("Please select the required details of the person see tasks");
        } else {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/getTask?employeeEmail=${selectedTeamMember.email}&taskDate=${selectDate}`, { withCredentials: true });
            const data = response.data.message;
            if (data[0] === undefined) {
                setSelectedTeamMemberTasks([]);
            } else {
                setSelectedTeamMemberTasks(data);
            }
        }
    }

    const handleTaskInput = (e) => {
        setInputTask(e.target.value);
    }

    const handleSearchUser = (e) => {
        setSearchUser(e.target.value);
    }

    const handleSelectDateChange = (e) => {
        setSelectDate(e.target.value);
    }

    const handleSearchUserButton = async () => {
        if (searchUser !== "") {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/addTeamMember`, { searchUser }, { withCredentials: true });
            if (response.status === 200) {
                alert("Team Member successfully added");
            } else {
                alert("Error occurred");
            }
        } else {
            alert("Enter a valid email address");
        }
    }

    const handleSelectedTeamMember = (name, email) => {
        setSelectedTeamMember({ name, email });
    }

    return (
        darkMode
            ?
            (
                < div className='parentAssignTasksContainer-darkMode' >
                    <Header darkMode={darkMode} heading="Assign Tasks"></Header >
                    <div className='assignTasksContainer'>

                        <div className='assignTasksContainer1'>

                            <div className='addTeamMember'>
                                <input type="text" placeholder='Enter email to add in your team' onChange={handleSearchUser} value={searchUser} />
                                <button className="button-724" onClick={handleSearchUserButton}>Add</button>
                            </div>
                            {
                                allTeamMembers.map((member, index) => {
                                    return (<button key={index} className="button-34" onClick={() => { handleSelectedTeamMember(member.name, member.email) }}>{member.name}</button>)
                                })
                            }
                        </div>

                        <div className='assignTasksContainer2'>
                            <div className='taskAssigningContainer'>
                                <div className='taskAssigningContainerTitle-darkMode'>
                                    {
                                        selectedTeamMember.name ===
                                            ""
                                            ? "Select a team member"
                                            :
                                            `Tasks Assigned to ${selectedTeamMember.name}`
                                    }
                                    &nbsp;&nbsp;
                                    < input
                                        type="date"
                                        name=""
                                        id=""
                                        value={selectDate}
                                        onChange={handleSelectDateChange}
                                    />
                                    &nbsp;&nbsp;
                                    <button onClick={handleShowAllTasks}>Show</button>
                                </div>
                                <div className='taskAssigningContainerLists-darkMode'>
                                    <ol style={{ padding: "0 0 0 40px" }}>
                                        {
                                            seletedTeamMemberTasks[0]
                                                ?
                                                seletedTeamMemberTasks[0].tasks.map(
                                                    (taskObj, index) => {
                                                        return <ListItem
                                                            task={taskObj.task}
                                                            done={taskObj.done}
                                                            index={index}
                                                            key={index}
                                                            deleteTask={deleteTask}
                                                            todayDate={todayDate()}
                                                            selectDate={selectDate} />
                                                    }
                                                )
                                                :
                                                "No task assigned"
                                        }
                                    </ol>
                                </div>
                                <div className='taskAssigningContainerInputs-darkMode'>
                                    <textarea
                                        placeholder="Type task here"
                                        name=""
                                        cols="40"
                                        rows="7"
                                        style={{ "resize": "none" }}
                                        onChange={handleTaskInput}
                                        value={inputTask}
                                    />
                                    <div className='taskAssigningContainerInputs1'>
                                        {
                                            todayDate() === selectDate
                                                ?
                                                <button type="button" className='button-36' onClick={handleAddTaskButton} ><i className="fa-solid fa-plus"></i></button>
                                                :
                                                ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )

            :

            (
                < div className='parentAssignTasksContainer' >
                    <Header darkMode={darkMode} heading="Assign Tasks"></Header >
                    <div className='assignTasksContainer'>

                        <div className='assignTasksContainer1'>

                            <div className='addTeamMember'>
                                <input type="text" placeholder='Enter email to add in your team' onChange={handleSearchUser} value={searchUser} />
                                <button className="button-724" onClick={handleSearchUserButton}>Add</button>
                            </div>
                            {
                                allTeamMembers.map((member, index) => {
                                    return (<button key={index} className="button-34" onClick={() => { handleSelectedTeamMember(member.name, member.email) }}>{member.name}</button>)
                                })
                            }
                        </div>

                        <div className='assignTasksContainer2'>
                            <div className='taskAssigningContainer'>
                                <div className='taskAssigningContainerTitle'>
                                    {
                                        selectedTeamMember.name ===
                                            ""
                                            ? "Select a team member"
                                            :
                                            `Tasks Assigned to ${selectedTeamMember.name}`
                                    }
                                    &nbsp;&nbsp;
                                    < input
                                        type="date"
                                        name=""
                                        id=""
                                        value={selectDate}
                                        onChange={handleSelectDateChange}
                                    />
                                    &nbsp;&nbsp;
                                    <button onClick={handleShowAllTasks}>Show</button>
                                </div>
                                <div className='taskAssigningContainerLists'>
                                    <ol style={{ padding: "0 0 0 40px" }}>
                                        {
                                            seletedTeamMemberTasks[0]
                                                ?
                                                seletedTeamMemberTasks[0].tasks.map(
                                                    (taskObj, index) => {
                                                        return <ListItem
                                                            task={taskObj.task}
                                                            done={taskObj.done}
                                                            index={index}
                                                            key={index}
                                                            deleteTask={deleteTask}
                                                            todayDate={todayDate()}
                                                            selectDate={selectDate} />
                                                    }
                                                )
                                                :
                                                "No task assigned"

                                        }
                                    </ol>
                                </div>
                                <div className='taskAssigningContainerInputs'>
                                    <textarea
                                        placeholder="Type task here"
                                        name=""
                                        cols="40"
                                        rows="7"
                                        style={{ "resize": "none" }}
                                        onChange={handleTaskInput}
                                        value={inputTask}
                                    />
                                    <div className='taskAssigningContainerInputs1'>
                                        {
                                            todayDate() === selectDate
                                                ?
                                                <button type="button" className='button-36' onClick={handleAddTaskButton} ><i className="fa-solid fa-plus"></i></button>
                                                :
                                                ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )


    )
}

export default AssignTasks;


