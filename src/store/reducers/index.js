import { combineReducers } from 'redux-immutablejs';

import users from './users';
import roleRights from './roleRights';
import rolesPermissions from './rolesPermissions'

export default combineReducers({
    users,
    roleRights,
    rolesPermissions,
});
