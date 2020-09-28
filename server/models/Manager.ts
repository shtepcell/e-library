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
        required: [true, 'фамилия обязательно для заполнения'],
    },
    category: {
        type: String,
        enum: ['serviceManager', 'personalManager'],
        required: true,
        default: 'personalManager',
    }
});

export const Manager = mongoose.model('Manger', managerSchema);
