import actionCreator, { BASE_ACTIONS } from '../utils/actionCreator';

const moduleName = 'rolesPermissions';

const createAction = actionCreator(moduleName);

export const resetPermissions = createAction(BASE_ACTIONS.RESET, 'permissions');
