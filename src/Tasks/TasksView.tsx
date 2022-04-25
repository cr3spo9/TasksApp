import React from 'react';
import {
	Box,
	Heading,
	Text,
	VStack,
	HStack,
	IconButton,
	CloseIcon,
	AddIcon,
	Checkbox,
	Input,
} from 'native-base';
import type {Tasks, Task} from './Tasks';


type Props = {
    tasks: Tasks,
    inputValue: string;
    handleAddTask: () => void;
    handleDeleteTask: (id: number) => void;
    handleCompleteTask: (id: number) => void;
    handleChangeInputValue: (value: string) => void;
}


export default function TasksView({
    tasks,
    inputValue,
    handleChangeInputValue,
    handleAddTask,
    handleCompleteTask,
    handleDeleteTask,
}: Props) {

	return (
		<Box>
			<Heading mb="6" size="md">
				Tareas
			</Heading>
			<VStack>
				<Box>
					<HStack space={2} h={8} mb={4}>
						<Input
							flex={1}
							value={inputValue}
							onChangeText={v => handleChangeInputValue(v)}
							placeholder="New task"
						/>
						<IconButton icon={<AddIcon />} onPress={() => handleAddTask()} />
					</HStack>
				</Box>
				{tasks.map((task: Task) => (
					<HStack
						w="100%"
						h={25}
						mb={5}
						justifyContent={'space-between'}
						alignItems={'center'}
						key={task.id}>
						<Checkbox
							isChecked={task.isCompleted}
							value={task.name}
							onChange={() => handleCompleteTask(task.id)}
							accessibilityLabel={task.name}
						/>
						<Text
							width="100%"
							flexShrink={1}
							textAlign="left"
							mx="2"
							strikeThrough={task.isCompleted}>
							{task.name}
						</Text>
						<IconButton
							size="sm"
							icon={<CloseIcon />}
							colorScheme="trueGray"
							onPress={() => handleDeleteTask(task.id)}
						/>
					</HStack>
				))}
			</VStack>
		</Box>
	);
}
