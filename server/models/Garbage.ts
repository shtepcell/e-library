import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IGarbage extends mongoose.Document {
    url: string
};

const garbageSchema = new Schema({
    url: {
        type: String,
        unique: true,
    },
});

export const Garbage = mongoose.model<IGarbage>('Garbage', garbageSchema);
