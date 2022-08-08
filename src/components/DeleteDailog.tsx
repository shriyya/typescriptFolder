import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import api from "../Api";

export default function DeleteDailog(prop) {
  const [open, setOpen] = React.useState(true);
  console.log(prop);

  const handleClose = () => {
    setOpen(false);
  };

  const deletItem = () => {
    handleClose();
    console.log(prop.store.prop.alldata);

    prop.store.prop.removeData(prop.store.prop.alldata.localStorageId);
    prop.deleteDailog(false);
    // api.valueDelete(localStorage.getItem("id"));
    // setTimeout(() => {
    //   api
    //     .valueGet()
    //     .then((res) => {
    //       // console.log(res);
    //       return res.json();
    //     })
    //     .then((res) => {
    //       // console.log(res);
    //       prop.dataChange(res);
    //       prop.deleteDailog(false);
    //     });
    // }, 1000);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} data-test-id="deletedailog">
        <DialogTitle>
          {prop.header === "Open form dialog to add data"
            ? "Details to be added"
            : prop.header}
        </DialogTitle>
        <DialogContent>
          <>Want to delete this item?</>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} data-testid="cancel">
            Cancel
          </Button>
          <Button onClick={deletItem} data-test-id="delete">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
