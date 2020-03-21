import { takeEvery, put, call } from 'redux-saga/effects';
import { rolesActions } from '../actions'
import roles from './json_responces/roles'

function fetchData() {
    // There will be a real backend request.
    return roles
    // return fetch('http://server/getRolesPermissions')
    //     .then(response => response.json())
}

function* workerLoadData() {
    const data = yield call(fetchData)

    yield put(rolesActions.putData(data))
}

export default function* watchLoadData() {
    yield takeEvery('loadList', workerLoadData)
}