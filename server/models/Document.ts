import mongoose from 'mongoose';
import { IContract } from './Contract';

const { Schema } = mongoose;

export interface IDocument extends mongoose.Document {
    id: number;
    number: number;
    type: string;
    trackNumber?: string;
    date: Date;
    period: Date;
    contract: IContract;
    file: string;
    fileName: string;
    comment?: string;
};

const documentSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    number: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    trackNumber: String,
    period: {
        type: Date,
        required: true,
    },
    file: {
        type: String,
    },
    fileName: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    contract: {
        type: Schema.Types.ObjectId,
        ref: 'Contract',
        required: true,
    },
    comment: {
        type: String,
        default: '',
    },
});

export const Document = mongoose.model<IDocument>('Document', documentSchema);
