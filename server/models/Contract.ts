import mongoose from 'mongoose';
const { Schema } = mongoose;

const contractSchema = new Schema({
    id: {
        type: Number,
        unique: true,
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
    summary: String,
    serviceManager: {
        type:  Schema.Types.ObjectId,
        ref: 'Manager',
    },
    personalManager: {
        type:  Schema.Types.ObjectId,
        ref: 'Manager',
    },
    document: String,
    orig: Boolean,
});

export const Contract = mongoose.model('Contract', contractSchema);
