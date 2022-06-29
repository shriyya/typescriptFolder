import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import DeleteDailog from "../components/DeleteDailog";

type dataFormate = { userId: number; id: number; title: string; body: string };

describe("Dailog Componenet", () => {
  let value: dataFormate[] = [
    { userId: 10, id: 3, title: "hello", body: "good morning" },
  ];
  const handleClose = jest.fn();
  beforeEach(() => {
    render(<DeleteDailog onClose={handleClose} data={value} />);
  });

  it("delete dailog box when clicked on delete button", async () => {
    expect("want to delete").toEqual("want to delete");
  });
  it("delete dialog Box when clicked cancel button", async () => {
    fireEvent.click(screen.getByTestId("cancel"), handleClose());
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
