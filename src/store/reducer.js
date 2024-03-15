import {createSlice} from '@reduxjs/toolkit';
import InitState from './initState';
import store from "./index";

const mainSlice = createSlice({
    name: 'main',
    initialState: InitState,
    reducers: {
        saveAccount(state, action) {
            state.account = action.payload;
        },
        savePublicKey(state, action) {
            state.public_key = action.payload;
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
        saveEthSignature(state, action) {
            state.eth_signature = action.payload;
        },
        saveNeuronAddress(state, action) {
            state.neuron_address = action.payload;
        },
        saveNeuronClaimNum(state, action) {
            state.ckb_claim_num = action.payload;
        },
        saveClaimAllNum(state, action) {
            state.claim_all_num = action.payload;
        },
        saveSeeuClaimNum(state, action) {
            state.seeu_claim_num = action.payload;
        },
        saveSignature(state, action) {
            state.signature = action.payload;
        },
        saveShowSign(state, action) {
            state.showSign = action.payload;
        },
        getClaimNum(state,action) {
            const fullData = action.payload;
            if (!fullData.address) {
                if (fullData.type === 'ethereum' || fullData.type === 'ckb') {
                    // store.dispatch(saveNeuronClaimNum(0));
                    state.ckb_claim_num = 0;
                } else if (fullData.type === 'bitcoin') {
                    state.seeu_claim_num = 0;
                    // store.dispatch(saveSeeuClaimNum(0));
                }
                return;
            }
            const myHeaders = new Headers();
            myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com)");
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch("https://api-airdrop.seeuclub.xyz/nfts/claimed/" + fullData.type + "/" + fullData.address, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(44444444444,result);
                    const res = JSON.parse(result);
                    if (res && res.data) {
                        console.log('store',res.data);
                        const num = res.data.total - res.data.claimed;
                        if (fullData.type === 'ethereum' || fullData.type === 'ckb') {
                            store.dispatch(saveNeuronClaimNum(num));
                        } else if (fullData.type === 'bitcoin') {
                            store.dispatch(saveSeeuClaimNum(num));
                        }
                    } else if (fullData.type === 'ethereum' || fullData.type === 'ckb') {
                        console.log(66666666666);
                        store.dispatch(saveNeuronClaimNum(0));
                    } else if (fullData.type === 'bitcoin') {
                        store.dispatch(saveSeeuClaimNum(0));
                        console.log(55555555555);

                    }
                })
                .catch(error => {
                    console.log('error', error);
                    console.log(222222222222222222);
                    if (fullData.type === 'ethereum' || fullData.type === 'ckb') {
                        store.dispatch(saveNeuronClaimNum(0));
                    } else if (fullData.type === 'bitcoin') {
                        console.log(333333333333);
                        store.dispatch(saveSeeuClaimNum(0));
                    }
                })
                .finally();
        }
    },
});

export const {
    saveAccount,
    savePublicKey,
    saveType,
    saveJoyid,
    savePopup,
    saveJoyidSignMsg,
    saveNeuronSignature,
    saveEthSignature,
    saveClaimAllNum,
    saveNeuronAddress,
    saveNeuronClaimNum,
    saveSeeuClaimNum,
    getClaimNum,
    saveSignature,
    saveShowSign,
    saveLoading
} = mainSlice.actions;
export default mainSlice.reducer;
