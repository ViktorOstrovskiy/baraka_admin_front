import AppLayout from "../components/AppLayout/index.jsx";
import Home from "../pages/Home/index.jsx";

export const routes = [
    {
        path: '/',
        element: <AppLayout>
            <Home/>
        </AppLayout>,
    },
]
