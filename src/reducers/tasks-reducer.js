const initialTasksState = {
	taskList: [],
	sortedAndFilteredTasklist: [],
};

export const tasksReducer = (state = initialTasksState, { type, payload }) => {
	switch (type) {
		case 'SET_TASK_LIST' :
			return{
				...state,
				taskList: payload,
			}
		case 'SET_SORTED_AND_FILTERED_LIST':
			return{
				...state,
				sortedAndFilteredTasklist: payload,
			}
		default:
			return state;
	}
};
