import { cloneDeep } from 'lodash'
import actionHandler from '../utils/actionHandler';

export const initialState = {
    roles: []
};

const customHandler = {
    putData: (state, action) => {
        const roles = cloneDeep(action.payload)
        const newState = { roles }
        return newState
    },
    resetRolePermission: (state, action) => {
        const newState = cloneDeep(state)
        const field = newState.roles.find(role => role.name === action.payload.roleName).permissions[action.payload.field]
        field[action.payload.permission] = !field[action.payload.permission]
        return newState
    },
    createRole: (state, action) => {
        const newState = cloneDeep(state)
        const newRole = cloneDeep(action.payload)
        newRole.name = newRole.name.trim()
        if (newRole.name === '' || newState.roles.find(role => role.name === newRole.name)) {
            return newState
        }
        newState.roles.push(newRole)
        return newState
    },
};

const rolesPermissions = actionHandler(customHandler, initialState);

// rolesPermission - функция, возвращающая стейт в зависимости от actionType агрументы (state, action)
// она и есть редьюсер!!!


export default rolesPermissions;
