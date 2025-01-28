import { ACTION_TYPE } from './action-type';

export const setFilterAccount = (account) => ({
	type: ACTION_TYPE.SET_FILTER_ACCOUNT,
	payload: account,
});
