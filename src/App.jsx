import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {routes} from "./routes/routes.jsx";


export const App = () => {
  const router = createBrowserRouter(routes);

  return (
      <>
        <RouterProvider router={router} />
      </>
  );
};
