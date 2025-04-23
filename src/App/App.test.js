import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  test("render App as component", () => {
    expect(render(<App />).toBeInDocument);
  });
});
