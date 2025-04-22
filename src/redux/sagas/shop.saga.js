import { call, put, takeLatest } from "redux-saga/effects";
import { shopActions } from "../slices/shop.slice";
import { toast } from "react-toastify";
import { shopApi } from "@/api-client";

function* fetchShop(action) {
    try {
        const res = yield call(shopApi.getShop, action.payload);
        yield put(shopActions.fetchShopSuccess(res.data));
    } catch (error) {
        toast.error("Error fetching shop data. F5 to refresh.");
        yield put(shopActions.fetchShopFailure());
    }
}

export default function* shopSaga() {
    yield takeLatest(shopActions.fetchShop.type, fetchShop);
}