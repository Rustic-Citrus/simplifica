import { Splash } from "../src/components/Splash";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Splash component tests", () => {
  it("renders correctly", async () => {
    render(
      <MemoryRouter>
        <Splash />
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("subtitle")).toHaveTextContent(
      "Who said planning lessons couldn't be quick?"
    );
    expect(await screen.findByLabelText("title")).toHaveTextContent(
      "Simplifica."
    );
    expect(await screen.findByLabelText("sign-up-button")).toHaveTextContent(
      "Sign Up (it's free!)"
    );
    expect(await screen.findByLabelText("sign-in-button")).toHaveTextContent(
      "Sign In"
    );
  });
});
