import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuizPage from "./pages/QuizPage";
import App from "./App";
import axios from "axios";
import NotPageFounded from "./pages/NotPageFounded";
import "tailwindcss/tailwind.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/quiz",
        element: <QuizPage />,
        loader: () =>
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/name_quiz`),
      },
    ],
  },
  { path: "*", element: <NotPageFounded /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
