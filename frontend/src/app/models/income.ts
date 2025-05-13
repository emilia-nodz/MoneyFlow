import { Category } from "./category";

export interface Income {
    id: number,
    amount: number,
    date: Date,
    description: string,
    category?: Category,
    category_id?: number
}
