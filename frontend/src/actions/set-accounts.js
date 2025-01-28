import { ACTION_TYPE } from './action-type';

export const setAccounts = (accounts) => ({
	type: ACTION_TYPE.SET_ACCOUNTS,
	payload: accounts,
});
