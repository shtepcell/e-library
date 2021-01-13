import mongoose from 'mongoose';
const { Schema } = mongoose;
import { IManager } from './Manager';
import { IClient } from './Client';

export interface IContract extends mongoose.Document {
    id: number;
    department: string;
    orderNumber?: string;
    type: string;
    status: string;
    conclusionDate: Date;
    endDate: Date;
    amount?: string;
    client: IClient;
    serviceManager?: IManager;
    personalManager?: IManager;
    document?: string;
    orig: boolean;
    fileName?: string;
    file?: string;
};

const contractSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    orderNumber: {
        type: String,
    },
    department: String,
    client: {
        type:  Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    type: {
        type: String,
        default: 'Договор',
        enum: ['Договор', 'Государственный контракт']
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    conclusionDate: Date,
    endDate: Date,
    amount: String,
    serviceManager: {
        type:  Schema.Types.ObjectId,
        ref: 'Manager',
    },
    personalManager: {
        type:  Schema.Types.ObjectId,
        ref: 'Manager',
    },
    fileName: String,
    file: String,
    document: String,
    orig: {
        type: Boolean,
        default: false,
    },
});

export const Contract = mongoose.model<IContract>('Contract', contractSchema);
