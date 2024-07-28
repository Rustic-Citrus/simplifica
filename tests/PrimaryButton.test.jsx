import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { expect } from "vitest";

describe("PrimaryButton component tests", () => {
  it("has the correct aria-label attribute", async () => {
    render(<PrimaryButton ariaLabel="test-button" />);

    await waitFor(() => {
        expect(screen.getByLabelText("test-button")).toBeInTheDocument();
    });
  });
});
