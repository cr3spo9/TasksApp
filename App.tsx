import React from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import {SafeAreaView} from 'react-native';

import TasksApp from './src';

export default function App() : JSX.Element {
	return (
		<NativeBaseProvider>
			<SafeAreaView>
				<Box py="4" px="3">
					<TasksApp />
				</Box>
			</SafeAreaView>
		</NativeBaseProvider>
	);
};

