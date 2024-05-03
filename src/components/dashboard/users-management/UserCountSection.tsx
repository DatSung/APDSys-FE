import {IAuthUser, RolesEnum} from "../../../types/auth.types.ts";
import {FaUser, FaUserCog, FaUserShield, FaUserTie} from "react-icons/fa";
import UserCountCard from "./UserCountCard.tsx";

interface IProps {
    usersList: IAuthUser[];
}

const UserCountSection = ({usersList}: IProps) => {

    let owners = 0;
    let admins = 0;
    let managers = 0;
    let users = 0

    usersList.forEach((item) => {

        if (item.roles.includes(RolesEnum.OWNER)) {
            owners++;
        }
        if (item.roles.includes(RolesEnum.ADMIN)) {
            admins++;
        }
        if (item.roles.includes(RolesEnum.MANAGER)) {
            managers++;
        }
        if (item.roles.includes(RolesEnum.USER)) {
            users++;
        }

    })

    const userCountData = [
        {count: owners, role: RolesEnum.OWNER, icon: FaUserCog, color: '#3b3549'},
        {count: admins, role: RolesEnum.ADMIN, icon: FaUserShield, color: '#9333EA'},
        {count: managers, role: RolesEnum.MANAGER, icon: FaUserTie, color: '#0B96BC'},
        {count: users, role: RolesEnum.USER, icon: FaUser, color: '#FEC223'}
    ];


    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-x-4'>
            {
                userCountData.map(
                    (item, index) => (
                        <UserCountCard
                            key={index}
                            icon={item.icon}
                            count={item.count}
                            role={item.role}
                            color={item.color}
                        />
                    ))
            }

        </div>
    );
};

export default UserCountSection;