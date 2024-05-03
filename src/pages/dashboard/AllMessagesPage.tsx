import {useEffect, useState} from "react";
import {IMessageDTO} from "../../types/message.types.ts";
import axiosInstance from "../../utils/axiosInstance.ts";
import {ALL_MESSAGES_URL} from "../../utils/globalConfig.ts";
import toast from "react-hot-toast";
import moment from "moment/moment";
import Spinner from "../../components/general/Spinner.tsx";


const AllMessagesPage = () => {

    const [messages, setMessages] = useState<IMessageDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getAllMessages = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<IMessageDTO[]>(ALL_MESSAGES_URL);
            const {data} = response;
            setMessages(data);
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred. Please contact admins");
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllMessages();
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
            <h1 className='text-2xl font-bold'>All Message</h1>
            <div className='pageTemplate3 items-stretch'>

                <div className='grid grid-cols-8 p-2 border-2 border-gray-200 rounded-lg'>
                    <span>Date</span>
                    <span className='col-span-5'>Text</span>
                    <span>Sender</span>
                    <span>Receiver</span>
                </div>

                {
                    messages.map((item) => (
                        <div key={item.id} className='grid grid-cols-8 p-2 border-2 border-gray-200 rounded-lg'>
                            <span>{moment(item.createdAt).fromNow()}</span>
                            <span className='col-span-5'>{item.text}</span>
                            <span>{item.senderUserName}</span>
                            <span>{item.receiverUserName}</span>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default AllMessagesPage
