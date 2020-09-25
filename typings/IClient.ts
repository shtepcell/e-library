export interface IClient {
    name: string;
    externalId: string;
    inn: string;
    department: string;
    personalManager: string;
    regDate: Date;
    deliveryMethod: DeliveryType;
    address: string;
    contactFace: {
        name: string;
        email: string;
        phone: string;
        position: string;
    }
}

export enum DeliveryType { inOffice, SimplePost, PostWithNotify, Courier };