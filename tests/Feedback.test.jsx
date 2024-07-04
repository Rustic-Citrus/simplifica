import { afterEach, beforeEach, beforeAll, afterAll, expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Feedback } from "../src/components/Feedback";

describe("Feedback component tests", () => {
  const testTitle = "Test";
  const testMessage = "This is a test";
  const testType = "success";
  const mockToggleVisible = vi.fn();

  it("renders correctly", async () => {
    render(<Feedback title={testTitle} message={testMessage} type={testType} toggleVisible={mockToggleVisible} />);

    expect(await screen.findByLabelText("feedback-title")).toBeInTheDocument();
    expect(await screen.findByLabelText("feedback-timestamp")).toBeInTheDocument();
    expect(await screen.findByLabelText("feedback-message")).toBeInTheDocument();
  });
});