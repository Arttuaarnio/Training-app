import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Statistics() {
  const [trainings, setTrainings] = useState([]);

  // hae treenit RESTin avulla
  useEffect(() => getTrainings(), []);

  const getTrainings = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings",
      { method: "GET" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTrainings(data);
      })
      .catch((err) => {});
  };

  // kokoa treenitiedot aktiviteetin mukaan
  const aggregatedData = [];
  trainings.forEach((training) => {
    const { activity, duration } = training; 
    const existing = aggregatedData.find((item) => item.activity === activity);
    if (existing) {
      existing.minutes += duration;
    } else {
      aggregatedData.push({ activity: activity, minutes: duration }); 
    }
  });

  return (
    <div className="ag-theme-material" style={{ width: 1285, height: 400 }}>
      <h2>Activity Statistics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={aggregatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="minutes" fill="#3788d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
