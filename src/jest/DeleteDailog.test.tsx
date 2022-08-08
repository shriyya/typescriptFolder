import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import DeleteDailog from "../components/DeleteDailog";

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
  beforeEach(() => {
    render(<DeleteDailog onClose={handleClose} data={value} />);
  });

  it("delete dailog box when clicked on delete button", async () => {
    expect("want to delete").toEqual("want to delete");
  });
  it("delete dialog Box when clicked cancel button", async () => {
    fireEvent.click(await screen.findByTestId("cancel"), handleClose());
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
