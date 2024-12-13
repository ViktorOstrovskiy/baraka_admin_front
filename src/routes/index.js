import { routes } from "./routes.jsx";
import { useRoutes } from "react-router-dom";

const AppRouter = () => {
    const routeElements = useRoutes(routes);

    return routeElements;
};


export default AppRouter;
