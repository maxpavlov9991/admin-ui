import actionCreator, { BASE_ACTIONS } from '../utils/actionCreator';

const moduleName = 'permissionList';

const createAction = actionCreator(moduleName);


export const loadList = createAction(null, null, () => {
    return {
        type: 'loadList'
    }
})

export const putList = createAction(null, null, (payload) => {
    return {
        type: 'putList',
        payload
    }
})

