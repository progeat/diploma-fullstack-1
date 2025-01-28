import { ACTION_TYPE } from '../actions';

const initialStatisticsState = {
	statistics: {
		expenses: [],
		income: [],
	},
};

export const statisticsReducer = (state = initialStatisticsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_STATISTICS:
			return {
				...state,
				statistics: { ...payload },
			};
		case ACTION_TYPE.RESET_STATISTICS:
			return initialStatisticsState;
		default:
			return state;
	}
};
