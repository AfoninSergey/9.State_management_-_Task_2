import { createFetchTask } from '../api';
import { setIsButtonDisabledAction } from './set-is-button-disabled-action';
import { setIsErrorAction } from './set-is-error-action';

export const addNewTaskAction = (title, setTitle) => async (dispatch) => {
	dispatch(setIsButtonDisabledAction(true));
	
	return createFetchTask(title)
		.then(({ id }) => dispatch({ type: 'ADD_NEW_TASK', payload: { id, title } }))
		.catch(() => dispatch(setIsErrorAction(true)))
		.finally(() => {
			dispatch(setIsButtonDisabledAction(false));
			setTitle('');
		});
};
