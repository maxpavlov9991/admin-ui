import { combineReducers } from 'redux-immutablejs';

import users from './users';
import roleRights from './roleRights';
import rolesPermissions from './rolesPermissions'
import permissionList from './permissionList'


export default combineReducers({
    users,
    roleRights,
    rolesPermissions,
    permissionList,
});
