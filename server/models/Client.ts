import mongoose from 'mongoose';

const { Schema } = mongoose;

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
    description: String,
    contactFirstName: String,
    contactMiddleName: String,
    contactLastName: String,
    contactPosition: String,
    contactEmail: String,
    contactPhone: String,
});

export const Client = mongoose.model('Client', clientSchema);
