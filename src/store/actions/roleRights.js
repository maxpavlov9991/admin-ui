import actionCreator, { BASE_ACTIONS } from '../utils/actionCreator';

const moduleName = 'roleRights';

const createAction = actionCreator(moduleName);

export const setPermissions = createAction(BASE_ACTIONS.SET, 'rights');
