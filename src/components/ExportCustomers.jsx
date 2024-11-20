import React from "react";
import { CSVLink } from "react-csv";
import { Button, Snackbar } from "@mui/material";

export default function ExportCustomers({ customers }) {
  const csvHeaders = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Street Address", key: "streetaddress" },
    { label: "Postcode", key: "postcode" },
    { label: "City", key: "city" },
  ];

  const csvData = customers.map((customer) => ({
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
    streetaddress: customer.streetaddress,
    postcode: customer.postcode,
    city: customer.city,
  }));

  return (
    <>
      <Button>
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename="customers.csv"
          separator=";"
        >
          Export Customers
        </CSVLink>
      </Button>
    </>
  );
}
