import React, { useState, useEffect } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./calendarListaOrdens.css";
import { CalendarPlus } from "@phosphor-icons/react";
import moment from "moment";

function DateRangePickerOrdens() {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: moment().subtract(0, "days"),
    endDate: moment(),
  });

  useEffect(() => {
    const updateDateRange = () => {
      const startDate = selectedDateRange.startDate.format("DD/MM/YYYY");
      const endDate = selectedDateRange.endDate.format("DD/MM/YYYY");
      const dateRange = startDate + " - " + endDate;
      document.getElementById("dateRangePicker").value = dateRange;
    };

    updateDateRange();
  }, [selectedDateRange]);

  const handleDateRangeChange = (start, end) => {
    setSelectedDateRange({
      startDate: start,
      endDate: end,
    });
  };

  const predefinedRanges = {
    Hoje: [moment().subtract(0, "days"), moment().endOf("day")],
    "Últimos 7 Dias": [moment().subtract(7, "days"), moment().endOf("day")],
    "Últimos 30 Dias": [moment().subtract(30, "days"), moment().endOf("day")],
    "Este Mês": [moment().startOf("month"), moment().endOf("day")],
    "Mês Passado": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  };

  const localeConfig = {
    format: "DD/MM/YYYY",
    separator: " - ",
    applyLabel: "Aplicar",
    cancelLabel: "Cancelar",
    weekLabel: "W",
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    daysOfWeek: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    locale: "PT-PT",
    customRangeLabel: "Data Personalizada",
  };

  return (
    <div>
      <DateRangePicker
        className="daterangepicker"
        initialSettings={{
          startDate: selectedDateRange.startDate,
          endDate: selectedDateRange.endDate,
          locale: localeConfig,
          ranges: predefinedRanges,
        }}
        onCallback={handleDateRangeChange}
      >
        <div className="input-group">
          <span
            className="input-group-text"
            style={{ backgroundColor: "#dad7cd" }}
          >
            <CalendarPlus />
          </span>
          <input
            id="dateRangePicker"
            type="text"
            className="form-control"
            style={{ width: "13.1em" }}
            readOnly
          />
        </div>
      </DateRangePicker>
    </div>
  );
}

export default DateRangePickerOrdens;
