import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import App from "./App";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuizPage from "./pages/QuizPage";
import ManageQuiz from "./pages/ManageQuiz";
import NotPageFounded from "./pages/NotPageFounded";
import ResponseCreated from "./components/quiz/ResponseCreatedQuiz";
import CreateQuiz from "./components/quiz/CreateQuiz";
import DeleteQuiz from "./components/quiz/DeleteQuiz";
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
      {
        path: "/manage",
        children: [
          {
            path: "",
            element: <ManageQuiz />,
          },
          { path: "create", element: <CreateQuiz /> },
          { path: "responsecreated", element: <ResponseCreated /> },
          { path: "delete", element: <DeleteQuiz /> },
        ],
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
