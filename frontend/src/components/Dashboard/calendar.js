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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Calendar locale="pt" onChange={onChange} value={date} />
    </div>
  );
}

export default DashboardCalendar;
