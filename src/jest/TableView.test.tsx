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

type dataFormate = { userId: number; id: number; title: string; body: string };
describe("TableView Componenet", () => {
  let value: dataFormate[] = [
    { userId: 10, id: 3, title: "hello", body: "good morning" },
  ];

  beforeEach(async () => {
    render(<TableView data={value} />);
  });

  it("render ag-grid with data passed to gird title", async () => {
    // const agGrid = getByTestId("ag-grid");
    // screen.debug(undefined, Infinity);
    // expect(agGrid).toBeTruthy(); //to be appeared or tobefalsy
    expect(
      await screen.findByRole("gridcell", {
        name: "good morning",
      })
    ).toHaveAccessibleName("good morning");
  });

  it("render ag-grid columns headers passed", async () => {
    const row = screen.getByRole("row", {
      name: /athlete button model price year date/i,
    });
    expect(
      within(row).getByRole("columnheader", {
        name: /athlete/i,
      })
    ).toHaveAccessibleName(/athlete/i);
  });

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

    it("while clicking on update will open dailog box for updating values", async () => {
      const openUpdateDailog = await screen.findByText(/update/i);
      expect(openUpdateDailog).toBeEnabled();
      fireEvent.click(openUpdateDailog);
      expect(await screen.findByTestId("dialogBox")).toHaveAccessibleName(
        /update/i
      );
    });
  });
});
