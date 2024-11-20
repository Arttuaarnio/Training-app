import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function EditCustomer(props) {
  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState({});

  const handleDialogOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: props.params.data.firstname,
      lastname: props.params.data.lastname,
      streetaddress: props.params.data.streetaddress,
      postcode: props.params.data.postcode,
      city: props.params.data.city,
      email: props.params.data.email,
      phone: props.params.data.phone,
    });
  };

  const handleSave = () => {
    const updatedCustomer = { ...props.params.data, ...customer };
    props.updateCustomer(updatedCustomer);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => handleDialogOpen(true)}>Edit</Button>
      <Dialog open={open}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            label="First name"
            value={customer.firstname}
            variant="standard"
            onChange={(event) =>
              setCustomer({ ...customer, firstname: event.target.value })
            }
            margin="dense"
            fullWidth
          />
          <TextField
            label="Last name"
            value={customer.lastname}
            variant="standard"
            onChange={(event) =>
              setCustomer({ ...customer, lastname: event.target.value })
            }
            margin="dense"
            fullWidth
          />
          <TextField
            label="Street Address"
            value={customer.streetaddress}
            variant="standard"
            onChange={(event) =>
              setCustomer({ ...customer, streetaddress: event.target.value })
            }
            margin="dense"
            fullWidth
          />
          <TextField
            label="Postcode"
            value={customer.postcode}
            variant="standard"
            onChange={(event) =>
              setCustomer({ ...customer, postcode: event.target.value })
            }
            margin="dense"
            fullWidth
          />
          <TextField
            label="City"
            value={customer.city}
            variant="standard"
            onChange={(event) =>
              setCustomer({ ...customer, city: event.target.value })
            }
            margin="dense"
            fullWidth
          />
          <TextField
            label="Email"
            value={customer.email}
            variant="standard"
            onChange={(event) =>
              setCustomer({ ...customer, email: event.target.value })
            }
            margin="dense"
            fullWidth
          />
          <TextField
            label="Phone"
            value={customer.phone}
            variant="standard"
            onChange={(event) =>
              setCustomer({ ...customer, phone: event.target.value })
            }
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={() => setOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
