export interface IRegisterDTO {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    address: string;
}

export interface ILoginDTO {
    userName: string;
    password: string;
}

export interface IUpdateRoleDTO {
    userName: string;
    newRole: string;
}

export interface IAuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    createdAt: string;
    roles: string[];
}

export interface ILoginResponseDTO {
    newToken: string;
    userInfor: IAuthUser;
}

export interface IAuthContextState {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    user?: IAuthUser;
}

export enum IAuthContextActionTypes {
    INITIAL = 'INITIAL',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

export interface IAuthContextAction {
    type: IAuthContextActionTypes;
    payload?: IAuthUser;
}

export interface IAuthContext {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    user?: IAuthUser;
    login: (username: string, password: string) => Promise<void>;
    register: (
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        password: string,
        address: string
    ) => Promise<void>;
    logout: () => void;
}

export enum RolesEnum {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    USER = 'USER',
}