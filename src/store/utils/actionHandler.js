import { BASE_ACTIONS } from './actionCreator';
import { defaultActionHandler } from './defaultActionHandler';

export default (customHandler, initialState) => (state = initialState, action) => {
    if (customHandler && typeof customHandler === 'object' && customHandler[action.type] && typeof customHandler[action.type] === 'function') {
        return customHandler[action.type](state, action);
    }

    return handleAction(state, action);
}


const handleAction = (state, action) => {
    const [moduleName, actionName, method = BASE_ACTIONS.BASE] = action.type.split('/');

    return defaultActionHandler[method] ? defaultActionHandler[method](state, action) : state;
};
