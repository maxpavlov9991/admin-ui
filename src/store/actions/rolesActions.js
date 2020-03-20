import actionCreator, { BASE_ACTIONS } from '../utils/actionCreator';

const moduleName = 'rolesPermissions';

const createAction = actionCreator(moduleName);

export const resetRolePermission = createAction(null, null, (payload) => {
    return {
        type: 'resetRolePermission',
        payload
    }
});

export const createRole = createAction(null, null, (payload) => {
    return {
        type: 'createRole',
        payload
    }
})
