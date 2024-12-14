import MainPage from "../pages/Main/index.jsx";
import ArticlePage from "../pages/ArticlePage/index.jsx";

export const routes = [
    {
        path: '/',
        element: <MainPage/>,
    },
    {
        path: '/article/:id',
        element: <ArticlePage/>,
    },
]