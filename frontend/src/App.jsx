import AppProviders from "./contexts/AppProviders";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
