import { request } from '../utils';
import { setAccounts } from './set-accounts';
import { setIsLoadingAccounts } from './set-is-loading-accounts';

export const updateAccounts = async (dispatch) => {
	request('/accounts').then(({ data }) => {
		dispatch(setAccounts(data));
		dispatch(setIsLoadingAccounts(false));
	});
};
