import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import OutlinedInput from '@mui/material/OutlinedInput';
import {useSelector} from "react-redux";
import store from "../../store";
import {saveNeuronAddress, saveNeuronClaimNum, saveNeuronSignature, savePopup} from "../../store/reducer";
import {shortAddress} from "../../utils/global";



export default function Popup(props){
    const {showPopup,close} = props;
    const joyid_sign_msg = useSelector(store => store.joyid_sign_msg);
    console.log(typeof joyid_sign_msg,joyid_sign_msg);
    const neuron_signature = useSelector(store => store.neuron_signature);
    const neuron_address = useSelector(store => store.neuron_address);
    const handleClick = () => {
        if (neuron_signature) {
            store.dispatch(saveNeuronSignature(neuron_signature));
            const myHeaders = new Headers();
            myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com)");
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch("https://seeu-nft-rest-beta.matrixlabs.org/nfts/claimed/ethereum/0x82471774a29102c885e6370d722b9b4c820c2780", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const res = JSON.parse(result);
                    if (res && res.data) {
                        store.dispatch(saveNeuronAddress('1'));
                        store.dispatch(saveNeuronClaimNum(2));
                    }
                })
                .catch(error => console.log('error', error))
                .finally(()=>handleClose());
        }

    };

    const handleClose = () => {
        // store.dispatch(savePopup(false));
        close();
    };

    const handleCopy = () => {
        navigator.clipboard
            .writeText(joyid_sign_msg);
    }

    const open = Boolean(showPopup);
    const id = open ? 'simple-popover' : undefined;

    return <>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={showPopup}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                >
                    <Typography sx={{ p: 2 }}>
                        <div className="flex min-w-150">
                            <span>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0.5C5.39394 0.5 0 5.87374 0 12.5C0 19.1263 5.37374 24.5 12 24.5C18.6263 24.5 24 19.1263 24 12.5C24 5.87374 18.6061 0.5 12 0.5Z" fill="#FE609D"/>
                                    <path d="M18.3818 8.8373C17.5314 8.89385 15.607 9.00588 15.5403 8.9552C15.6243 9.08041 17.212 9.93307 17.8255 10.2757C17.64 10.6786 17.5164 11.0813 17.331 11.4265L14.3639 11.8294L16.7129 12.6349C13.4985 17.9862 8.24423 16.8354 8.24423 16.8354C8.24423 16.8354 5.93813 18.9111 5.64795 19.1369C5.35779 19.3629 5.39799 19.5615 5.15348 19.4822C4.90901 19.4029 5.02988 19.1945 5.02988 19.1369C5.70981 17.6409 8.8006 11.7143 16.3421 7.16861C10.655 9.24005 7.74969 12.9802 6.26613 15.7997C5.83344 14.7064 4.53536 10.3333 10.9023 7.51387L12.3241 8.54958L12.5095 6.88095C14.2403 6.30552 16.342 5.84521 19 5.5C18.8764 6.76585 18.6291 7.85908 18.3818 8.8373Z" fill="white"/>
                                </svg>
                            </span>
                            <span className="popup-title">
                            Signature Info
                            </span>
                        </div>
                        <div className="popup-msg">
                            Message
                        </div>
                        <div className="popup-key flex justify-center items-center">
                            <div>
                                {shortAddress(joyid_sign_msg)}
                            </div>
                            <div onClick={handleCopy} className=" ml-4 cursor-pointer">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_222_67)">
                                        <path d="M10.7244 3.04762C11.0339 3.04762 11.3307 3.16803 11.5495 3.38235C11.7684 3.59668 11.8913 3.88737 11.8913 4.19048V14.8571C11.8913 15.1602 11.7684 15.4509 11.5495 15.6653C11.3307 15.8796 11.0339 16 10.7244 16H2.16693C2.01368 16 1.86194 15.9704 1.72036 15.913C1.57878 15.8556 1.45014 15.7714 1.34178 15.6653C1.23343 15.5591 1.14747 15.4332 1.08883 15.2945C1.03018 15.1558 1 15.0072 1 14.8571V4.19048C1 3.88737 1.12294 3.59668 1.34178 3.38235C1.56063 3.16803 1.85744 3.04762 2.16693 3.04762H10.7244ZM10.3354 4.57143H2.5559V14.4762H10.3354V4.57143ZM13.8331 2.18946e-07C14.1233 -0.000175621 14.4032 0.105569 14.6181 0.296596C14.833 0.487624 14.9675 0.750223 14.9953 1.03314L15 1.14286V11.4232C14.9998 11.6174 14.9239 11.8042 14.7877 11.9454C14.6516 12.0866 14.4656 12.1716 14.2676 12.183C14.0697 12.1944 13.8748 12.1313 13.7227 12.0067C13.5707 11.882 13.473 11.7052 13.4495 11.5124L13.4441 11.4232V1.52381H5.6677C5.47716 1.52379 5.29325 1.45527 5.15086 1.33126C5.00846 1.20726 4.91749 1.03638 4.8952 0.851048L4.88975 0.761905C4.88978 0.575289 4.95973 0.395172 5.08635 0.255717C5.21297 0.116262 5.38745 0.0271676 5.57668 0.00533357L5.6677 2.18946e-07H13.8331Z" fill="#07CEFA"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_222_67">
                                            <rect width="16" height="16" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="popup-desc">
                            The message will be signed with magic bytes “Nervos Message”
                        </div>
                        <div className="popup-sign">
                            Signature
                        </div>
                        <div>
                        <div>
                            <OutlinedInput
                                size="small"
                                fullWidth
                                value={neuron_signature}
                                placeholder={'Signature'}
                                id="component-outlined"
                            />
                        </div>
                        </div>
                        <div className="popup-sign">
                            Account
                        </div>
                        <div>
                            <div>
                                <OutlinedInput
                                    fullWidth
                                    size="small"
                                    value={neuron_address}
                                    placeholder={'Account'}
                                    id="component-outlined"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center ">
                            <Button className="popup-button" aria-describedby={id} variant="contained" onClick={handleClick}>
                                Bind
                            </Button>
                        </div>
                        </Typography>
                </Popover>
    </>
}
