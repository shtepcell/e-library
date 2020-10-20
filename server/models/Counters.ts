import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface ICounter extends mongoose.Document {
    id: string;
    value: number;
};

const counterSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

export const Counter = mongoose.model<ICounter>('Counter', counterSchema);
