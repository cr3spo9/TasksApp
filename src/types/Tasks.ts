export type Task = {
	id: number;
	name: string;
	description?: string;
	isCompleted: boolean;
};
export type Tasks = Task[];