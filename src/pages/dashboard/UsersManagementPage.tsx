import {useEffect, useState} from "react";
import {IAuthUser} from "../../types/auth.types.ts";
import axiosInstance from "../../utils/axiosInstance.ts";
import {USERS_LIST_URL} from "../../utils/globalConfig.ts";
import toast from "react-hot-toast";
import Spinner from "../../components/general/Spinner.tsx";
import UserCountSection from "../../components/dashboard/users-management/UserCountSection.tsx";
import UserChartSection from "../../components/dashboard/users-management/UserChartSection.tsx";
import LatestUsersSection from "../../components/dashboard/users-management/LatestUsersSection.tsx";
import UsersTableSection from "../../components/dashboard/users-management/UsersTableSection.tsx";


const UsersManagementPage = () => {

    const [users, setUsers] = useState<IAuthUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getUsersList = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
            const {data} = response;
            setUsers(data);
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred. Please contact admins");
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsersList();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full">
                <Spinner></Spinner>
            </div>
        )
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-2xl font-bold'>Users Management</h1>
            <UserCountSection usersList={users}/>

            <div className='grid grid-cols-1 lg:grid-cols-4 gap-x-4'>
                <UserChartSection usersList={users}/>
                <LatestUsersSection usersList={users}/>
            </div>

            <UsersTableSection usersList={users}/>
        </div>
    )
}

export default UsersManagementPage
