import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function DashboardCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
}

export default DashboardCalendar;
