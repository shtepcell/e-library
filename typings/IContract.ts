
export interface IContract {
    id: string;

    status: string;
    type: string;

    orderNumber: string;

    conclusionDate: Date;
    endDate: Date;
    startDate?: Date;

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
