import { useState } from 'react';
import { createFetchTask } from '../../api';
import { createTask, sortTasks, filterTasks, debounce } from '../../utils';

import { Input } from '../input/Input';
import { Button } from '../button/button';

import styles from './control-panel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsFilteringEnabled, selectTaskList } from '../../selectors';
import {
	setIsButtonDisabledAction,
	setIsErrorAction,
	setIsFilteringEnabledAction,
	setSortedAndFilteredTasksListAction,
	setTasksListAction,
} from '../../actions';

export const Controlpanel = () => {
	const dispatch = useDispatch();

	const taskList = useSelector(selectTaskList);
	const isFilteringEnabled = useSelector(selectIsFilteringEnabled);

	const [newTaskValue, setNewtaskValue] = useState('');
	const [filterPhrase, setFilterPhrase] = useState('');
	const [isInputEmptyCheck, setIsInputEmptyCheck] = useState(false);
	const [isSortingEnabled, setIsSortingEnabled] = useState(false);
	const [filteredTaskList, setFilteredTaskList] = useState([]);
	const [sortedTaskList, setSortedTaskList] = useState([]);

	const onTaskAdd = (event) => {
		event.preventDefault();

		if (newTaskValue.trim().length === 0) {
			setIsInputEmptyCheck(true);
			setNewtaskValue('');
			setTimeout(() => {
				setIsInputEmptyCheck(false);
			}, 300);
			return;
		}

		dispatch(setIsButtonDisabledAction(true));
		createFetchTask(newTaskValue)
			.then(({ id }) => {
				const ubdatedTaskList = createTask(taskList, id, newTaskValue);
				dispatch(setTasksListAction(ubdatedTaskList));
			})
			.catch(() => dispatch(setIsErrorAction(true)))
			.finally(() => {
				dispatch(setIsButtonDisabledAction(false));
				setNewtaskValue('');
			});
	};

	const onFilterTaskList = (value) => {
		if (value.trim().length > 0) {
			dispatch(setIsFilteringEnabledAction(true));

			const currentList =
				sortedTaskList.length !== 0 ? sortedTaskList : taskList;
			const filteredList = filterTasks(currentList, value);
			setFilteredTaskList(filteredList);
			dispatch(setSortedAndFilteredTasksListAction(filteredList));
		} else {
			setFilteredTaskList([]);
			dispatch(setSortedAndFilteredTasksListAction(sortedTaskList || []));
			dispatch(setIsFilteringEnabledAction(false));
		}
	};
	const debouncedOnFilter = debounce(onFilterTaskList, 150);

	const onSorting = () => {
		setIsSortingEnabled(!isSortingEnabled);

		if (!isSortingEnabled) {
			const currentList =
				filteredTaskList.length !== 0 || isFilteringEnabled
					? filteredTaskList
					: taskList;
			const sortedList = sortTasks(currentList);
			setSortedTaskList(sortedList);
			dispatch(setSortedAndFilteredTasksListAction(sortedList));
		} else {
			setSortedTaskList([]);
			dispatch(setSortedAndFilteredTasksListAction(filteredTaskList || []));
		}
	};

	const onFilterPhraseChange = ({ target: { value } }) => {
		setFilterPhrase(value);
		debouncedOnFilter(value);
	};

	const onNewTaskValueChange = ({ target: { value } }) => {
		setNewtaskValue(value);
	};

	return (
		<>
			<form className={styles.newTaskForm} onSubmit={onTaskAdd}>
				<Input
					className="newTaskInput"
					warn={isInputEmptyCheck}
					placeholder="✎ Ввести новую задачу . . ."
					value={newTaskValue}
					onChange={onNewTaskValueChange}
				/>
				<Button className="taskAddButton" type="submit">
					Добавить
				</Button>
			</form>

			<div className={styles.sortAndSearchBlock}>
				<Button className="sortButton" type="button" onClick={onSorting}>
					{!isSortingEnabled
						? 'Сортировать по алфавиту'
						: 'Отменить сортировку'}
				</Button>

				<Input
					className="searchTaskInput"
					placeholder="🔎 Поиск задач"
					value={filterPhrase}
					onChange={onFilterPhraseChange}
				/>
			</div>
		</>
	);
};
