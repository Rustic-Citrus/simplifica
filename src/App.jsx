import { Page } from "./components/Page";
import { Register } from "./components/Register";
import { SignIn } from "./components/SignIn";
import { Profile } from "./components/Profile";
import { Splash } from "./components/Splash";
import { Error } from "./components/Error";
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
          <Route path="/" element={<Page />} errorElement={<Error />}>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Splash />
                </PublicRoute>
              }
              errorElement={<Error />}
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
              errorElement={<Error />}
            />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
              errorElement={<Error />}
            />
            <Route
              path=":userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
              errorElement={<Error />}
            />
            <Route
              path=":userId/view/:lessonId"
              element={
                <ProtectedRoute>
                  <LessonPlanView />
                </ProtectedRoute>
              }
              errorElement={<Error />}
            />
            <Route
              path=":userId/edit/:lessonId"
              element={
                <ProtectedRoute>
                  <LessonPlanEdit />
                </ProtectedRoute>
              }
              errorElement={<Error />}
            />
            <Route
              path=":userId/create"
              element={
                <ProtectedRoute>
                  <LessonPlanCreate />
                </ProtectedRoute>
              }
              errorElement={<Error />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </FeedbackProvider>
  );
};
