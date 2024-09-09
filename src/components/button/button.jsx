import { useSelector } from 'react-redux';

import styles from './button.module.css';
import { selectIsButtonDisabled } from '../../selectors';

export const Button = ({ className, children, ...attributes }) => {
	const isButtonDisabled = useSelector(selectIsButtonDisabled)
	return (
		<button
			className={`${styles.button} ${styles[className]}`}
			disabled={isButtonDisabled}
			{...attributes}
		>
			{children}
		</button>
	);
};
