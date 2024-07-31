import {
  PageTemplate,
  Register,
  SignIn,
  Profile,
  Splash,
  LessonPlanView,
  LessonPlanCreate,
  LessonPlanEdit,
} from "./pages";
import { ErrorComponent, ProtectedRoute, PublicRoute } from "./components";
import { AuthProvider, FeedbackProvider } from "./hooks";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <FeedbackProvider>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<PageTemplate />}
            errorElement={<ErrorComponent />}
          >
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Splash />
                </PublicRoute>
              }
              errorElement={<ErrorComponent />}
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
              errorElement={<ErrorComponent />}
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
              errorElement={<ErrorComponent />}
            />
            <Route
              path="/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
              errorElement={<ErrorComponent />}
            />
            <Route
              path="/:userId/view/:lessonId"
              element={
                <ProtectedRoute>
                  <LessonPlanView />
                </ProtectedRoute>
              }
              errorElement={<ErrorComponent />}
            />
            <Route
              path="/:userId/edit/:lessonId"
              element={
                <ProtectedRoute>
                  <LessonPlanEdit />
                </ProtectedRoute>
              }
              errorElement={<ErrorComponent />}
            />
            <Route
              path="/:userId/create"
              element={
                <ProtectedRoute>
                  <LessonPlanCreate />
                </ProtectedRoute>
              }
              errorElement={<ErrorComponent />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </FeedbackProvider>
  );
};
