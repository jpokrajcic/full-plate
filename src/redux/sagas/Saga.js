import { takeLatest } from 'redux-saga/effects';
import { AUTH_REQUEST } from '../actionTypes';
import authorizeGen from './user/authorizeGen';

function * Saga () {
    console.log('SAGA register events');
    yield takeLatest(AUTH_REQUEST, authorizeGen);
}

export default Saga;