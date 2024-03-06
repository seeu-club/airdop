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
        savePopup(state, action) {
            state.popup = action.payload;
        },
        saveJoyidSignMsg(state, action) {
            state.joyid_sign_msg = action.payload;
        },
        saveNeuronSignature(state, action) {
            state.neuron_signature = action.payload;
        },
        saveNeuronAddress(state, action) {
            state.neuron_address = action.payload;
        },
        saveNeuronClaimNum(state, action) {
            state.neuron_claim_num = action.payload;
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
    savePopup,
    saveJoyidSignMsg,
    saveNeuronSignature,
    saveNeuronAddress,
    saveNeuronClaimNum,
    saveSignature,
    saveShowSign,
    saveLoading
} = mainSlice.actions;
export default mainSlice.reducer;
