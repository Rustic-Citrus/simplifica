import { describe, it, vi, expect } from "vitest";
import { LessonPlanEdit } from "../src/components/LessonPlanEdit";
import { AuthProvider } from "../src/hooks/useAuth";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("LessonPlanEdit component tests", () => {
  it("renders correctly", async () => {
    const mockTriggerFeedback = vi.fn();

    render(
      <MemoryRouter>
        <AuthProvider>
          <LessonPlanEdit triggerFeedback={mockTriggerFeedback} />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("back-button")).toBeInTheDocument();
  });
});
