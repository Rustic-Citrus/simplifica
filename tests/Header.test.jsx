import { describe, it, expect } from "vitest";
import { Header } from "../src/components/Header";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Header component tests", () => {
  it("renders correctly", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("brand")).toHaveTextContent(
      "Simplifica."
    );
  });
});
