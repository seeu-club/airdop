import {createSlice} from '@reduxjs/toolkit';
import InitState from './initState';

const mainSlice = createSlice({
    name: 'main',
    initialState: InitState,
    reducers: {
        saveAccount(state, action) {
            state.account = action.payload;
        },
        saveLoading(state, action) {
            state.loading = action.payload;
        },
        saveType(state, action) {
            state.type = action.payload;
        },
        saveJoyid(state, action) {
            state.joyid_account = action.payload;
        },
        saveSignature(state, action) {
            state.signature = action.payload;
        },
        saveShowSign(state, action) {
            state.showSign = action.payload;
        },
    },
});

export const {
    saveAccount,
    saveType,
    saveJoyid,
    saveSignature,
    saveShowSign,
    saveLoading
} = mainSlice.actions;
export default mainSlice.reducer;