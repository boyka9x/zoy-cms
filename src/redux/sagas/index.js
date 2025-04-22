import { all } from 'redux-saga/effects';
import shopSaga from './shop.saga';

export default function* rootSaga() {
    yield all([shopSaga()]);
}