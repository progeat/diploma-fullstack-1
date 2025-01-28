import { ACTION_TYPE } from '../actions';

const initialAccountState = {
	id: '',
	title: '',
	type: '',
	amount: '',
	icon: '',
	createdAt: '',
};

export const accountReducer = (state = initialAccountState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_ACCOUNT_DATA:
			return {
				...state,
				...payload,
			};
		case ACTION_TYPE.RESET_ACCOUNT_DATA:
			return initialAccountState;
		default:
			return state;
	}
};
