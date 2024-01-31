import React from 'react'

const Task = ({ handleTaskDone, taskId, task, done, darkMode, isPremium }) => {

    return (
        isPremium
            ?
            (
                <div className={`checkbox-wrapper-15${darkMode}`}>
                    <input
                        className="inp-cbx"
                        id={`cbx-${taskId}`}
                        type="checkbox"
                        style={{ "display": "none" }}
                        onChange={() => handleTaskDone(taskId, done)}
                        checked={done ? true : false}
                    />
                    <label className="cbx" htmlFor={`cbx-${taskId}`}>
                        <span>
                            <svg width="12px" height="9px" viewBox="0 0 12 9">
                                <polyline points="1 5 4 8 11 1"></polyline>
                            </svg>
                        </span>
                        <span>{task}</span>
                    </label>
                </div>
            )
            :
            (
                taskId + 1 <= 4
                    ?
                    <div className={`checkbox-wrapper-15${darkMode}`}>
                        <input
                            className="inp-cbx"
                            id={`cbx-${taskId}`}
                            type="checkbox"
                            style={{ "display": "none" }}
                            onChange={() => handleTaskDone(taskId, done)}
                            checked={done ? true : false}
                        />
                        <label className="cbx" htmlFor={`cbx-${taskId}`}>
                            <span>
                                <svg width="12px" height="9px" viewBox="0 0 12 9">
                                    <polyline points="1 5 4 8 11 1"></polyline>
                                </svg>
                            </span>
                            <span>{task}</span>
                        </label>
                    </div>
                    :
                    ""
            )
    )
}

export default Task