import { Counter } from "../models/Counters"

export const getId = async (id: string) => {
    const counter = await Counter.findOne({ id });

    if (!counter) {
        await createCounter(id);

        return 1;
    }

    const newId = counter.value = counter.value + 1;

    counter.save();

    return newId;
}

export const createCounter = async (id: string) => {
    const counter = new Counter({ id, value: 1 });

    return await counter.save();
}