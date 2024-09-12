export const updateTaskAction = (id, title) => ({
	type: 'UPDATE_TASK',
	payload: {id, title},
});