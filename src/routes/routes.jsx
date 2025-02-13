import AppLayout from "../components/AppLayout/index.jsx";
import Home from "../pages/Home/index.jsx";
import Categories from "../pages/Categories/index.jsx";
import WorkType from "../pages/WorkType/index.jsx";

export const routes = [
    {
        path: '/',
        element: <AppLayout>
            <Home/>
        </AppLayout>,
    },
    {
        path: '/categories',
        element: <AppLayout>
            <Categories/>
        </AppLayout>,
    },
    {
        path: '/work-type',
        element: <AppLayout>
            <WorkType/>
        </AppLayout>,
    },
]
