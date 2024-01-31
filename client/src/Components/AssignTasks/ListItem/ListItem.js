import React from 'react';

const ListItem = ({ task, done, index, deleteTask, todayDate, selectDate }) => {
    return (
        <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '20px' }}>
            {task}
            &nbsp;
            {todayDate === selectDate ? (
                <div style={{ display: 'flex', flex: '0 0 auto', width: '40px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <i className="fa-solid fa-trash" onClick={() => deleteTask(index)}></i>
                    {
                        done === true
                            ?
                            <i className="fa-solid fa-check"></i>
                            :
                            <i className="fa-solid fa-xmark"></i>

                    }
                </div>
            ) : (
                ''
            )}
        </li>
    );
};

export default ListItem;
