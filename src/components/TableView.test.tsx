import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import React from "react";
import TableView from "./TableView";
import api from "../Api";
type dataFormate = { userId: number; id: number; title: string; body: string };
type apii = {
  valueGet: () => Promise<any>;
  valuePost: (userValue: {}) => void;
  valuePut: (id: number, userValue: {}) => void;
  valueDelete: (id: number) => void;
};
it("render ag-grid with data", () => {
  let value: dataFormate[] = [
    { userId: 10, id: 3, title: "hello", body: "good morning" },
  ];
  const { getByTestId } = render(<TableView data={value} />);
  const agGrid = getByTestId("ag-grid");
  expect(agGrid).toBeTruthy(); //to be appeared or tobefalsy
});
