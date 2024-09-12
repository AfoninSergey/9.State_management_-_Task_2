const initialTasksState = {
	taskList: [],
	sortedAndFilteredTasklist: [],
};

export const tasksReducer = (state = initialTasksState, { type, payload }) => {
	switch (type) {
		case 'SET_TASK_LIST':
			return {
				...state,
				taskList: payload,
			};
		case 'ADD_NEW_TASK':
			return {
				...state,
				taskList: [...state.taskList, payload],
			};
		case 'UPDATE_TASK':
			return {
				...state,
				taskList: [
					...state.taskList.map((task) =>
						task.id === payload.id ? payload : task,
					),
				],
			};
		case 'DELETE_TASK':
			return {
				...state,
				taskList: [...state.taskList.filter(({ id }) => id !== payload)],
			};
		case 'SET_SORTED_AND_FILTERED_LIST':
			return {
				...state,
				sortedAndFilteredTasklist: payload,
			};
		default:
			return state;
	}
};
