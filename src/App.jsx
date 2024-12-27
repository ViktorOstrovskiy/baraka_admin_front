import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { routes } from "./routes/routes.jsx";
import ScrollToTop from "./components/ScrollToTop/index.jsx";

const AppLayout = () => (
    <div>
        <ScrollToTop />
        <Outlet />
    </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: routes,
    },
]);

export const App = () => {
    return <RouterProvider router={router} />;
};
