import { setIsButtonDisabledAction } from './set-is-button-disabled-action';
import { setIsErrorAction } from './set-is-error-action';
import { deleteFetchTask } from '../api';

export const deleteTaskAction = (id) => async (dispatch) => {
	dispatch(setIsButtonDisabledAction(true));

	return deleteFetchTask(id)
		.then(() => dispatch({ type: 'DELETE_TASK', payload: id }))
		.catch(() => dispatch(setIsErrorAction(true)))
		.finally(() => dispatch(setIsButtonDisabledAction(false)));
};
