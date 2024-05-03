import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {ISendMessageDTO} from "../../types/message.types.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import axiosInstance from "../../utils/axiosInstance.ts";
import {CREATE_MESSAGE_URL, USERNAMES_LIST_URL} from "../../utils/globalConfig.ts";
import toast from "react-hot-toast";
import Spinner from "../../components/general/Spinner.tsx";
import UserNamesComboBox from "../../components/dashboard/send-message/UserNamesComboBox.tsx";
import InputField from "../../components/general/InputField.tsx";
import Button from "../../components/general/Button.tsx";
import {PATH_DASHBOARD} from "../../routes/paths.ts";


const SendMessagePage = () => {

    const [usernames, setUsernames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const sendMessageSchema = Yup.object().shape({
        receiverUserName: Yup.string()
            .required("Username is required")
            .oneOf(usernames, 'Invalid username'),
        text: Yup.string().required('Message text is required'),
    });

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<ISendMessageDTO>({
        resolver: yupResolver(sendMessageSchema),
        defaultValues: {
            receiverUserName: '',
            text: ''
        }
    })

    const getUsernames = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<string[]>(USERNAMES_LIST_URL);
            const {data} = response;
            setUsernames(data);
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred. Please contact admins");
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsernames();
    }, []);

    const onSubmitSendMessageForm = async (submittedData: ISendMessageDTO) => {
        try {
            setLoading(true);
            const newMessage: ISendMessageDTO = {
                receiverUserName: submittedData.receiverUserName,
                text: submittedData.text
            }

            await axiosInstance.post(CREATE_MESSAGE_URL, newMessage);
            setLoading(false);
            toast.success("Message sent successfully.");
            navigate(PATH_DASHBOARD.inbox);
        } catch (error) {
            setLoading(false);
            reset();
            const err = error as { data: string; status: number };
            if (err.status === 400) {
                toast.error(err.data);
            } else {
                toast.error('An error occurred. Please contact admins');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full">
                <Spinner></Spinner>
            </div>
        )
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-2xl font-bold'>Send Message</h1>
            <div className='pageTemplate3 items-stretch'>
                <form onSubmit={handleSubmit(onSubmitSendMessageForm)}>

                    <UserNamesComboBox
                        usernames={usernames}
                        control={control}
                        name='receiverUserName'
                        error={errors.receiverUserName?.message}
                    />

                    <InputField
                        control={control}
                        label='Message'
                        inputName='text'
                        error={errors.text?.message}
                    />

                    <div className='flex justify-center items-center gap-4 mt-6'>

                        <Button
                            variant='secondary'
                            type='button'
                            label='Discard'
                            onClick={() => navigate(PATH_DASHBOARD.inbox)}
                        />

                        <Button
                            variant='primary'
                            type='submit'
                            label='Send'
                            onClick={() => null}
                            loading={loading}
                        />

                    </div>

                </form>
            </div>
        </div>
    )
}

export default SendMessagePage
