import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
} from "@mui/material";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: "", 
  });
  const [customers, setCustomers] = useState([]); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
    )
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setOpenSnackbar(true);
        setMsg("Failed to load customers!");
      });
  }, []);

  const handleSave = () => {
    if (
      !training.date ||
      !training.activity ||
      !training.duration ||
      !training.customer
    ) {
      setOpenSnackbar(true);
      setMsg("Please fill in all required fields!");
      return;
    }

    const newTraining = {
      ...training,
      date: new Date(training.date).toISOString(), 
    };

    props.saveTraining(newTraining);

    setOpen(false);
    setTraining({ date: "", activity: "", duration: "", customer: "" });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Training</Button>
      <Dialog open={open}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="datetime-local"
            value={training.date}
            onChange={(event) =>
              setTraining({ ...training, date: event.target.value })
            }
            variant="standard"
            margin="dense"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Activity"
            value={training.activity}
            onChange={(event) =>
              setTraining({ ...training, activity: event.target.value })
            }
            variant="standard"
            margin="dense"
            fullWidth
          />
          <TextField
            label="Duration (minutes)"
            type="number"
            value={training.duration}
            onChange={(event) =>
              setTraining({ ...training, duration: event.target.value })
            }
            variant="standard"
            margin="dense"
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Customer</InputLabel>
            <Select
              value={training.customer}
              onChange={(event) =>
                setTraining({ ...training, customer: event.target.value })
              }
              label="Customer"
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer._links.self.href}>
                  {customer.firstname} {customer.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={msg}
      />
    </>
  );
}
