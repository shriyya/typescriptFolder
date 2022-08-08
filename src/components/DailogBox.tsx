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
// import api from "../Api";
import { useDispatch } from "react-redux";
interface dataFormate {
  athlete: string;
  age: number;
  country: string;
  year: number;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}
export default function DialogBox(prop) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const [userValue, setUserValue] = useState<{
    athlete: string;
    age: number;
    country: string;
    year: number;
    sport: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  }>(
    prop.selceted
      ? {
          athlete: prop.selceted.data.athlete,
          age: prop.selceted.data.age,
          country: prop.selceted.data.country,
          year: prop.selceted.data.year,
          sport: prop.selceted.data.sport,
          gold: prop.selceted.data.gold,
          silver: prop.selceted.data.silver,
          bronze: prop.selceted.data.bronze,
          total: prop.selceted.data.total,
        }
      : {
          athlete: "",
          age: null,
          country: "",
          year: null,
          sport: "",
          gold: null,
          silver: null,
          bronze: null,
          total: null,
        }
  );

  const createNewRowData = (userValue, id?) => {
    const newData = {
      athlete: userValue.athlete,
      age: userValue.age,
      country: userValue.country,
      year: userValue.year,
      sport: userValue.sport,
      gold: userValue.gold,
      silver: userValue.silver,
      bronze: userValue.bronze,
      total: userValue.total,
      id: id,
    };

    if (userValue) {
      // console.log(userValue, newData, prop.data);
      // console.log(newData);

      {
        id ? prop.store.prop.updateData(newData) : null;
      }

      setUserValue({
        athlete: "",
        age: null,
        country: "",
        year: null,
        sport: "",
        gold: null,
        silver: null,
        bronze: null,
        total: null,
      });

      return newData;
    }
    setUserValue({
      athlete: "",
      age: null,
      country: "",
      year: null,
      sport: "",
      gold: null,
      silver: null,
      bronze: null,
      total: null,
    });
  };
  const addItems = () => {
    // console.log(userValue, prop.gridRef.current);
    handleClose();
    prop.store.prop.addData(userValue);
    // api
    //   .valuePost(userValue)
    //   .then(function (result) {
    //     return result.json();
    //   })
    //   .then((res) => {
    //     return res;
    //   });
    createNewRowData(userValue);

    // const res = prop.gridRef.current!.api.applyTransaction({
    //   add: userValue,
    // })!;
  };

  const updateItems = () => {
    handleClose();
    createNewRowData(userValue, prop.selceted.data.id);

    // const res = prop.gridRef.current!.api.applyTransaction({
    //   update: userValue,
    // })!;
  };
  // console.log(prop);

  return (
    <div>
      <Button
        data-test-id={
          prop.header === "Open form dialog to add data"
            ? "open"
            : prop.selceted
            ? "buttonDialogUpdate"
            : null
        }
        variant="outlined"
        onClick={handleClickOpen}
      >
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
            data-test-id="athlete"
            autoFocus
            margin="dense"
            id="athlete"
            label="athlete"
            type="text"
            fullWidth
            value={userValue.athlete}
            onChange={(e) =>
              setUserValue({ ...userValue, athlete: e.target.value })
            }
            variant="standard"
          />{" "}
          <TextField
            data-test-id="age"
            autoFocus
            margin="dense"
            id="age"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            label="age"
            type="number"
            fullWidth
            value={userValue.age}
            onChange={(e) =>
              setUserValue({ ...userValue, age: parseInt(e.target.value) })
            }
            variant="standard"
          />{" "}
          <TextField
            data-test-id="country"
            autoFocus
            margin="dense"
            id="country"
            label="country"
            type="text"
            fullWidth
            value={userValue.country}
            onChange={(e) =>
              setUserValue({ ...userValue, country: e.target.value })
            }
            variant="standard"
          />{" "}
          <TextField
            data-test-id="year"
            autoFocus
            margin="dense"
            id="year"
            label="year"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            type="number"
            fullWidth
            value={userValue.year}
            onChange={(e) =>
              setUserValue({ ...userValue, year: parseInt(e.target.value) })
            }
            variant="standard"
          />{" "}
          <TextField
            data-test-id="sport"
            autoFocus
            margin="dense"
            id="sport"
            label="sport"
            type="text"
            fullWidth
            variant="standard"
            value={userValue.sport}
            onChange={(e) => {
              // console.log(userValue, e.target.value);

              setUserValue({ ...userValue, sport: e.target.value });
            }}
          />{" "}
          <TextField
            data-test-id="gold"
            autoFocus
            margin="dense"
            id="gold"
            label="gold"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            type="number"
            fullWidth
            variant="standard"
            value={userValue.gold}
            onChange={(e) => {
              // console.log(userValue, e.target.value);

              setUserValue({ ...userValue, gold: parseInt(e.target.value) });
            }}
          />{" "}
          <TextField
            data-test-id="silver"
            autoFocus
            margin="dense"
            id="silver"
            label="silver"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            type="number"
            fullWidth
            variant="standard"
            value={userValue.silver}
            onChange={(e) => {
              // console.log(userValue, e.target.value);

              setUserValue({ ...userValue, silver: parseInt(e.target.value) });
            }}
          />{" "}
          <TextField
            data-test-id="bronze"
            autoFocus
            margin="dense"
            id="bronze"
            label="bronze"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            type="number"
            fullWidth
            variant="standard"
            value={userValue.bronze}
            onChange={(e) => {
              // console.log(userValue, e.target.value);

              setUserValue({ ...userValue, bronze: parseInt(e.target.value) });
            }}
          />
          <TextField
            data-test-id="total"
            autoFocus
            margin="dense"
            id="total"
            label="total"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            type="number"
            fullWidth
            variant="standard"
            value={userValue.total}
            onChange={(e) =>
              setUserValue({ ...userValue, total: parseInt(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} data-testid="cancel">
            Cancel
          </Button>

          <Button
            data-test-id="buttonAddUpdate"
            disabled={
              userValue.athlete === "" ||
              userValue.age === null ||
              userValue.country === "" ||
              userValue.year === null ||
              userValue.sport === "" ||
              userValue.gold === null ||
              userValue.silver === null ||
              userValue.bronze === null ||
              userValue.total === null
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
