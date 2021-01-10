import { Counter } from "../models/Counters"

export const getId = async (id: string): Promise<number> => {
    const counter = await Counter.findOneAndUpdate({ id }, { $inc: { value: 1 } });

    if (!counter) {
        const cnt = await createCounter(id);

        return cnt.value;
    }

    return counter.value;
}

export const createCounter = async (id: string) => {
    const existCounter = await Counter.findOne({ id });

    if (existCounter) {
        return existCounter;
    }

    const counter = new Counter({ id, value: 1 });

    return await counter.save();
}