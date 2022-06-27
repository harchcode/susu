import { Component, createElement } from "../lib";

const Todo: Component<undefined> = () => {
  return createElement(
    "div",
    {
      innerText: "abcd",
      style: { background: "pink" }
    },
    "fddgfdg"
  );
};

const tmp = createElement(Todo);

document.getElementById("root").append(tmp);

export default null;
