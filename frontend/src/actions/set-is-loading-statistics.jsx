import { ACTION_TYPE } from './action-type';

export const setIsLoadingStatistics = (boolean) => ({
	type: ACTION_TYPE.SET_IS_LOADING,
	payload: { statistics: boolean },
});
