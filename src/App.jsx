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
          path="/simplifica-frontend/"
          element={
            <PublicRoute>
              <Page MainComponent={Splash} />
            </PublicRoute>
          }
          errorElement={<Page MainComponent={Error} />}
        />
        <Route
          path="/simplifica-frontend/register"
          element={
            <PublicRoute>
              <Page MainComponent={Register} />
            </PublicRoute>
          }
        />
        <Route
          path="/simplifica-frontend/login"
          element={
            <PublicRoute>
              <Page MainComponent={SignIn} />
            </PublicRoute>
          }
        />
        <Route
          path="/simplifica-frontend/:userId"
          element={
            <ProtectedRoute>
              <Page MainComponent={Profile} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/simplifica-frontend/:userId/view/:lessonId"
          element={
            <ProtectedRoute>
              <Page MainComponent={LessonPlanView} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/simplifica-frontend/:userId/edit/:lessonId"
          element={
            <ProtectedRoute>
              <Page MainComponent={LessonPlanEdit} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/simplifica-frontend/:userId/create"
          element={
            <ProtectedRoute>
              <Page MainComponent={LessonPlanCreate} />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </AuthProvider>
  );
};
