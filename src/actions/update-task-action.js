import { updateFetchTask } from '../api';
import { setIsButtonDisabledAction } from './set-is-button-disabled-action';
import { setIsErrorAction } from './set-is-error-action';

export const updateTaskAction = (id, title, setTitle) => async (dispatch) => {
	dispatch(setIsButtonDisabledAction(true));
	return updateFetchTask(id, title)
		.then(() => {
			dispatch({
				type: 'UPDATE_TASK',
				payload: { id, title },
			});
			setTitle('');
		})
		.catch(() => dispatch(setIsErrorAction(true)))
		.finally(() => dispatch(setIsButtonDisabledAction(false)));
};
