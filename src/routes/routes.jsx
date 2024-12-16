import MainPage from "../pages/Main/index.jsx";
import ArticlePage from "../pages/ArticlePage/index.jsx";
import AppLayout from "../components/AppLayout/index.jsx";

export const routes = [
    {
        path: '/',
        element: <AppLayout>
            <MainPage/>
        </AppLayout>,
    },
    {
        path: '/article/:id',
        element:
            <AppLayout>
                <ArticlePage/>
            </AppLayout>,

    },
]