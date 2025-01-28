import { ACTION_TYPE } from '../actions';

const initialAccountsState = {
	accounts: [],
};

export const accountsReducer = (state = initialAccountsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_ACCOUNTS:
			return {
				...state,
				accounts: [...payload],
			};
		case ACTION_TYPE.SET_ACCOUNT:
			return {
				...state,
				accounts: [...state.accounts, payload],
			};
		case ACTION_TYPE.SET_ACCOUNT_BALANCE:
			return {
				...state,
				accounts: state.accounts.map((account) =>
					account.id === payload.id ? payload.account : account,
				),
			};
		case ACTION_TYPE.RESET_ACCOUNTS:
			return initialAccountsState;
		default:
			return state;
	}
};
