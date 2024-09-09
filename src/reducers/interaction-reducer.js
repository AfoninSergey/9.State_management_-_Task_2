const initialInteractionState = {
	isloading: true,
	isError: false,
	isButtonDisabled: false,
	isFilteringEnabled: false,
};

export const interactionReducer = (
	state = initialInteractionState,
	{ type, payload },
) => {
	switch (type) {
		case 'SET_IS_LOADING':
			return {
				...state,
				isloading: payload,
			};
		case 'SET_IS_ERROR':
			return {
				...state,
				isError: payload,
			};

		case 'SET_IS_BUTTON_DISABLED':
			return {
				...state,
				isButtonDisabled: payload,
			};
		case 'SET_IS_FILTERING_ENABLED':
			return {
				...state,
				isFilteringEnabled: payload,
			};
		default:
			return state;
	}
};
