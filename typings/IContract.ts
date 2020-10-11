import { IClient } from "./IClient";

export interface IContract {
    id: string;

    status: ContractStatus;
    type: ContractType;

    conclusionDate: Date;
    endDate: Date;

    amount: string;

    hasOriginal: boolean;
    attachment: string;

    department: string;

    client: IClient;

    serviceManager: string;
    personalManager: string;
}

export enum ContractType { Contract, GovermentContract };

export enum ContractStatus { 'active', 'deleted', 'waiting', 'blocked' };
