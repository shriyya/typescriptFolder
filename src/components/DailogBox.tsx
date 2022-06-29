import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import api from "../Api";

export default function DialogBox(prop) {
  const [open, setOpen] = React.useState(false);
  // if (prop.setOpen) console.log("open is working");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [userValue, setUserValue] = useState<{
    userId: string;
    body: any;
    title: any;
  }>(
    prop.selceted
      ? {
          userId: prop.selceted.data.price,
          body: prop.selceted.data.model,
          title: prop.selceted.data.make,
        }
      : {
          userId: "",
          body: "",
          title: "",
        }
  );

  const createNewRowData = (userValue, id?) => {
    const newData = {
      userId: userValue.userId,
      body: userValue.body,
      title: userValue.title,
      id: id,
    };

    if (userValue) {
      // console.log(userValue, newData, prop.data);
      {
        id ? api.valuePut(id, newData) : null;
      }

      setTimeout(() => {
        api
          .valueGet()
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            // console.log(res);
            prop.dataChange(res);
          });
      }, 1000);
    }

    return newData;
  };

  const addItems = () => {
    // console.log(userValue, prop.gridRef.current);
    handleClose();
    api
      .valuePost(userValue)
      .then(function (result) {
        return result.json();
      })
      .then((res) => {
        return res;
      });
    createNewRowData(userValue);
    setUserValue({
      userId: "",
      body: "",
      title: "",
    });
    const res = prop.gridRef.current!.api.applyTransaction({
      add: userValue,
    })!;
    setUserValue({
      userId: "",
      body: "",
      title: "",
    });
  };

  const updateItems = () => {
    handleClose();
    createNewRowData(userValue, prop.selceted.data.id);
    setUserValue({
      userId: "",
      body: "",
      title: "",
    });
    const res = prop.gridRef.current!.api.applyTransaction({
      update: userValue,
    })!;
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {prop.header}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle data-testid="dialogBox">
          {prop.header === "Open form dialog to add data"
            ? "Details to be added"
            : prop.header}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Details to be added</DialogContentText> */}

          <TextField
            autoFocus
            margin="dense"
            id="userId"
            label="UserId"
            type="text"
            fullWidth
            value={userValue.userId}
            onChange={(e) =>
              setUserValue({ ...userValue, userId: e.target.value })
            }
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={userValue.title}
            onChange={(e) => {
              // console.log(userValue, e.target.value);

              setUserValue({ ...userValue, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            variant="standard"
            value={userValue.body}
            onChange={(e) =>
              setUserValue({ ...userValue, body: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} data-testid="cancel">
            Cancel
          </Button>

          <Button
            disabled={
              userValue.userId === "" ||
              userValue.title === "" ||
              userValue.body === ""
            }
            onClick={
              prop.header === "Open form dialog to add data"
                ? addItems
                : updateItems
            }
          >
            {prop.header === "Open form dialog to add data"
              ? "Add Details"
              : prop.header}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
