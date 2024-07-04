import { afterEach, beforeEach, beforeAll, afterAll, expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { LessonPlanEdit } from "../src/components/LessonPlanEdit";
import { AuthProvider } from "../src/hooks/useAuth";
import { MemoryRouter } from "react-router-dom";

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
