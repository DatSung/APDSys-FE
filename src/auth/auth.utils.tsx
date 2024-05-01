// Importing RolesEnum from auth.types file
import { IAuthUser, RolesEnum } from "../types/auth.types";

// Importing the customized Axios instance
import axiosInstance from "../utils/axiosInstance";

// Function to set session information (e.g., access token) in local storage and Axios headers
export const setSession = (accessToken: string | null) => {
    if (accessToken) {
        // If access token exists, store it in local storage
        localStorage.setItem('accessToken', accessToken);
        // Set the Authorization header in Axios to include the access token
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        // If access token is null or empty, remove it from local storage and Axios headers
        localStorage.removeItem('accessToken');
        delete axiosInstance.defaults.headers.common.Authorization;
    }
}

// Function to retrieve the access token from local storage
export const getSession = () => {
    // Return the access token from local storage
    return localStorage.getItem('accessToken');
}

// Arrays defining different access roles
export const allAccessRoles = [RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER];
export const managerAccessRoles = [RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.MANAGER];
export const adminAccessRoles = [RolesEnum.OWNER, RolesEnum.ADMIN];
export const ownerAccessRoles = [RolesEnum.OWNER];


// Specify which Roles can be update by Logged-in user
export const allowedRolesForUpdateArray = (loggedInUser?: IAuthUser): string[] => {
    return loggedInUser?.roles.includes(RolesEnum.OWNER) ?
        [RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER] :
        [RolesEnum.MANAGER, RolesEnum.USER];
};

// Control Owner cannot change Owner role
// Admin cannot change owner role and admin role
export const isAuthorizedForUpdateRole = (loggedUserRole: string, selectedUserRole: string) => {
    let result = true;

    if (
        loggedUserRole === RolesEnum.OWNER && selectedUserRole === RolesEnum.OWNER
    ) {
        result = false;
    } else if (
        loggedUserRole === RolesEnum.ADMIN &&
        (selectedUserRole === RolesEnum.OWNER || selectedUserRole === RolesEnum.ADMIN)
    ) {
        result = false;
    }

    return result;
};
