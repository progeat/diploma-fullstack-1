import { ACTION_TYPE } from './action-type';

export const setFilterDate = (dateRange) => ({
	type: ACTION_TYPE.SET_FILTER_DATE,
	payload: dateRange,
});
