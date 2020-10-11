export interface IClient {
    id: number;
    name: string;
    externalId: string;
    inn: string;
    department: string;
    personalManager: string;
    regDate: Date;
    deliveryMethod: DeliveryType;
    address: string;
    contactFirstName: string;
    contactMiddleName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    contactPosition: string;
}

export enum DeliveryType { inOffice, SimplePost, PostWithNotify, Courier };