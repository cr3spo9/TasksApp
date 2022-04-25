import React, {useState} from 'react';
import {
	useToast,
} from 'native-base';

import TasksView from './TasksView'

export type Task = {
	id: number;
	name: string;
	description: string;
	isCompleted: boolean;
};
export type Tasks = Task[];

let initialTasks = require('../tasks.json');

export default function Tasks() {
	const [tasks, setTasks] = useState<Tasks | []>(initialTasks);
	const [inputValue, setInputValue] = useState<string>('');

	const toast = useToast();

	function handleDeleteTask(id: number) {
		setTasks(tasks.filter(task => task.id !== id));
	}

	function handleCompleteTask(id: number) {
		const index = tasks.findIndex(task => task.id === id);
		const tasksAux = [...tasks];
		tasksAux[index].isCompleted = !tasks[index].isCompleted;
		setTasks(tasksAux);
	}

	function handleAddTask() {
		if (inputValue !== '') {
			setTasks([
				...tasks,
				{
					id: tasks.length + 1,
					name: inputValue,
					description: '',
					isCompleted: false,
				},
			]);
            setInputValue('');
            toast.show({
                description: 'Task created corretly',
                placement: 'top',
            })
		} else {
            toast.show({
                description: 'Please, enter a task name'
            })
		}
	}

	function handleChangeInputValue(v: string) {
		setInputValue(v);
	}

	return (
		<TasksView 
			tasks={tasks}
			inputValue={inputValue}
			handleAddTask={handleAddTask}
			handleDeleteTask={handleDeleteTask}
			handleCompleteTask={handleCompleteTask}
			handleChangeInputValue={handleChangeInputValue}
		/> 
	);
}
