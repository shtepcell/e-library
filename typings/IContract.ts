
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

    client: string;

    serviceManager: string;
    personalManager: string;
}

export enum ContractType { Contract, GovermentContract };

export enum ContractStatus { 'active', 'deleted', 'waiting', 'blocked' };
