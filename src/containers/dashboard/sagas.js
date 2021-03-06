import axios from 'axios';
import { call, put, take } from 'redux-saga/effects';
import {
  loadRaids,
  FETCH_RAID_DATA
 } from './actions';

export function* watchLoadRaids() {
  while (true) {
    yield take(FETCH_RAID_DATA);
    yield call(loadRaidSaga);
  }
}

export function* loadRaidSaga() {
  // When routes are authenticated, we might have to pull an access_token
  // from localStorage here to pass it in the header.
  const callServerForRaids = () => {
    return axios.get(`http://localhost:8000/api/raids`);
  }

  try {
    const raids = yield call(callServerForRaids);
    console.log('Fetch successfull!');
    console.log(raids.data);
    yield put(loadRaids(raids.data));
  }
  catch (error) {
    console.log(error)
  }
}
