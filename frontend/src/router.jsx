import { Home } from "./pages/Home";
import { Monitoring } from "./monitoring/pages/Monitoring";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/monitoring",
    element: <Monitoring />,
  },
]);
