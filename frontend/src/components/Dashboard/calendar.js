import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

function DashboardCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="calendarContainer">
      <Calendar
        locale="pt"
        onChange={onChange}
        value={date}
        calendarType="US"
      />
    </div>
  );
}

export default DashboardCalendar;
