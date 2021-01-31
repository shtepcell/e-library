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
    withPeriod: {
        type: Boolean,
        default: true,
        required: true,
    },
    number: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    trackNumber: String,
    period: {
        type: Date,
    },
    file: {
        type: String,
    },
    fileName: {
        type: String,
    },
    date: {
        type: Date,
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
    deliveryMethod: {
        type: String,
    },
});

export const Document = mongoose.model<IDocument>('Document', documentSchema);
