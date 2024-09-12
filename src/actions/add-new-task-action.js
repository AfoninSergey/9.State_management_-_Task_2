export const addNewTaskAction = (id, title) => ({
	type: 'ADD_NEW_TASK',
	payload: {id, title},
});