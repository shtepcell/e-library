import { IClient } from "./IClient";

export interface IContract {
    id: string;

    status: ContractStatus;
    type: ContractType;

    dateOfConclusion: Date;
    endDate: Date;

    amount: string;

    hasOriginal: boolean;
    attachment: string;

    client: IClient;
}

export type ContractType = 'contract' | 'gov_contract';
export type ContractStatus = 'active' | 'deleted' | 'waiting' | 'blocked';
