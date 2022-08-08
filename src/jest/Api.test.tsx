import { cleanup } from "@testing-library/react";
import api from "../Api";

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         title: "jhbhj",
//         userId: 10,
//         body: "hvjh",
//       }),
//   })
// ) as jest.Mock;

beforeEach(() => {
  cleanup();
});

describe("withFetch", () => {
  test("get ", async () => {
    const fetchMock = jest.spyOn(global, "fetch");
    const json = await api.valueGet();
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:4002/olympic");

    expect(fetchMock).toBeTruthy();
  });
  test("post", async () => {
    const fetchMock = jest.spyOn(global, "fetch");
    const json = await api.valuePost({
      title: "jhbhj",
      userId: 10,
      body: "hvjh",
    });
    expect(fetchMock).toHaveBeenCalled();

    expect(fetchMock).toBeTruthy();
  });
  test("update", async () => {
    const fetchMock = jest.spyOn(global, "fetch");
    const json = await api.valuePut(18, {
      title: "jhbhj",
      userId: 10,
      body: "hvjh",
    });
    expect(fetchMock).toHaveBeenCalled();

    expect(fetchMock).toBeTruthy();
  });

  test("delete", async () => {
    const fetchMock = jest.spyOn(global, "fetch");
    const json = await api.valueDelete(18);
    expect(fetchMock).toHaveBeenCalled();

    expect(fetchMock).toBeTruthy();
  });
});
