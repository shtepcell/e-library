import mongoose from 'mongoose';
const { Schema } = mongoose;

const managerSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'Имя обязательно для заполнения'],
    },
    middleName: {
        type: String,
        required: [true, 'Отчество обязательно для заполнения'],
    },
    lastName: {
        type: String,
        required: [true, 'Фамилия обязательна для заполнения'],
    }
});

export const Manager = mongoose.model('Manager', managerSchema);
