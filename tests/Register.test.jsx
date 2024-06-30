import { describe, it, expect } from "vitest";
import { Register } from "../src/components/Register";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Register component tests", () => {
  it("renders correctly", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("title")).toHaveTextContent("Create an account");
    expect(await screen.findByLabelText("subtitle")).toHaveTextContent("Enter a username and password");
    expect(await screen.findByLabelText("get-started-button")).toBeInTheDocument();
    expect(await screen.findByLabelText("password-input")).toBeInTheDocument();
    expect(await screen.findByLabelText("username-input")).toBeInTheDocument();
    expect(await screen.findByLabelText("confirm-password-input")).toBeInTheDocument();
  });
});
