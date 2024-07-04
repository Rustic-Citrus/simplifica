import {
  afterEach,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
  describe,
  it,
  vi,
} from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { LessonPlanView } from "../src/components/LessonPlanView";

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

describe("LessonPlanView component tests", () => {
  it("renders correctly when a valid user tries to view a lesson plan", async () => {
    useAuthModule.useAuth.mockImplementation(() => ({
      user: { _id: "123" },
    }));

    render(<LessonPlanView />);

    expect(await screen.findByLabelText("topic")).toBeInTheDocument();
    expect(await screen.findByLabelText("success-title")).toHaveTextContent("Lesson Plan");
  });

  it("renders correctly when a valid user tries to view a lesson plan", async () => {
    useAuthModule.useAuth.mockImplementation(() => ({
      user: { _id: "456" },
    }));

    render(<LessonPlanView />);

    expect(await screen.findByLabelText("back-button")).toBeInTheDocument();
    expect(await screen.findByLabelText("title")).toHaveTextContent("Uh-oh...");
  });
});
