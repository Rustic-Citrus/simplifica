import { SignIn } from "../src/components/SignIn";
import { AuthProvider } from "../src/hooks/useAuth";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("SignIn component tests", () => {
  it("renders correctly", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );

    const title = screen.getByLabelText("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Welcome back");

    const usernameInput = screen.getByLabelText("username-input");
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("type", "text");

    const passwordInput = screen.getByLabelText("password-input");
    expect(passwordInput).toBeInTheDocument();

    const hidePasswordButton = screen.getByLabelText("hide-password-button");
    expect(hidePasswordButton).toBeInTheDocument();
    expect(hidePasswordButton).toHaveAttribute("type", "button");

    const signInButton = screen.getByLabelText("sign-in-button");
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("type", "submit");
  });

  it("handles username change correctly", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText("username-input");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    expect(usernameInput.value).toBe("testuser");
  });

  it("handles password change correctly", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText("password-input");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(passwordInput.value).toBe("testpassword");
  });

  it("handles form submission correctly", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );

    const signInButton = screen.getByLabelText("sign-in-button");
    fireEvent.click(signInButton);
  });
});
