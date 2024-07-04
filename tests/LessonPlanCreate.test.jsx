import {
  expect,
  describe,
  it,
  vi,
} from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

import { LessonPlanCreate } from "../src/components/LessonPlanCreate";

import * as useAuthModule from "../src/hooks/useAuth";

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

describe("LessonPlanCreate component tests", () => {
  it("renders correctly when the valid user tries to create a lesson plan", async () => {
    const mockTriggerFeedback = vi.fn();
    useAuthModule.useAuth.mockImplementation(() => ({
      user: { _id: "123" },
    }));

    render(<LessonPlanCreate triggerFeedback={mockTriggerFeedback} />);

    expect(await screen.findByLabelText("topic-input")).toBeInTheDocument();
    expect(await screen.findByLabelText("save-button")).toBeInTheDocument();
  });

  it("renders a different page when an invalid user tries to create a lesson plan", async () => {
    const mockTriggerFeedback = vi.fn();
    useAuthModule.useAuth.mockImplementation(() => ({
      user: { _id: "456" },
    }));

    render(<LessonPlanCreate triggerFeedback={mockTriggerFeedback} />);

    expect(await screen.findByLabelText("title")).toBeInTheDocument();
    expect(await screen.findByLabelText("message")).toBeInTheDocument();
  });
});
