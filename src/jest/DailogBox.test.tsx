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

type dataFormate = { userId: number; id: number; title: string; body: string };
describe("Dailog Componenet", () => {
  let value: dataFormate[] = [
    { userId: 10, id: 3, title: "hello", body: "good morning" },
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
    const userId = screen.findByLabelText("UserId");

    fireEvent.change(await userId, {
      target: {
        value: "Sample list UserId",
      },
    });
    expect(
      await screen.findByRole("button", {
        name: /add details/i,
      })
    ).toBeDisabled();
    const title = screen.findByLabelText("Title");

    fireEvent.change(await title, {
      target: {
        value: "Sample Text",
      },
    });
    expect(
      await screen.findByRole("button", {
        name: /add details/i,
      })
    ).toBeDisabled();
    const body = screen.findByLabelText("Body");

    fireEvent.change(await body, {
      target: {
        value: "Sample Body text",
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

    const userId = screen.findByLabelText("UserId");

    fireEvent.change(await userId, {
      target: {
        value: "10",
      },
    });

    const title = screen.findByLabelText("Title");

    fireEvent.change(await title, {
      target: {
        value: "hello",
      },
    });

    const body = screen.findByLabelText("Body");

    fireEvent.change(await body, {
      target: {
        value: "good morning",
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
