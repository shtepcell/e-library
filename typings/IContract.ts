
export interface IContract {
    id: string;

    status: string;
    type: string;

    conclusionDate: Date;
    endDate: Date;

    amount: string;

    orig: boolean;
    attachment: string;

    department: string;

    client: any;

    serviceManager: string;
    personalManager: string;

    fileName?: string;
    file?: any;
}

export enum ContractType { Contract, GovermentContract };

export enum ContractStatus { 'active', 'deleted', 'waiting', 'blocked' };
