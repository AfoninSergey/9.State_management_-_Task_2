import { useState } from 'react';
import { Input } from '../../../input/Input';
import { Button } from '../../../button/button';
import { updateFetchTask, deleteFetchTask } from '../../../../api';
import { deleteTask, updateTask } from '../../../../utils';
import styles from './task.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskList } from '../../../../selectors';
import {
	setIsButtonDisabledAction,
	setIsErrorAction,
	setTasksListAction,
} from '../../../../actions';

export const Task = ({ id, title }) => {
	const dispatch = useDispatch();
	const taskList = useSelector(selectTaskList);

	const [newTitle, setNewTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [isInputEmpty, setIsInputEmpty] = useState(false);

	const onTitleChange = ({ target: { value } }) => {
		setNewTitle(value);

		if (value.length === 0) {
			setIsInputEmpty(true);
		} else if (value.length === 1) {
			setIsInputEmpty(false);
		}
	};

	const onTaskEdit = () => {
		setIsEditing(!isEditing);

		if (!isEditing) {
			setNewTitle(title);
		}

		if (isEditing) {

			if (newTitle.trim().length === 0 || newTitle === title) {
				// dispatch(setTasksListAction(taskList));
				setIsInputEmpty(false);
				setNewTitle(title);
				setTimeout(() => {
					setNewTitle('');
				}, 350);
				return;
			}

			dispatch(setIsButtonDisabledAction(true));
			updateFetchTask(id, newTitle)
				.then(() => {
					const ubdatedTaskList = updateTask(taskList, id, newTitle);
					dispatch(setTasksListAction(ubdatedTaskList));
					setNewTitle('');
				})
				.catch(() => dispatch(setIsErrorAction(true)))
				.finally(() => dispatch(setIsButtonDisabledAction(false)));
		}
	};

	const onTaskDelete = () => {


		if (!isEditing) {
			dispatch(setIsButtonDisabledAction(true));
			deleteFetchTask(id)
				.then(() => {
					const ubdatedTaskList = deleteTask(taskList, id);
					dispatch(setTasksListAction(ubdatedTaskList));
				})
				.catch(() => dispatch(setIsErrorAction(true)))
				.finally(() => dispatch(setIsButtonDisabledAction(false)));
		} else {
			setIsInputEmpty(false);
			setNewTitle('');
			setIsEditing(false);
			// dispatch(setIsButtonDisabledAction(false));
			// dispatch(setTasksListAction(taskList));
		}
	};

	return (
		<li className={styles.task}>
			<Input
				className="taskInput"
				isEditing={isEditing}
				readOnly={!isEditing}
				value={newTitle}
				placeholder={!isInputEmpty ? title : ''}
				onChange={onTitleChange}
			/>
			<div className={styles.task_actions}>
				<Button className="editButton" type="button" onClick={onTaskEdit}>
					{!isEditing ? 'Изменить' : 'Сохранить'}
				</Button>
				<Button
					className="deleteButton"
					type="button"
					onClick={onTaskDelete}
				>
					{!isEditing ? 'Удалить' : 'Отменить'}
				</Button>
			</div>
		</li>
	);
};
