import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'native-base';

import TasksView from './TasksView';
import type { Tasks, Task } from '../types/Tasks';

const TASK_STORAGE_KEY = '@TasksApp:tasks';

export default function TasksComponent() {
	const toast = useToast();

	const [tasks, setTasks] = useState<Tasks | [any]>([]);
	const [inputValue, setInputValue] = useState<string>('');
	const [loadingTasks, setLoadingTasks] = useState(true)

	useEffect(() => {
		getTasks();
	}, []);

	useEffect(() => {
		storeTasks();
	}, [tasks]);

	const getTasks = async () => {
		setLoadingTasks(true)
		try {
			const tasksStoraged = await AsyncStorage.getItem(TASK_STORAGE_KEY);
			if (tasksStoraged !== null) {
				setTasks(JSON.parse(tasksStoraged));
			}
		} catch (e) {
			toast.show({
				description: 'Error geting tasks',
				placement: 'top'
			});
		}
		setLoadingTasks(false)
	};
	const storeTasks = async () => {
		try {
			await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
		} catch (e) {
			toast.show({
				description: 'Error saving tasks',
				placement: 'top'
			});
		}
	};

	function handleDeleteTask(id: number) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	function handleCompleteTask(id: number) {
		const index = tasks.findIndex((task) => task.id === id);
		const tasksAux = [...tasks];
		tasksAux[index].isCompleted = !tasks[index].isCompleted;
		setTasks(tasksAux);
	}

	function handleAddTask() {
		if (inputValue !== '') {
			setTasks([
				...tasks,
				{
					id: tasks.length ? tasks[tasks.length - 1].id + 1 : 0,
					name: inputValue,
					isCompleted: false
				}
			]);
			setInputValue('');
			toast.show({
				description: 'Task created corretly',
				placement: 'top'
			});
		} else {
			toast.show({
				description: 'Please, enter a task name'
			});
		}
	}

	function handleChangeInputValue(v: string) {
		setInputValue(v);
	}

	return (
		<TasksView
			tasks={tasks}
			loadingTasks={loadingTasks}
			inputValue={inputValue}
			handleAddTask={handleAddTask}
			handleDeleteTask={handleDeleteTask}
			handleCompleteTask={handleCompleteTask}
			handleChangeInputValue={handleChangeInputValue}
		/>
	);
}
