import mongoose from 'mongoose';
import { DeliveryType } from '@typings/IClient';
import { IManager } from './Manager';

const { Schema } = mongoose;

export interface IClient extends mongoose.Document {
    id: number;
    name: string;
    externalId: string;
    inn: string;
    department: string;
    personalManager: IManager;
    regDate: Date;
    deliveryMethod: DeliveryType;
    address: string;
    legalAddress?: string;
    contactFirstName: string;
    contactMiddleName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    contactPosition: string;
}

const clientSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    externalId: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    inn: {
        type: String,
    },
    department: {
        type: String,
        required: true,
    },
    personalManager: {
        type: Schema.Types.ObjectId,
        ref: 'Manager',
    },
    regDate: {
        type: Date,
        required: true,
    },
    deliveryMethod: String,
    address: String,
    legalAddress: String,
    description: String,
    contactFirstName: String,
    contactMiddleName: String,
    contactLastName: String,
    contactPosition: String,
    contactEmail: String,
    contactPhone: String,
});

export const Client = mongoose.model<IClient>('Client', clientSchema);
