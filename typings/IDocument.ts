import { IContract } from "./IContract";

export interface IDocument {
    id: number;
    number: number;
    type: string;
    trackNumber?: string;
    date: number;
    period: number;
    contract: IContract;
    file?: string;
    fileName?: string;
    comment?: string;
    deliveryMethod: string;
};