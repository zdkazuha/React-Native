export enum Priority {
    low = "low",
    medium = "medium",
    high = "high"
}

export type ToDo = {
    readonly id: number;
    title: string;
    todo: string;
    deadline: Date;
    priority: Priority
    completed: boolean;
    userId: number;
    notificationId: string | null
}