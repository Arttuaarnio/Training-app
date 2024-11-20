import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error.jsx";
import Customers from "./components/customers.jsx";
import Trainings from "./components/trainings.jsx";
import Statistics from "./components/Statistics.jsx";
import Calendar from "./components/Calendar.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Customers />,
        index: true,
      },
      {
        path: "Trainings",
        element: <Trainings />,
      },
      {
        path: "Calendar",
        element: <Calendar />,
      },
      {
        path: "Statistics",
        element: <Statistics />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
