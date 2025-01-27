import { ACTION_TYPE } from './action-type';

export const setIsLoadingAccounts = (boolean) => ({
	type: ACTION_TYPE.SET_IS_LOADING,
	payload: { accounts: boolean },
});
