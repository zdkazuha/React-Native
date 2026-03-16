export enum Priority {
    low = "low",
    medium = "medium",
    high = "high"
}

export type ToDo = {
    readonly id: number;
    title: string;
    todo: string;
    date: Date;
    priority: Priority
    completed: boolean;
    userId: number;
}

// export type ToDo = {
//     readonly id: number;
//     todo: string;
//     completed: boolean;
//     userId: number;
// }