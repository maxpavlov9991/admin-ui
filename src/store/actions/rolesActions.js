import actionCreator, { BASE_ACTIONS } from '../utils/actionCreator';

const moduleName = 'rolesPermissions';

const createAction = actionCreator(moduleName);

export const changePermission = createAction(null, null, (payload) => {
    return {
        type: 'changePermission',
        payload
    }
});

export const createRole = createAction(null, null, (payload) => {
    return {
        type: 'createRole',
        payload
    }
})

export const loadData = createAction(null, null, () => {
    return {
        type: 'loadData'
    }
})

export const putData = createAction(null, null, (payload) => {
    return {
        type: 'putData',
        payload
    }
})


export const deleteRole = createAction(null, null, (payload) => {
    return {
        type: 'deleteRole',
        payload
    }
})

