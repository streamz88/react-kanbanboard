import React from "react";
import ReactDOM from "react-dom";
import App, { Unwrapped as UnwrappedApp } from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const data = {
    stages: [],
    team: {
      users: []
    },
    removeTask: []
  };
  ReactDOM.render(<UnwrappedApp {...data} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
