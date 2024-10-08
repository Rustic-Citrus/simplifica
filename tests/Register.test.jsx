import {
  afterEach,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
  describe,
  it,
  vi,
} from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { Register } from "../src/components/Register";
import { AuthProvider } from "../src/hooks/useAuth";
import { MemoryRouter } from "react-router-dom";

describe("Register component tests", () => {
  const mockTriggerFeedback = vi.fn();

  it("renders correctly", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register triggerFeedback={mockTriggerFeedback} />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("title")).toHaveTextContent(
      "Create an account"
    );
    expect(await screen.findByLabelText("subtitle")).toHaveTextContent(
      "Enter a username and password"
    );
    expect(
      await screen.findByLabelText("get-started-button")
    ).toBeInTheDocument();
    expect(await screen.findByLabelText("password-input")).toBeInTheDocument();
    expect(await screen.findByLabelText("username-input")).toBeInTheDocument();
    expect(
      await screen.findByLabelText("confirm-password-input")
    ).toBeInTheDocument();
  });
});
