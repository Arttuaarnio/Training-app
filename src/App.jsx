import { Link, Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>
      <header>
        <h1>Training Application</h1>
        <nav>
          <Link to={"/"}>  Customers  </Link>
          <Link to={"/Trainings"}>  Trainings  </Link>
          <Link to={"/Calendar"}>  Calendar  </Link>
          <Link to={"/Statistics"}>  Statistics  </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
