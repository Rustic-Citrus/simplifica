import { describe, it, expect } from "vitest";
import { Error } from "../src/components/Error";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Error component tests", () => {
  it("renders correctly", async () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("title")).toHaveTextContent("Uh-oh...");
  });
});
