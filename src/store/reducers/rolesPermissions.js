import { cloneDeep } from 'lodash'
import actionHandler from '../utils/actionHandler';

export const initialState = {
roles: [
    {
        name: 'Прораб',
        permissions: {
                'model': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4d',
                'id': 'model',
            },
            'works': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4c',
                'id': 'works',
            },
            'technology': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4b',
                'id': 'technology',
            },
            'resources': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4a',
                'id': 'resources',
            },
            'charts': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a49',
                'id': 'charts',
            },
            'execution_log': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a48',
                'id': 'execution_log',
            },
            'execution': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a47',
                'id': 'execution',
            },
            'report': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a46',
                'id': 'report',
            },
            'tender': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a45',
                'id': 'tender',
            },
            'suppliers': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a44',
                'id': 'suppliers',
            },
            'documents': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a43',
                'id': 'documents',
            },
            'exploitation': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a42',
                'id': 'exploitation',
            },
            'prices': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a41',
                'id': 'prices',
            },
        },
    },
    {
        name: 'Специалист по закупкам',
        permissions: {
            'model': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4d',
                'id': 'model',
            },
            'works': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4c',
                'id': 'works',
            },
            'technology': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4b',
                'id': 'technology',
            },
            'resources': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4a',
                'id': 'resources',
            },
            'charts': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a49',
                'id': 'charts',
            },
            'execution_log': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a48',
                'id': 'execution_log',
            },
            'execution': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a47',
                'id': 'execution',
            },
            'report': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a46',
                'id': 'report',
            },
            'tender': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a45',
                'id': 'tender',
            },
            'suppliers': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a44',
                'id': 'suppliers',
            },
            'documents': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a43',
                'id': 'documents',
            },
            'exploitation': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a42',
                'id': 'exploitation',
            },
            'prices': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a41',
                'id': 'prices',
            },
        },
    },
]};

const customHandler = {
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
        if (action.payload.name === '' || newState.roles.find(role => role.name === action.payload.name)) {
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
