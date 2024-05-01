import {ReactNode, createContext, useReducer, useCallback, useEffect} from "react";
import {
    IAuthContext,
    IAuthContextAction,
    IAuthContextActionTypes,
    IAuthContextState,
    ILoginResponseDTO
} from "../types/auth.types";
import {setSession, getSession} from "./auth.utils";
import axiosInstance from "../utils/axiosInstance";
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {
    LOGIN_URL,
    ME_URL,
    PATH_AFTER_LOGIN,
    PATH_AFTER_LOGOUT,
    PATH_AFTER_REGISTER,
    REGISTER_URL
} from "../utils/globalConfig";


// Reducer function for useReducer hook
const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
    if (action.type === IAuthContextActionTypes.LOGIN) {
        return {
            ...state,
            isAuthenticated: true,
            isAuthLoading: false,
            user: action.payload
        };
    }

    if (action.type === IAuthContextActionTypes.LOGOUT) {
        return {
            ...state,
            isAuthenticated: false,
            isAuthLoading: false,
            user: undefined,
        };
    }

    return state;
}


// Initial state object for useReducer hook
const initialAuthState: IAuthContextState = {
    isAuthenticated: false,
    isAuthLoading: true,
    user: undefined,
}


// Create context 
export const AuthContext = createContext<IAuthContext | null>(null);


// Interface for context props
interface IProps {
    children: ReactNode;
}


// Create a component to manage all auth functionalities
const AuthContextProvider = ({children}: IProps) => {

    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    const navigate = useNavigate();


    // Initialize Method
    const initializeAuthContext = useCallback(async () => {
        try {
            const token = getSession();
            if (token) {
                // validate accessToken by calling backend
                const response = await axiosInstance.post<ILoginResponseDTO>(ME_URL, {
                    token,
                });
                // Receive jwt token and user data
                const {newToken, userInfo} = response.data

                setSession(newToken);

                dispatch({
                    type: IAuthContextActionTypes.LOGIN,
                    payload: userInfo,
                });
            } else {
                setSession(null);
                dispatch({
                    type: IAuthContextActionTypes.LOGOUT,
                })
            }
        } catch (error) {
            setSession(null);
            dispatch({
                type: IAuthContextActionTypes.LOGOUT,
            })
        }
    }, []);


    // In start, call initializeAuthContext to authentication
    useEffect(() => {
        console.log('AuthContext Initialization start');

        initializeAuthContext()
            .then(() => console.log('AuthContext Initialization was successfully'))
            .catch((error: Error) => console.log(error));

    }, []);


    // Register Method
    const register = useCallback(async (
            firstName: string,
            lastName: string,
            userName: string,
            email: string,
            password: string,
            address: string
        ) => {

            const response = await axiosInstance.post(REGISTER_URL, {
                firstName,
                lastName,
                userName,
                email,
                password,
                address
            });

            console.log('Register Result:', response);

            toast.success('Register Was Successfully. Please Login!');

            navigate(PATH_AFTER_REGISTER);

        }, []
    );


    // Login Method
    const login = useCallback(async (userName: string, password: string) => {
        const response = await axiosInstance.post<ILoginResponseDTO>(LOGIN_URL, {
            userName,
            password
        });

        toast.success('Login Was Successfully');

        // receive jwt token and user data
        const {newToken, userInfo} = response.data;

        setSession(newToken);
        dispatch({
            type: IAuthContextActionTypes.LOGIN,
            payload: userInfo,
        })
        navigate(PATH_AFTER_LOGIN);
    }, []);


    // Logout Method
    const logout = useCallback(() => {
        setSession(null);
        dispatch({
            type: IAuthContextActionTypes.LOGOUT
        });
        navigate(PATH_AFTER_LOGOUT);
    }, [])


    // Create an object for values of context provider
    const valuesObject = {
        isAuthenticated: state.isAuthenticated,
        isAuthLoading: state.isAuthLoading,
        user: state.user,
        register: register,
        login: login,
        logout
    };

    return (<AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>)

};

export default AuthContextProvider;

