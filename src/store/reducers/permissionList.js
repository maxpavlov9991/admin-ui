import { cloneDeep } from 'lodash'
import actionHandler from '../utils/actionHandler';

export const initialState = {
    permissions: []
};

const customHandler = {
    putList: (state, action) => {
        const permissions = cloneDeep(action.payload)
        const newState = { permissions }
        return newState
    }
};

const permissionList = actionHandler(customHandler, initialState);

export default permissionList;
