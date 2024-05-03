import useAuth from "../../hooks/useAuth.hook.ts";
import {useEffect, useState} from "react";
import {IMessageDTO} from "../../types/message.types.ts";
import axiosInstance from "../../utils/axiosInstance.ts";
import {MY_MESSAGE_URL} from "../../utils/globalConfig.ts";
import toast from "react-hot-toast";
import Spinner from "../../components/general/Spinner.tsx";
import {MdInput, MdOutput} from "react-icons/md";
import moment from "moment";


const InboxPage = () => {

    const {user} = useAuth();
    const [messages, setMessages] = useState<IMessageDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getMyMessages = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<IMessageDTO[]>(MY_MESSAGE_URL);
            const {data} = response;
            setMessages(data)
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred. Please contact admins");
            setLoading(false);
        }
    }

    useEffect(() => {
        getMyMessages();
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
            <h1 className='text-2xl font-bold'>Inbox</h1>
            <div className='pageTemplate3 items-stretch'>

                <div className='grid grid-cols-8 p-2 border-2 border-gray-200 rounded-lg'>
                    <span>Date</span>
                    <span>Type</span>
                    <span className='col-span-4'>Text</span>
                    <span>Sender</span>
                    <span>Receiver</span>
                </div>

                {
                    messages.map((item) => (
                        <div key={item.id} className='grid grid-cols-8 p-2 border-2 border-gray-200 rounded-lg'>
                            <span>{moment(item.createdAt).fromNow()}</span>
                            <span>
                                {
                                    item.senderUserName === user?.userName ?
                                        (<MdOutput className='text-2xl text-purple-500'></MdOutput>) :
                                        (<MdInput className='text-2xl text-green-500'></MdInput>)
                                }
                            </span>
                            <span className='col-span-4'>{item.text}</span>
                            <span>{item.senderUserName}</span>
                            <span>{item.receiverUserName}</span>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default InboxPage
