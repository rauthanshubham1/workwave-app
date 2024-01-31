import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import "./CalendarLayout.css"
const CalendarLayout = ({ value, setChangeDate, darkMode }) => {

    return (
        darkMode
            ?
            <div className='calenderLayoutContainer'>
                <Calendar
                    value={value}
                    className="reactCalender-darkMode"
                    nextLabel="▶️"
                    next2Label="⏩"
                    prevLabel="◀️"
                    prev2Label="⏪"
                    onChange={setChangeDate}
                    tileClassName="calenderTile-darkMode"
                />
            </div>
            :
            <div className='calenderLayoutContainer'>
                <Calendar
                    value={value}
                    className="reactCalender"
                    nextLabel="▶️"
                    next2Label="⏩"
                    prevLabel="◀️"
                    prev2Label="⏪"
                    onChange={setChangeDate}
                />
            </div>
    )
}

export default CalendarLayout;