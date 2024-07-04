import {
  expect,
  describe,
  it,
  vi,
} from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

import { LessonPlanEdit } from "../src/components/LessonPlanEdit";

import * as useAuthModule from "../src/hooks/useAuth";

vi.mock("../src/helper/fetchHelper.js", () => ({
  fetchOneLessonPlan: vi.fn(),
}));

vi.mock("../src/hooks/useAuth.jsx", () => {
  const actual = vi.importActual("../src/hooks/useAuth.jsx");
  return {
    ...actual,
    useAuth: vi.fn(),
    AuthProvider: ({ children }) => children,
  };
});

vi.mock("react-router-dom", () => {
  const originalModule = vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useParams: () => ({
      userId: "123",
    }),
    useNavigate: () => vi.fn(),
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    BrowserRouter: originalModule.BrowserRouter,
  };
});

describe("LessonPlanEdit component tests", () => {
  it("renders correctly when a valid user tries to edit a lesson plan", async () => {
    useAuthModule.useAuth.mockImplementation(() => ({
      user: { _id: "123" },
    }));

    const mockTriggerFeedback = vi.fn();
    render(<LessonPlanEdit triggerFeedback={mockTriggerFeedback} />);

    expect(await screen.findByLabelText("topic-input")).toBeInTheDocument();
    expect(await screen.findByLabelText("material-input")).toBeInTheDocument();
  });

  it("renders correctly when a valid user tries to edit a lesson plan", async () => {
    useAuthModule.useAuth.mockImplementation(() => ({
      user: { _id: "456" },
    }));

    const mockTriggerFeedback = vi.fn();
    render(<LessonPlanEdit triggerFeedback={mockTriggerFeedback} />);

    expect(await screen.findByLabelText("title")).toBeInTheDocument();
    expect(await screen.findByLabelText("back-button")).toBeInTheDocument();
  });
});
