import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { format } from "date-fns";
import AddTraining from "./AddTraining";

export default function Trainings() {
  //muuttujat treeneille
  const [trainings, setTrainings] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msg, setMsg] = useState("");

  //ag-grid treeneille
  const [colDefs, setColDefs] = useState([
    {
      field: "date",
      sortable: true,
      flex: 1,
      filter: true,
      valueFormatter: (params) =>
        format(new Date(params.value), "dd/MM/yy hh:mm"),
    },
    { field: "duration", sortable: true, filter: true, flex: 1 },
    { field: "activity", sortable: true, filter: true, flex: 1 },
    {
      headerName: "Customer Name",
      valueGetter: (params) =>
        `${params.data.customer?.firstname || ""} ${
          params.data.customer?.lastname || ""
        }`,
      flex: 1,
    },
    {
      cellRenderer: (params) => {
        return (
          <Button
            size="small"
            color="error"
            onClick={() => deleteTraining(params)}
          >
            Delete
          </Button>
        );
      },
      flex: 1,
    },
  ]);

  //hae treenit REST:in avulla
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

  //lisää treeni
  const saveTraining = (training) => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(training),
      }
    )
      .then((response) => {
        if (!response.ok) {
          setOpenSnackbar(true);
          setMsg("Something went wrong!");
        } else {
          setOpenSnackbar(true);
          setMsg("Training added successfully!");
          getTrainings();
        }
      })
      .catch((err) => console.error("Error saving training:", err));
  };

  //poista treeni
  const deleteTraining = (params) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this training?`
    );

    if (confirmDelete) {
      fetch(
        `https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${params.data.id}`,
        { method: "DELETE" }
      )
        .then((response) => {
          if (response.ok) {
            setOpenSnackbar(true);
            setMsg("Training deleted succesfully!");
            getTrainings();
          } else {
            setMsg("Failed to delete the training!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
    <h2>Trainings</h2>
      <AddTraining saveTraining={saveTraining} />

      <div className="ag-theme-material" style={{ width: 1400, height: 400 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={5}
          paginationPageSizeSelector={false}
        ></AgGridReact>
        <Snackbar
          open={openSnackbar}
          message={msg}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        ></Snackbar>
      </div>
    </>
  );
}
