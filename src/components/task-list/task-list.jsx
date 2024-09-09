import { useEffect } from 'react';
import { Loader, Error, Task, TaskListEmpty } from './components';

import styles from './task-list.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksFromServerAction } from '../../actions';
import {
	selectIsError,
	selectIsFilteringEnabled,
	selectIsLoading,
	selectTaskList,
} from '../../selectors';
import { selectSortedAndFilteredTasklist } from '../../selectors/select-sorted-filtered-tasklist';

export const TaskList = () => {
	const dispatch = useDispatch();
	const isError = useSelector(selectIsError);
	const isloading = useSelector(selectIsLoading);
	const taskList = useSelector(selectTaskList);
	const isFilteringEnabled = useSelector(selectIsFilteringEnabled);
	const sortedAndFilteredTasklist = useSelector(selectSortedAndFilteredTasklist);

	useEffect(() => {
		dispatch(getTasksFromServerAction);
	}, [dispatch]);

	if (isloading) return <Loader />;
	if (isError) return <Error />;
	if (
		taskList.length === 0 ||
		(sortedAndFilteredTasklist.length === 0 && isFilteringEnabled)
	)
		return <TaskListEmpty />;

	return (
		<ul className={styles.taskList}>
			{(sortedAndFilteredTasklist.length !== 0 || isFilteringEnabled
				? sortedAndFilteredTasklist
				: taskList
			).map(({ id, title }) => (
				<Task key={id} id={id} title={title} />
			))}
		</ul>
	);
};
