import {Route, Routes, Navigate} from "react-router-dom";
import {PATH_DASHBOARD, PATH_PUBLIC} from "./paths.ts";
import AuthGuard from "../auth/AuthGuard.tsx";
import {allAccessRoles, managerAccessRoles, adminAccessRoles, ownerAccessRoles} from "../auth/auth.utils.tsx";
import Layout from "../components/layout";
import AdminPage from "../pages/dashboard/AdminPage.tsx";
import AllMessagesPage from "../pages/dashboard/AllMessagesPage.tsx";
import DashboardPage from "../pages/dashboard/DashboardPage.tsx";
import InboxPage from "../pages/dashboard/InboxPage.tsx";
import ManagerPage from "../pages/dashboard/ManagerPage.tsx";
import MyLogsPage from "../pages/dashboard/MyLogsPage.tsx";
import OwnerPage from "../pages/dashboard/OwnerPage.tsx";
import SendMessagePage from "../pages/dashboard/SendMessagePage.tsx";
import SystemLogsPage from "../pages/dashboard/SystemLogsPage.tsx";
import UpdateRolePage from "../pages/dashboard/UpdateRolePage.tsx";
import UserPage from "../pages/dashboard/UserPage.tsx";
import UsersManagementPage from "../pages/dashboard/UsersManagementPage.tsx";
import HomePage from "../pages/public/HomePage.tsx";
import LoginPage from "../pages/public/LoginPage.tsx";
import RegisterPage from "../pages/public/RegisterPage.tsx";
import NotFoundPage from "../pages/public/NotFoundPage.tsx";
import UnauthorizedPage from "../pages/public/UnauthorizedPage.tsx";


const GlobalRouter = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>

                {/* Public routes */}
                <Route index element={<HomePage/>}/>
                <Route path={PATH_PUBLIC.register} element={<RegisterPage/>}/>
                <Route path={PATH_PUBLIC.login} element={<LoginPage/>}/>
                <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage/>}/>
                {/* Public routes */}

                {/* Projected routes */}
                <Route element={<AuthGuard roles={allAccessRoles}/>}>
                    <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage/>}/>
                    <Route path={PATH_DASHBOARD.sendMessage} element={<SendMessagePage/>}/>
                    <Route path={PATH_DASHBOARD.inbox} element={<InboxPage/>}/>
                    <Route path={PATH_DASHBOARD.myLogs} element={<MyLogsPage/>}/>
                    <Route path={PATH_DASHBOARD.user} element={<UserPage/>}/>
                </Route>

                <Route element={<AuthGuard roles={managerAccessRoles}/>}>
                    <Route path={PATH_DASHBOARD.manager} element={<ManagerPage/>}/>
                </Route>

                <Route element={<AuthGuard roles={adminAccessRoles}/>}>
                    <Route path={PATH_DASHBOARD.usersManagement} element={<UsersManagementPage/>}/>
                    <Route path={PATH_DASHBOARD.updateRole} element={<UpdateRolePage/>}/>
                    <Route path={PATH_DASHBOARD.allMessages} element={<AllMessagesPage/>}/>
                    <Route path={PATH_DASHBOARD.systemLogs} element={<SystemLogsPage/>}/>
                    <Route path={PATH_DASHBOARD.admin} element={<AdminPage/>}/>
                </Route>

                <Route element={<AuthGuard roles={ownerAccessRoles}/>}>
                    <Route path={PATH_DASHBOARD.owner} element={<OwnerPage/>}/>
                </Route>
                {/* Projected routes */}

                {/* Catch all (404) */}
                <Route path={PATH_PUBLIC.notFound} element={<NotFoundPage/>}/>
                <Route path='*' element={<Navigate to={PATH_PUBLIC.notFound} replace/>}/>
                {/* Catch all (404) */}

            </Route>
        </Routes>
    );
};

export default GlobalRouter;