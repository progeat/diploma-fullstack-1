import { ACTION_TYPE } from './action-type';

export const setFilterCategory = (category) => ({
	type: ACTION_TYPE.SET_FILTER_CATEGORY,
	payload: category,
});
