// Importing the Axios library for making HTTP requests
import axios from 'axios';

// Importing the HOST_API_KEY from globalConfig file
import { HOST_API_KEY } from './globalConfig';

// Creating an instance of Axios with a base URL
const axiosInstance = axios.create({
    baseURL: HOST_API_KEY // Setting the base URL for the API requests
})

// Adding a response interceptor to the Axios instance
axiosInstance.interceptors.response.use(
    // On successful response, pass through the response data
    (response) => response,
    // On error response, reject the Promise with error message
    (error) =>
        Promise.reject(
            // Checking if there's a response in the error object, otherwise returning a general error message
            (error.response && error.response) || 'General Axios Error happened'
        )
)

// Exporting the customized Axios instance for use in other parts of the application
export default axiosInstance;
