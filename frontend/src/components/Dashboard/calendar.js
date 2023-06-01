import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import classes from "./calendar.module.css";

function DashboardCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className={classes.calendarContainer}>
      <Calendar
        locale="pt"
        onChange={onChange}
        value={date}
        className={classes.calendarClass}
        calendarType="US"
      />
    </div>
  );
}

export default DashboardCalendar;
