import { afterEach, beforeEach, beforeAll, afterAll, expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { LessonPlanCreate } from "../src/components/LessonPlanCreate";
import { AuthProvider } from "../src/hooks/useAuth";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("LessonPlanCreate component tests", () => {
  it("renders correctly", async () => {
    const mockTriggerFeedback = vi.fn();

    render(
      <MemoryRouter>
        <AuthProvider>
          <LessonPlanCreate triggerFeedback={mockTriggerFeedback} />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("back-button")).toBeInTheDocument();
  });
});
