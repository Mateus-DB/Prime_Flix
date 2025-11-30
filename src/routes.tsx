import { createBrowserRouter } from "react-router-dom";

import Home from './pages/Home/index';
import Filme from './pages/Filme/index'
import Layout from "./layout";
import NotFound from "./pages/erro";
import Favoritos from "./pages/Favoritos";


const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/filme/:id',
                element: <Filme />
            },
            {
                path: '/favoritos',
                element: <Favoritos />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
])

export default router