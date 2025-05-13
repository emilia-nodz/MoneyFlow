import { Source } from "./source";

export interface Income {
    id: number,
    amount: number,
    date: Date,
    description: string,
    source?: Source,
    source_id?: number
}
