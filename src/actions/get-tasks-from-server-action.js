import { readFetchTasks } from '../api';
import { setIsErrorAction } from './set-is-error-action';
import { setIsLoadingAction } from './set-is-loading-action';

export const getTasksFromServerAction = async (dispatch) =>
	readFetchTasks()
		.then((fedchedTasks) =>
			dispatch({
				type: 'SET_TASK_LIST',
				payload: fedchedTasks,
			}),
		)
		.catch(() => dispatch(setIsErrorAction(true)))
		.finally(() => dispatch(setIsLoadingAction(false)));
