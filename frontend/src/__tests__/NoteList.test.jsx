import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import React from "react";
import NoteList from "../components/NoteList";

it("fetches and display notes", async () => {
  const {} = render(<NoteList />);
  expect(screen.getByText("Note List")).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText("my note")).toBeInTheDocument();
  });
});
