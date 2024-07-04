import {
  expect,
  describe,
  it,
  vi,
} from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

import * as useAuthModule from "../src/hooks/useAuth";
import { Profile } from "../src/components/Profile";

vi.mock("../src/helper/fetchHelper.js", () => ({
  fetchLessonPlans: vi.fn(),
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
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    BrowserRouter: originalModule.BrowserRouter,
  };
});

describe("Profile component tests", () => {
  it("renders correctly", async () => {
    useAuthModule.useAuth.mockImplementation(() => ({
      user: { _id: "123", name: "Test User" },
    }));

    render(<Profile />);

    expect(await screen.findByLabelText("title")).toHaveTextContent(
      "My Lesson Plans"
    );
  });
});
