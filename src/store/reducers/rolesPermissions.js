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
    changePermission: (state, action) => {
        const newState = cloneDeep(state)
        const newField = newState.roles.find(role => role.name === action.payload.name).permissions[action.payload.field]
        if (newField.create && newField.read && newField.update && newField.delete) {
            newField.create = false
            newField.read = false
            newField.update = false
            newField.delete = false
        } else if (newField.read) {
            newField.create = true
            newField.read = true
            newField.update = true
            newField.delete = true
        } else {
            newField.create = false
            newField.read = true
            newField.update = false
            newField.delete = false
        }
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
    deleteRole: (state, action) => {
        const newState = cloneDeep(state)
        newState.roles.splice(newState.roles.findIndex((role => role.name === action.payload)), 1)
        return newState
    }
};

const rolesPermissions = actionHandler(customHandler, initialState);

export default rolesPermissions;
