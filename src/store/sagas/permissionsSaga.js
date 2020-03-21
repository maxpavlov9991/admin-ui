import { takeEvery, put, call } from 'redux-saga/effects';
import { permissionListActions } from '../actions'
import list from './serverData/LIST_PERMISSIONS'

function fetchData() {
    // There will be a real backend request.
    return list
    // return fetch('http://server/getRolesPermissions')
    //     .then(response => response.json())
}

function* workerLoadData() {
    const data = yield call(fetchData)

    yield put(permissionListActions.putList(data))
}

export default function* watchLoadData() {
    yield takeEvery('loadList', workerLoadData)
}