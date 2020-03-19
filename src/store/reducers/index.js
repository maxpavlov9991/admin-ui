import { combineReducers } from 'redux-immutablejs';

import users from './users';
import roleRights from './roleRights';

export default combineReducers({
    users,
    roleRights,
});
