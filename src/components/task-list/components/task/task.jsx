import { useState } from 'react';
import { Input } from '../../../input/Input';
import { Button } from '../../../button/button';
import styles from './task.module.css';
import { useDispatch } from 'react-redux';
import {
	deleteTaskAction,
	updateTaskAction,
} from '../../../../actions';

export const Task = ({ id, title }) => {
	const dispatch = useDispatch();

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
				setIsInputEmpty(false);
				setNewTitle(title);
				setTimeout(() => {
					setNewTitle('');
				}, 350);
				return;
			}

			dispatch(updateTaskAction(id, newTitle, setNewTitle))
			// .then(() => setNewTitle('')) не уверен как правильно, тут обнрулить newTitle или передать в Экшен
		}
	};

	const onTaskDelete = () => {
		if (!isEditing) {
			dispatch(deleteTaskAction(id))
		} else {
			setIsInputEmpty(false);
			setNewTitle('');
			setIsEditing(false);
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
