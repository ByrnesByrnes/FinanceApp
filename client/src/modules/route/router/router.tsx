import App from "App";
import { Company, IncomeStatement, Profile } from "modules/company";
import Search from "modules/search/search";
import { Main } from "modules/user";
import { createBrowserRouter } from "react-router-dom";
import * as ROUTES from "../constants";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Main /> },
            { path: ROUTES.SEARCH, element: <Search /> },
            {
                path: `${ROUTES.COMPANY}/:ticker`,
                element: <Company />,
                children: [
                    { path: "profile", element: <Profile /> },
                    { path: "income-statement", element: <IncomeStatement /> },
                ]
            }
        ]
    }
]);