export interface ISendMessageDTO {
    receiverUserName: string;
    text: string;
}

export interface IMessageDTO extends ISendMessageDTO {
    id: number;
    senderUserName: string;
    createdAt: string;

}