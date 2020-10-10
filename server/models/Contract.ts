import mongoose from 'mongoose';
const { Schema } = mongoose;

const contractSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
});

export const Contract = mongoose.model('Contract', contractSchema);
