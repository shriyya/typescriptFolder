import {
  fireEvent,
  getByText,
  render,
  screen,
  act,
} from "@testing-library/react";
import React from "react";
import TableView from "../components/TableView";
import "@testing-library/jest-dom";
import DialogBox from "../components/DailogBox";

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
describe("Dailog Componenet", () => {
  let value: dataFormate[] = [
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
    },
  ];
  const handleClose = jest.fn();

  it("dialog check add button is disabled ", async () => {
    render(<DialogBox data={value} header="Open form dialog to add data" />);

    const openDailog = await screen.findByText("Open form dialog to add data");
    fireEvent.click(openDailog);
    expect(
      await screen.findByRole("button", {
        name: /add details/i,
      })
    ).toBeDisabled();
  });

  it("dialog Box add button is enabled when data is added to each element", async () => {
    render(<DialogBox data={value} header="Open form dialog to add data" />);

    const openDailog = await screen.findByText("Open form dialog to add data");
    fireEvent.click(openDailog);
    const athlete = screen.findByLabelText("athlete");
    const age = screen.findByLabelText("age");
    const bronze = screen.findByLabelText("bronze");
    const country = screen.findByLabelText("country");
    const gold = screen.findByLabelText("gold");
    const silver = screen.findByLabelText("silver");
    const sport = screen.findByLabelText("sport");
    const total = screen.findByLabelText("total");
    const year = screen.findByLabelText("year");

    fireEvent.change(await athlete, {
      target: {
        value: "Sandra Wagner-Sachse",
      },
    });

    fireEvent.change(await age, {
      target: {
        value: 31,
      },
    });
    fireEvent.change(await bronze, {
      target: {
        value: 1,
      },
    });
    fireEvent.change(await gold, {
      target: {
        value: 0,
      },
    });
    fireEvent.change(await silver, {
      target: {
        value: 0,
      },
    });
    fireEvent.change(await total, {
      target: {
        value: 1,
      },
    });
    fireEvent.change(await country, {
      target: {
        value: "Germany",
      },
    });
    fireEvent.change(await sport, {
      target: {
        value: "Archery",
      },
    });
    expect(
      await screen.findByRole("button", {
        name: /add details/i,
      })
    ).toBeDisabled();

    fireEvent.change(await year, {
      target: {
        value: 2021,
      },
    });

    expect(
      await screen.findByRole("button", {
        name: /add details/i,
      })
    ).toBeEnabled();
  });

  it("dialog Box with all values present when clicked for update", async () => {
    let data = { data: { id: 3 } };
    render(<DialogBox selceted={data} header="Update" data={value} />);

    const openUpdateDailog = await screen.findByText(/update/i);
    fireEvent.click(openUpdateDailog);

    const year = screen.findByLabelText("year");

    fireEvent.change(await year, {
      target: {
        value: 2021,
      },
    });

    expect(
      await screen.findByRole("button", {
        name: /update/i,
      })
    ).toBeEnabled();
  });

  it("dailog box when clicked cancel button", async () => {
    let data = { data: { id: 3 } };
    let hgfg = true;
    render(
      <DialogBox
        onClose={handleClose}
        open={hgfg}
        selceted={data}
        header="Update"
        data={value}
      />
    );

    const openUpdateDailog = await screen.findByText(/update/i);
    fireEvent.click(openUpdateDailog);
    fireEvent.click(screen.getByTestId("cancel"), handleClose());
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
