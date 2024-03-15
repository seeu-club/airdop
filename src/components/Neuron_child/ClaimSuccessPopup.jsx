import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import LoadingButton from '@mui/lab/LoadingButton';
import store from "../../store";
import {getClaimNum} from "../../store/reducer";
import {useSelector} from "react-redux";
import {useAccount} from "wagmi";

export default function ClaimSuccessPopup(props){

    const {showPopup,claimType,close} = props;
    const sAccount = useSelector(store => store.account);
    const neuronAddress = useSelector(store => store.neuron_address);
    const { address: ethAccount } = useAccount();
    const anchorEl = document.getElementsByClassName('middle-main')[0];
    const getClaimType = claimType === 'seeu' ? 'bitcoin' : neuronAddress ? 'ckb' : 'ethereum';
    const getClaimAccount = claimType === 'seeu' ? sAccount : neuronAddress ? neuronAddress : ethAccount;

    const handleClose = () => {
        store.dispatch(getClaimNum({
            type: getClaimType,
            address: getClaimAccount,
        }));
        close();
    };



    const open = Boolean(showPopup);
    const id = open ? 'simple-popover' : undefined;

    return <>
        <div className="middle-main">

        </div>
                <Popover
                    id={id}
                    open={showPopup}
                    anchorEl={anchorEl}
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
                        <div className="flex min-w-150 items-center justify-between">
                            <div className="flex min-w-150 items-center">
                                <span>

                            </span>
                                <span className="popup-title">
                            </span>
                                <div  className=" ml-2 cursor-pointer">

                                </div>
                            </div>
                            <div onClick={handleClose} className="cursor-pointer">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13M13 1L1 13" stroke="#727778" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className="claim-popup-desc">
                            Congratulations on claiming your DOBs! You can view your newly acquired DOBs by visiting <a
                            href="https://app.joy.id/" alt={'https://app.joy.id/'}
                            style={{color:"#1c85f1",cursor:'pointer'}}

                        >https://app.joy.id/</a>.
                        </div>
                        <div className="flex justify-center ">
                            <LoadingButton
                                loading={false}
                                onClick={handleClose}
                                className={"claim-popup-button"}
                                aria-describedby={id}
                                variant="outlined"
                            >
                                OK
                            </LoadingButton>
                        </div>
                        </Typography>
                </Popover>
    </>
}
