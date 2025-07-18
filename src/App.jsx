import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

// Layout & Pages
import Layout from "./routes/layout";
import DashboardPage from "./routes/dashboard/page";
import Analytics from "./routes/dashboard/Analytics";
import Reports from "./routes/dashboard/Reports";
import LeadsTable from "./routes/dashboard/LeadsTable";
import ProfilePage from "./routes/dashboard/ProfilePage";
import SettingsPage from "./routes/dashboard/SettingsPage";
import LoginPage from "./routes/LoginPage";
import ResetPasswordPage from "./routes/ResetPasswordPage";
import SubadminForm from "./routes/dashboard/SubadminForm";


const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

function App() {
    const router = createBrowserRouter([

        {
            path: "/login", // 👈 Login route
            element: <LoginPage />,
        },
        {
            path: "/reset-password/:token", // 👈 Public route
            element: <ResetPasswordPage />,
        },
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <Analytics />,
                },
                {
                    path: "reports",
                    element: <Reports />,
                },
                {
                    path: "LeadsTable",
                    element: <LeadsTable />,
                },
                {
                    path: "profile", // ✅ Profile route added here
                    element: <ProfilePage />,
                },
                {
                    path: "settings",
                    element: <SettingsPage />,
                },
                {
                    path: "subadmin", // ✅ ✅ Subadmin route added here
                    element: <SubadminForm />,
                },
                {
                    path: "customers",
                    element: <h1 className="title">Customers</h1>,
                },
                {
                    path: "new-customer",
                    element: <h1 className="title">New Customer</h1>,
                },
                {
                    path: "verified-customers",
                    element: <h1 className="title">Verified Customers</h1>,
                },
                {
                    path: "products",
                    element: <h1 className="title">Products</h1>,
                },
                {
                    path: "new-product",
                    element: <h1 className="title">New Product</h1>,
                },
                {
                    path: "inventory",
                    element: <h1 className="title">Inventory</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
