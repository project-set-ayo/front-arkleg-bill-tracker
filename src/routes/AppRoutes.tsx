import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import App from "../App";
import Register from "../pages/Register/Register";
import NotFoundPage from "../pages/NotFound/NotFound";
import ConfirmEmail from "../pages/ConfirmEmail/ConfirmEmail";
import PasswordResetConfirm from "../pages/PasswordResetConfirm/PasswordResetConfirm";
import PasswordResetRequest from "../pages/PasswordResetRequest/PasswordResetRequest";
import Login from "../pages/Login/Login";
import SessionPage from "../pages/SessionPage/SessionPage";
import TagSearchPage from "../pages/TagSearchPage/TagSearchPage";
import BillListing from "../pages/BillListing/BillListing";
import BillDetail from "../pages/BillDetail/BillDetail";
import UserSettings from "../pages/UserSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <App /> },
      { path: "user", element: <UserSettings /> },
      //{ path: "bill", element: <BillListing /> },
      { path: "bill", element: <SessionPage /> },
      { path: "tag", element: <TagSearchPage /> },
      { path: "bill/:billId", element: <BillDetail /> },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/email/confirm/:key", element: <ConfirmEmail /> },
  { path: "/forgot-password", element: <PasswordResetRequest /> },
  {
    path: "/password-reset/confirm/:uid/:token",
    element: <PasswordResetConfirm />,
  },
]);

export default router;
