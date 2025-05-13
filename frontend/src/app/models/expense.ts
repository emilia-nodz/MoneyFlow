import { Category } from "./category";

export interface Expense {
    id: number,
    amount: number,
    date: Date,
    description: string,
    category?: Category,
    category_id?: number
}
