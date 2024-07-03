import { Header } from "../src/components/Header";
import { AuthProvider } from "../src/hooks/useAuth";

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";

describe("Header component tests", () => {
  it("renders correctly", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("brand")).toHaveTextContent(
      "Simplifica."
    );
  });
});
