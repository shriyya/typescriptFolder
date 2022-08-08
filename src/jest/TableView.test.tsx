import {
  fireEvent,
  getByText,
  render,
  screen,
  within,
} from "@testing-library/react";
import React from "react";
import TableView from "../components/TableView";
import "@testing-library/jest-dom";
import DialogBox from "../components/DailogBox";
import { AgGridReact } from "ag-grid-react";
import { SpyInstance } from "./util/SpyInstance";
import userEvent from "@testing-library/user-event";
import { Selector } from "testcafe";

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
  id: number;
}

describe("TableView Componenet", () => {
  // let value: dataFormate[] = [
  //   { userId: 10, id: 3, title: "hello", body: "good morning" },
  // ];
  let prop = {
    alldata: {
      data: [
        {
          age: 23,
          athlete: "Rod White",
          bronze: 1,
          country: "United States",
          gold: 0,
          silver: 0,
          sport: "Archery",
          total: 1,
          year: 2000,
          id: 4,
          mech: 1,
        },
        {
          age: 31,
          athlete: "Sandra Wagner-Sachse",
          bronze: 1,
          country: "Germany",
          gold: 0,
          silver: 0,
          sport: "Archery",
          total: 1,
          year: 2000,
          id: 2,
          mech: 2,
        },
      ],
      localStorageId: 5,
      localStorageValue: "string",
    },
    fetchData(): any {},
    fetchMech(): any {},
    addData(): any {},
    fetchMechDesign(): any {},
    updateData(): any {},
    removeData(): any {},
    localStorageId(number: any): any {},
  };

  beforeEach(async () => {
    render(<TableView prop={prop} />);
  });

  // it("render ag-grid with data passed to gird title", async () => {
  //   // const agGrid = getByTestId("ag-grid");
  //   // screen.debug(undefined, Infinity);
  //   // expect(agGrid).toBeTruthy(); //to be appeared or tobefalsy
  //   let view = render(<TableView prop={prop} />);
  //   expect(
  //     await view.findByRole("gridcell", {
  //       name: /missy franklin/i,
  //     })
  //   ).toHaveAccessibleName("missy franklin");
  // });

  // it("render ag-grid columns headers passed", async () => {
  //   const columnheader = screen.getByRole("columnheader", {
  //     name: /age/i,
  //   });

  //   // within(columnheader).getByText(/age/i);
  //   expect(within(columnheader).getByText(/age/i)).toHaveAccessibleName(
  //     /athlete/i
  //   );
  // });

  it("check button Open form dialog to add data is enabled or not", async () => {
    expect(screen.getByText("Open form dialog to add data")).toBeEnabled(); //to be appeared or tobefalsy
    expect(
      await screen.findByText("Open form dialog to add data")
    ).toBeEnabled(); //this is with await
  });

  describe("on click of add and upload button functionality", () => {
    it("while clicking on Open form dialog to add data will open dailog box for adding values", async () => {
      // let ChangeDataValue: dataFormate = {
      //   userId: 11,
      //   id: 4,
      //   title: "hello we added",
      //   body: "good evening",
      // };
      const openDailog = await screen.findByText(
        "Open form dialog to add data"
      );
      expect(openDailog).toBeEnabled();
      fireEvent.click(openDailog);
      expect(await screen.findByTestId("dialogBox")).toHaveAccessibleName(
        "Details to be added"
      );
    });

    // it("while clicking on update will open dailog box for updating values", async () => {
    //   // const openUpdateDailog = await screen.findByRole("gridcell", {
    //   //   name: /update/i,
    //   // });
    //   render(<TableView prop={prop} />);

    //   // const row = screen.findByRole("row", {
    //   //   name: /press space to deselect this row\./i,
    //   // });

    //   let ree = await screen.findByTestId("buttonDialogUpdate");
    //   // expect(openUpdateDailog).toBeEnabled();
    //   fireEvent.click(await ree);
    //   expect(await screen.findByTestId("dialogBox")).toHaveAccessibleName(
    //     /update/i
    //   );
    // });
  });
});
