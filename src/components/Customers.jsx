import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import { CSVLink } from "react-csv";
import ExportCustomers from "./ExportCustomers";

export default function Customers() {
  //muuttujat asiakkaille
  const [customers, setCustomers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msg, setMsg] = useState("");

  //ag-grid asiakkaille
  const [colDefs, setColDefs] = useState([
    { field: "firstname", flex: 1, sortable: true, filter: true },
    { field: "lastname", flex: 1, sortable: true, filter: true },
    { field: "email", flex: 1, sortable: true, filter: true },
    { field: "phone", flex: 1, sortable: true, filter: true },
    { field: "streetaddress", flex: 1, sortable: true, filter: true },
    { field: "postcode", flex: 1, sortable: true, filter: true },
    { field: "city", flex: 1, sortable: true, filter: true },
    {
      cellRenderer: (params) => (
        <EditCustomer params={params} updateCustomer={updateCustomer} />
      ),
      flex: 1,
    },
    {
      cellRenderer: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteCustomer(params)}
        >
          Delete
        </Button>
      ),
      flex: 1,
    },
  ]);

  //hae asiakkaat REST:in avulla
  useEffect(() => getCustomers(), []);

  const getCustomers = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers",
      { method: "GET" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data._embedded.customers);
        setCustomers(data._embedded.customers);
      })
      .catch((err) => {});
  };

  //lisää asiakas
  const saveCustomer = (customer) => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(customer),
      }
    )
      .then((response) => {
        if (!response.ok) {
          setOpenSnackbar(true);
          setMsg("Something went wrong!");
        } else {
          setOpenSnackbar(true);
          setMsg("Customer added succesfully!");
          getCustomers();
        }
      })
      .catch((err) => console.error(err.data));
  };

  //poista asiakas
  const deleteCustomer = (params) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${params.data.firstname} ${params.data.lastname}?`
    );

    if (confirmDelete) {
      fetch(params.data._links.self.href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setOpenSnackbar(true);
            setMsg("Customer deleted succesfully!");
            getCustomers();
          } else {
            console.error("Failed to delete the customer!");
            setOpenSnackbar(false);
          }
        })
        .catch((err) => console.error("Error:", err));
    }
  };

  //muokkaa asiakasta
  const updateCustomer = (customer) => {
    fetch(customer._links.self.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          setOpenSnackbar(true);
          setMsg("Customer updated successfully!");
          getCustomers();
        } else {
          setOpenSnackbar(true);
          setMsg("Something went wrong!");
        }
      })
      .catch((err) => console.error(err));
  };  

  return (
    <>
    <h2>Customers</h2>
      <AddCustomer saveCustomer={saveCustomer} />
      <ExportCustomers customers={customers} />

      <div className="ag-theme-material" style={{ width: 1400, height: 400 }}>
        <AgGridReact
          rowData={customers}
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
