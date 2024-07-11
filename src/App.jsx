import { PageTemplate } from "./pages/PageTemplate"
import { Register } from "./components/Register";
import { SignIn } from "./components/SignIn";
import { Profile } from "./components/Profile";
import { Splash } from "./components/Splash";
import { ErrorComponent } from "./components/ErrorComponent";
import { LessonPlanView } from "./components/LessonPlanView";
import { LessonPlanCreate } from "./components/LessonPlanCreate";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { LessonPlanEdit } from "./components/LessonPlanEdit";
import { AuthProvider } from "./hooks/useAuth";
import { FeedbackProvider } from "./hooks/useFeedback";

import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <FeedbackProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PageTemplate />} errorElement={<ErrorComponent />}>
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
