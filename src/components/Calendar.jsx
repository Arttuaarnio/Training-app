import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [trainings, setTrainings] = useState([]);

  // haetaan treenit
  useEffect(() => {
    const fetchTrainings = async () => {
      const response = await fetch(
        "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings"
      );
      const data = await response.json();
      setTrainings(data);
    };

    fetchTrainings();
  }, []);

  // sijoitetaan treenidata kalenteriin
  const events = trainings.map((training) => ({
    title: `${training.activity} (${training.customer?.firstname} ${training.customer?.lastname})`,
    start: new Date(training.date),
    end: new Date(
      new Date(training.date).getTime() + training.duration * 60000
    ),
  }));

  return (
    <div className="ag-theme-material" style={{ width: 1290, height: 600 }}>
      <h2>Training Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        defaultView="month"
        selectable={true}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#3788d8",
            color: "white",
            borderRadius: "5px",
            padding: "1px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          },
        })}
      />
    </div>
  );
}
