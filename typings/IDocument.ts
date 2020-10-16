export interface IDocument {
    id: number;
    number: number;
    type: string;
    trackNumber?: string;
    date: Date;
    period: Date;
    contract: number;
    orig: boolean;
};