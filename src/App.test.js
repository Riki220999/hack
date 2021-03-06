import React from "react";
import App from "./App";
import NotesApp from "../src/components/notes-app";
import { render, fireEvent, cleanup } from "@testing-library/react";

import "jest-dom/extend-expect";

// const renderApp = () => render(<App/>);

var title,
  nameInput,
  statusInput,
  addButton,
  allButton,
  activeButton,
  completedButton,
  noteList;

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  let { getByTestId, queryByTestId } = render(<NotesApp />);
  // title = getByTestId("app-title");
  nameInput = getByTestId("input-note-name");
  statusInput = getByTestId("input-note-status");
  addButton = getByTestId("submit-button");
  allButton = getByTestId("allButton");
  activeButton = getByTestId("activeButton");
  completedButton = getByTestId("completedButton");
  noteList = getByTestId("noteList");
});

test("initial UI is rendered as expected and button works", () => {
  const { getByText, getByTestId, asFragment } = render(<App />);
  title = getByTestId("app-title");
  expect(title).toHaveTextContent("Notes App");
  expect(nameInput).toHaveValue("");
  expect(statusInput).toHaveValue("");
  expect(addButton).toHaveTextContent("Add Note");
  expect(allButton).toHaveTextContent("All");
  expect(completedButton).toHaveTextContent("Completed");
  expect(activeButton).toHaveTextContent("Active");
  expect(noteList.children.length) === 0;
  fireEvent.input(nameInput, {
    target: { value: "Study" },
  });
  fireEvent.click(addButton);
  expect(noteList.children.length) === 1;
});

test("button adds notes", () => {
  const { getByText, getByTestId, asFragment, queryAllByText } = render(
    <NotesApp />
  );
  noteList = queryAllByText("noteList");
  fireEvent.input(nameInput, {
    target: { value: "Study" },
  });
  fireEvent.input(statusInput, {
    target: { value: "progress" },
  });
  fireEvent.click(addButton);
  expect(noteList.length) === 0;
  expect(noteList) === "Study";
  expect(noteList[0]) === "progress";
});

test("Multiple notes can be added", () => {
  const { getByText, getByTestId, asFragment, queryAllByText } = render(
    <NotesApp />
  );
  noteList = queryAllByText("noteList");
  fireEvent.input(nameInput, {
    target: { value: "Study" },
  });
  fireEvent.input(statusInput, {
    target: { value: "progress" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Movie" },
  });
  fireEvent.input(statusInput, {
    target: { value: "active" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Stocks investing" },
  });
  fireEvent.input(statusInput, {
    target: { value: "completed" },
  });
  fireEvent.click(addButton);
  expect(noteList.length) === 2;
  expect(noteList) === "Movie";
  expect(noteList[0]) === "active";
  expect(noteList[1]) === "Stocks investing";
  expect(noteList[2]) === "completed";
  expect(noteList[3]) === "Study";
  expect(noteList[4]) === "progress";
});

test("Switching between buttons work", () => {
	const { getByText, getByTestId, asFragment, queryAllByText } = render(
    <NotesApp />
  );
  noteList = queryAllByText("noteList");
  fireEvent.input(nameInput, {
    target: { value: "Study" },
  });
  fireEvent.input(statusInput, {
    target: { value: "progress" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Cooking" },
  });
  fireEvent.input(statusInput, {
    target: { value: "pending" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Movie" },
  });
  fireEvent.input(statusInput, {
    target: { value: "active" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Fill form" },
  });
  fireEvent.input(statusInput, {
    target: { value: "active" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Stocks investing" },
  });
  fireEvent.input(statusInput, {
    target: { value: "completed" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Complete code" },
  });
  fireEvent.input(statusInput, {
    target: { value: "completed" },
  });

  fireEvent.click(addButton);
  expect(noteList.length) === 5;
  expect(noteList) === "Movie";
  expect(noteList[0])=== "active";
  expect(noteList[1])=== "Fill form";
  expect(noteList[2])=== "active";
  expect(noteList[3])=== "Stocks investing";
  expect(noteList[4])=== "completed";
  expect(noteList[5])=== "Complete code";
  expect(noteList[6])=== "completed";
  expect(noteList[7])=== "Study";
  expect(noteList[8])=== "progress";
  expect(noteList[9])=== "Cooking";
  expect(noteList[10])=== "pending";

  fireEvent.click(activeButton);
  expect(noteList.length) === 1;
  expect(noteList)=== "Movie";
  expect(noteList[0])=== "active";
  expect(noteList[1])=== "Fill form";
  expect(noteList[2])=== "active";

  fireEvent.click(completedButton);
  expect(noteList.length) === 1;
  expect(noteList)==="Stocks investing";
  expect(noteList[0])==="completed";
  expect(noteList[1])==="Complete code";
  expect(noteList[2])==="completed";

  fireEvent.click(allButton);
  expect(noteList.length) === 5;
  expect(noteList)=== "Movie";
  expect(noteList[0])=== "active";
  expect(noteList[1])=== "Fill form";
  expect(noteList[2])=== "active";
  expect(noteList[3])=== "Stocks investing";
  expect(noteList[4])=== "completed";
  expect(noteList[5])=== "Complete code";
  expect(noteList[6])=== "completed";
  expect(noteList[7])=== "Study";
  expect(noteList[8])=== "progress";
  expect(noteList[9])=== "Cooking";
  expect(noteList[10])=== "pending";
});

test("In active tab, dont show completed notes", () => {
  const { getByText, getByTestId, asFragment, queryAllByText } = render(
    <NotesApp />
  );
  noteList = queryAllByText("noteList");
  fireEvent.input(nameInput, {
    target: { value: "Movie" },
  });
  fireEvent.input(statusInput, {
    target: { value: "active" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Fill form" },
  });
  fireEvent.input(statusInput, {
    target: { value: "active" },
  });
  fireEvent.click(addButton);
  fireEvent.click(activeButton);
  fireEvent.input(nameInput, {
    target: { value: "Stocks investing" },
  });
  fireEvent.input(statusInput, {
    target: { value: "completed" },
  });
  fireEvent.click(addButton);
  expect(noteList.length) === 1;
  expect(noteList)==="Movie";
  expect(noteList[0])==="active";
  expect(noteList[1]) === "Fill form";
  expect(noteList[2])==="active";

  fireEvent.click(completedButton);
  expect(noteList.length) === 0;
  expect(noteList)=== "Stocks investing";
  expect(noteList[0])=== "completed";
});
