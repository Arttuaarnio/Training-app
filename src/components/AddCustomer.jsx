import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {
  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState({});

  const handleSave = () => {
    props.saveCustomer(customer);
    setOpen(false);
    setCustomer({});
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add customer</Button>
      <Dialog open={open}>
        <DialogTitle> New Customer</DialogTitle>
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
          <Button onClick={() => handleSave()}>Save</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
