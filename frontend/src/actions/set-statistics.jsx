import { ACTION_TYPE } from './action-type';

export const setStatistics = (statistics) => ({
	type: ACTION_TYPE.SET_STATISTICS,
	payload: statistics,
});
