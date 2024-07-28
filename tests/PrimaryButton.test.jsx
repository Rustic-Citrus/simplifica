import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { expect, vi } from "vitest";

describe("PrimaryButton component tests", () => {
  it("has the correct aria-label attribute", async () => {
    render(<PrimaryButton ariaLabel="test-button" />);

    await waitFor(() => {
      expect(screen.getByLabelText("test-button")).toBeInTheDocument();
    });
  });

  it("has the correct title attribute", async () => {
    render(<PrimaryButton title="This is a test." />);

    await waitFor(() => {
      expect(screen.getByTitle("This is a test.")).toBeInTheDocument();
    });
  });

  it("has the correct content when the content is a string", async () => {
    render(<PrimaryButton content="Click me!" />);

    await waitFor(() => {
      expect(screen.getByText("Click me!")).toBeInTheDocument();
    });
  });

  it("has the correct content when the content is a component", async () => {
    render(<PrimaryButton content={<img src="" alt="fake-image"></img>} />);

    await waitFor(() => {
      expect(screen.getByAltText("fake-image")).toBeInTheDocument();
    });
  });

  it("calls the correct function when it is clicked", async () => {
    const testFunc = vi.fn();

    render(<PrimaryButton onClick={testFunc} />);
    fireEvent.click(screen.getByRole("button"));

    expect(testFunc).toHaveBeenCalled();
  });
});
