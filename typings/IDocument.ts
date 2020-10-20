export interface IDocument {
    id: number;
    number: number;
    type: string;
    trackNumber?: string;
    date: number;
    period: number;
    contract: number;
    orig: boolean;
    file: string;
    fileName: string;
};