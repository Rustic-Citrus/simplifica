import { describe, it, expect } from "vitest";
import { LoadingWithSpinner } from "../src/components/LoadingWithSpinner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("LoadingWithSpinner component tests", () => {
  it("renders correctly", async () => {
    render(
      <LoadingWithSpinner loadingText="Testing" />
    );

    expect(await screen.findByLabelText("loading-text")).toHaveTextContent("Testing...");
  });
});
