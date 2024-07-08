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

import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Page MainComponent={Splash} />
            </PublicRoute>
          }
          errorElement={<Page MainComponent={Error} />}
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Page MainComponent={Register} />
            </PublicRoute>
          }
          errorElement={<Page MainComponent={Error} />}
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Page MainComponent={SignIn} />
            </PublicRoute>
          }
          errorElement={<Page MainComponent={Error} />}
        />
        <Route
          path="/:userId"
          element={
            <ProtectedRoute>
              <Page MainComponent={Profile} />
            </ProtectedRoute>
          }
          errorElement={<Page MainComponent={Error} />}
        />
        <Route
          path="/:userId/view/:lessonId"
          element={
            <ProtectedRoute>
              <Page MainComponent={LessonPlanView} />
            </ProtectedRoute>
          }
          errorElement={<Page MainComponent={Error} />}
        />
        <Route
          path="/:userId/edit/:lessonId"
          element={
            <ProtectedRoute>
              <Page MainComponent={LessonPlanEdit} />
            </ProtectedRoute>
          }
          errorElement={<Page MainComponent={Error} />}
        />
        <Route
          path="/:userId/create"
          element={
            <ProtectedRoute>
              <Page MainComponent={LessonPlanCreate} />
            </ProtectedRoute>
          }
          errorElement={<Page MainComponent={Error} />}
        />
      </Routes>
    </AuthProvider>
  );
};
