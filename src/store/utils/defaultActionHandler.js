import { BASE_ACTIONS } from './actionCreator';


export const defaultActionHandler = {
    [BASE_ACTIONS.SET]: (state, action) => ({
        ...state,
        ...(action.payload || {}),
    }),
};
