import React, {useState,useEffect} from "react";
import {useSelector} from "react-redux";
import {connect, PopupConifg} from "@joyid/ckb";
import store from "../store";
import {
    getClaimNum, saveEthSignature,
    saveJoyid,
    saveJoyidSignMsg,
    saveNeuronAddress,
    saveNeuronClaimNum,
    saveNeuronSignature,
    savePopup
} from "../store/reducer";
import JoyidAddress from "./unisat_okx/JoyidAddress";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Popup from "./Neuron_child/Popup";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useAccount,useWalletClient} from "wagmi";
import {shortAddress} from "../utils/global";
import { addressToScript } from "@nervosnetwork/ckb-sdk-utils";
import ClaimPopup from "./Neuron_child/ClaimPopup";
import ClaimSuccessPopup from "./Neuron_child/ClaimSuccessPopup";


const Btn = styled.button`
    display: flex;
    height: 40px;
    width: 160px;
    padding: 0px 16px;
    justify-content: center;
    gap: 8px;
    align-items: center;
    border: 1px solid #131313;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
   &:disabled{
        opacity: 0.6;
       cursor: not-allowed;
   }
`

const Tips = styled.div`
    color: #727778;
    font-size: 12px;
    margin-top: 10px;
`

export default function Neuron(){

    const [showPopup, setShowPopup] = useState(false);
    const [showClaimPopup, setShowClaimPopup] = useState(false);
    const handleClick = () => {
        // store.dispatch(savePopup(true));
        setShowPopup(true);
    };
    const handleClose = () => {
        // store.dispatch(savePopup(true));
        setShowPopup(false);
    };
    const handleCloseClaim = () => {
        // store.dispatch(savePopup(true));
        setShowClaimPopup(false);
    };
    const joyid_account = useSelector(store => store.joyid_account);
    const neuronAddress = useSelector(store => store.neuron_address);
    const neuronClaimNum = useSelector(store => store.ckb_claim_num);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const { address: account } = useAccount();
    const onConnect = async() =>{
        try {
            const authData = await connect();
            store.dispatch(saveJoyid(authData.address));
            store.dispatch(saveJoyidSignMsg(JSON.stringify(addressToScript(authData.address))));
        } catch (error) {
            console.error(error);
        }
    }

    const handleCloseSuccess = () => {
        // store.dispatch(savePopup(true));
        setShowSuccessPopup(false);
    };
    const handleOpenSuccess = () => {
        // store.dispatch(savePopup(true));
        setShowSuccessPopup(true);
    };

    const DisconnectNeuron = () => {
        store.dispatch(saveNeuronAddress(''));
        store.dispatch(saveNeuronSignature(''));
        store.dispatch(saveNeuronClaimNum(0));
    }

    useEffect(() => {
        store.dispatch(getClaimNum({
            type: 'ethereum',
            address: account,
        }));
        }, [account]);
    useEffect(() => {
        if (!showPopup && neuronAddress) {
            store.dispatch(getClaimNum({
                type: 'ckb',
                address: neuronAddress,
            }));
        }
    }, [showPopup]);


    function getSign() {
        if (neuronClaimNum <= 0) {
            return;
        }
        if (neuronAddress) {
            setShowClaimPopup(true);
            return;
        }
        if (!account) {
            return;
        }
        const signMsg = Sign(account,JSON.stringify(addressToScript(joyid_account))).then(res => {
            console.log('info',res);
            store.dispatch(saveEthSignature(res));
            setShowClaimPopup(true);
        }).catch(err=>{
            console.log('error',err);
        })
    }
    const { data: walletClient } = useWalletClient();

    async function Sign(address,signMessage) {
        return await walletClient.signMessage({
            account: address,
            message: signMessage,
        });
    }

    return <>
        <div id="tab-content-ckb"  className="flex  flex-col  justify-center items-center content-center m-7 mt-10 ">
            <Popup showPopup={showPopup} close={handleClose} />
            <ClaimPopup showPopup={showClaimPopup} claimType={'neuron'} openPop={handleOpenSuccess} close={handleCloseClaim} />
            <ClaimSuccessPopup showPopup={showSuccessPopup} claimType={'neuron'} close={handleCloseSuccess} />
            <div className="flex card-main">
                <div className="flex  flex-col  items-center">
                    <div className={joyid_account ? "card-border-top card-border-1" : "card-border-bottom card-border-1"}>

                    </div>
                    {joyid_account ? (<div>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="24" height="24" rx="12" fill="#07CEFA"/>
                            <path d="M18.7068 9.26591L11.0405 17.1968C10.8594 17.384 10.6093 17.5 10.333 17.5C10.0568 17.5 9.80667 17.384 9.6255 17.1968L5.293 12.7138C5.11201 12.5275 5 12.2687 5 11.9829C5 11.4114 5.44791 10.9488 5.99953 10.9488C6.27577 10.9488 6.526 11.0647 6.7071 11.2519L10.333 15.0022L17.2929 7.80221C17.474 7.61589 17.7241 7.5 18.0003 7.5C18.5518 7.5 19 7.9634 19 8.534C19 8.81982 18.8879 9.07866 18.7068 9.26591Z" fill="white"/>
                        </svg>

                    </div>)
                    : (<div className="card-border-round">

                        </div>)}

                    <div className={account || neuronAddress ? "card-border-top card-border-2" : "card-border-bottom card-border-2"}>

                    </div>
                    {account || neuronAddress ? (<div>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="0.5" width="24" height="24" rx="12" fill="#07CEFA"/>
                                <path d="M18.7068 9.26591L11.0405 17.1968C10.8594 17.384 10.6093 17.5 10.333 17.5C10.0568 17.5 9.80667 17.384 9.6255 17.1968L5.293 12.7138C5.11201 12.5275 5 12.2687 5 11.9829C5 11.4114 5.44791 10.9488 5.99953 10.9488C6.27577 10.9488 6.526 11.0647 6.7071 11.2519L10.333 15.0022L17.2929 7.80221C17.474 7.61589 17.7241 7.5 18.0003 7.5C18.5518 7.5 19 7.9634 19 8.534C19 8.81982 18.8879 9.07866 18.7068 9.26591Z" fill="white"/>
                            </svg>

                        </div>)
                        : (<div className="card-border-round">

                        </div>)}
                    <div className={account || neuronAddress ? "card-border-top card-border-3" :  "card-border-bottom card-border-3"}>

                    </div>
                    <div className="card-border-round">

                    </div>
                </div>

                <div>
                    <div className={joyid_account ? 'card-card card-joyid flex flex-col items-center w-96 rounded-2xl' : 'card-card flex flex-col items-center w-96 rounded-2xl'} >
                        {
                            !joyid_account &&
                            (<>
                                    <div >
                                        <img className="neuron-icon" src="joid.png" alt=""/>
                                    </div>
                                    <div className="neuron-title">
                                        JoyId
                                    </div>
                                    <Button onClickCapture={() => onConnect()} className="joyid-button" variant="contained">
                                        Connect JoyID
                                    </Button></>
                                )
                        }
                        {
                            !!joyid_account  &&  <JoyidAddress />
                        }

                    </div>
                    <div className="card-card flex flex-col items-center w-96 rounded-2xl" >
                        {(account || neuronAddress) && (
                            <>

                                {neuronAddress && (<>
                                    <div >
                                        <img className="neuron-icon" src="neuron.png" alt=""/>
                                    </div>
                                    <div className="neuron-title">
                                        Neuron
                                    </div>
                                    <div className="flex neuron-address neuron-input">
                                        <div className="neuron-input-left"></div>
                                        <span className="">{shortAddress(neuronAddress)}</span>
                                        <div className="neuron-input-svg" onClick={DisconnectNeuron}>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.1047 6.21923C13.015 5.23282 13.2498 4.07802 12.7223 2.83649C12.203 1.61453 11.1995 1.06502 10.0863 1C9.22963 1.00416 8.58413 1.15698 8.08864 1.6022C7.27449 2.3335 6.50056 3.11132 5.74219 3.90147C5.38947 4.26919 5.647 4.88681 6.1571 4.91778C6.34747 4.93011 6.59052 4.81133 6.73745 4.67406C7.43054 4.02534 8.08542 3.33533 8.78173 2.68768C9.21408 2.28483 9.76037 2.18053 10.3293 2.33135C11.697 2.69492 12.1367 4.30633 11.1467 5.31956C10.4898 5.992 9.81628 6.64984 9.15214 7.31611C8.84286 7.627 8.81485 7.99888 9.07251 8.26942C9.32696 8.537 9.79764 8.52762 10.0915 8.23738C10.7681 7.57029 11.4603 6.91648 12.1047 6.21923ZM8.35448 9.47086C8.25099 8.95648 7.6571 8.82 7.26618 9.20221C6.61532 9.83953 5.98014 10.4944 5.3274 11.1307C4.60938 11.8299 3.47348 11.8268 2.78656 11.1359C2.06867 10.4138 2.10165 9.33868 2.88067 8.54223C3.51075 7.8966 4.15733 7.26651 4.79358 6.62825C5.1247 6.29565 5.15152 5.94025 4.87213 5.65833C4.60321 5.38779 4.21323 5.41152 3.89551 5.72656C3.22722 6.38869 2.55785 7.04974 1.89895 7.72111C1.30211 8.3284 1.00517 9.06493 0.999939 9.91715C1.00302 11.1288 1.68794 12.2226 2.80211 12.708C3.95463 13.2101 5.06049 13.0727 6.00401 12.2442C6.77472 11.5677 7.48135 10.8156 8.18892 10.0698C8.31721 9.93471 8.39175 9.65573 8.35448 9.47086ZM4.99989 3.00004C5.36816 3.00004 5.66658 2.70149 5.66658 2.33336V1.66668C5.66658 1.29842 5.36802 1 4.99989 1C4.63176 1 4.33335 1.29842 4.33335 1.66668V2.33336C4.33335 2.70149 4.63176 3.00004 4.99989 3.00004ZM8.99998 11C8.63172 11 8.3333 11.2984 8.3333 11.6666V12.3333C8.3333 12.7016 8.63172 13 8.99998 13C9.36825 13 9.66653 12.7016 9.66653 12.3333V11.6666C9.66653 11.2985 9.36825 11 8.99998 11ZM12.3333 8.33336H11.6666C11.2983 8.33336 11 8.63178 11 9.00004C11 9.36831 11.2984 9.66673 11.6666 9.66673H12.3333C12.7014 9.66673 12.9999 9.36831 12.9999 9.00004C12.9999 8.63178 12.7014 8.33336 12.3333 8.33336ZM1.66675 5.66664H2.33344C2.7017 5.66664 2.99998 5.36822 2.99998 4.99996C2.99998 4.63169 2.70157 4.33327 2.33344 4.33327H1.66675C1.29849 4.33327 1.00007 4.63169 1.00007 4.99996C1.00007 5.36822 1.29849 5.66664 1.66675 5.66664ZM11.569 10.3908C11.3086 10.1304 10.8865 10.1304 10.6261 10.3908C10.3658 10.6511 10.3658 11.0732 10.6261 11.3336L11.0975 11.805C11.3578 12.0653 11.78 12.0653 12.0403 11.805C12.3007 11.5446 12.3007 11.1225 12.0403 10.8621L11.569 10.3908ZM2.40355 3.44901C2.69419 3.73966 3.16528 3.73966 3.45606 3.44901C3.7467 3.15837 3.7467 2.68715 3.45606 2.39651L2.92974 1.87032C2.63909 1.57968 2.16801 1.57968 1.87723 1.87032C1.58659 2.16096 1.58659 2.63205 1.87723 2.92283L2.40355 3.44901Z" fill="#727778"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="neuron-claim-text">
                                        You can claim
                                        <span className="font-bold neuron-claim-nft-num">
                                            {neuronClaimNum}
                                        </span>
                                        NFTs.
                                    </div>
                                </>)}
                                {account && (<>
                                    <div >
                                        <img className="neuron-icon" src="eth.png" alt=""/>
                                    </div>
                                    <div className="neuron-title">
                                        Ethereum
                                    </div>
                                    <div className="flex neuron-address neuron-input">
                                        <div className="neuron-input-left"></div>
                                        <span className="">{shortAddress(account)}</span>

                                        <ConnectButton.Custom >
                                            {({
                                                  openAccountModal,
                                                  authenticationStatus,
                                                  mounted,
                                              }) => {
                                                const ready = mounted && authenticationStatus !== 'loading';

                                                return (
                                                    <div
                                                        {...(!ready && {
                                                            'aria-hidden': true,
                                                            'style': {
                                                                opacity: 0,
                                                                pointerEvents: 'none',
                                                                userSelect: 'none',
                                                            },
                                                        })}
                                                    >
                                                        {(() => {
                                                            return (
                                                                <div onClick={openAccountModal} className="neuron-input-svg">
                                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M12.1047 6.21923C13.015 5.23282 13.2498 4.07802 12.7223 2.83649C12.203 1.61453 11.1995 1.06502 10.0863 1C9.22963 1.00416 8.58413 1.15698 8.08864 1.6022C7.27449 2.3335 6.50056 3.11132 5.74219 3.90147C5.38947 4.26919 5.647 4.88681 6.1571 4.91778C6.34747 4.93011 6.59052 4.81133 6.73745 4.67406C7.43054 4.02534 8.08542 3.33533 8.78173 2.68768C9.21408 2.28483 9.76037 2.18053 10.3293 2.33135C11.697 2.69492 12.1367 4.30633 11.1467 5.31956C10.4898 5.992 9.81628 6.64984 9.15214 7.31611C8.84286 7.627 8.81485 7.99888 9.07251 8.26942C9.32696 8.537 9.79764 8.52762 10.0915 8.23738C10.7681 7.57029 11.4603 6.91648 12.1047 6.21923ZM8.35448 9.47086C8.25099 8.95648 7.6571 8.82 7.26618 9.20221C6.61532 9.83953 5.98014 10.4944 5.3274 11.1307C4.60938 11.8299 3.47348 11.8268 2.78656 11.1359C2.06867 10.4138 2.10165 9.33868 2.88067 8.54223C3.51075 7.8966 4.15733 7.26651 4.79358 6.62825C5.1247 6.29565 5.15152 5.94025 4.87213 5.65833C4.60321 5.38779 4.21323 5.41152 3.89551 5.72656C3.22722 6.38869 2.55785 7.04974 1.89895 7.72111C1.30211 8.3284 1.00517 9.06493 0.999939 9.91715C1.00302 11.1288 1.68794 12.2226 2.80211 12.708C3.95463 13.2101 5.06049 13.0727 6.00401 12.2442C6.77472 11.5677 7.48135 10.8156 8.18892 10.0698C8.31721 9.93471 8.39175 9.65573 8.35448 9.47086ZM4.99989 3.00004C5.36816 3.00004 5.66658 2.70149 5.66658 2.33336V1.66668C5.66658 1.29842 5.36802 1 4.99989 1C4.63176 1 4.33335 1.29842 4.33335 1.66668V2.33336C4.33335 2.70149 4.63176 3.00004 4.99989 3.00004ZM8.99998 11C8.63172 11 8.3333 11.2984 8.3333 11.6666V12.3333C8.3333 12.7016 8.63172 13 8.99998 13C9.36825 13 9.66653 12.7016 9.66653 12.3333V11.6666C9.66653 11.2985 9.36825 11 8.99998 11ZM12.3333 8.33336H11.6666C11.2983 8.33336 11 8.63178 11 9.00004C11 9.36831 11.2984 9.66673 11.6666 9.66673H12.3333C12.7014 9.66673 12.9999 9.36831 12.9999 9.00004C12.9999 8.63178 12.7014 8.33336 12.3333 8.33336ZM1.66675 5.66664H2.33344C2.7017 5.66664 2.99998 5.36822 2.99998 4.99996C2.99998 4.63169 2.70157 4.33327 2.33344 4.33327H1.66675C1.29849 4.33327 1.00007 4.63169 1.00007 4.99996C1.00007 5.36822 1.29849 5.66664 1.66675 5.66664ZM11.569 10.3908C11.3086 10.1304 10.8865 10.1304 10.6261 10.3908C10.3658 10.6511 10.3658 11.0732 10.6261 11.3336L11.0975 11.805C11.3578 12.0653 11.78 12.0653 12.0403 11.805C12.3007 11.5446 12.3007 11.1225 12.0403 10.8621L11.569 10.3908ZM2.40355 3.44901C2.69419 3.73966 3.16528 3.73966 3.45606 3.44901C3.7467 3.15837 3.7467 2.68715 3.45606 2.39651L2.92974 1.87032C2.63909 1.57968 2.16801 1.57968 1.87723 1.87032C1.58659 2.16096 1.58659 2.63205 1.87723 2.92283L2.40355 3.44901Z" fill="#727778"/>
                                                                    </svg>
                                                                </div>
                                                            )
                                                        })()}
                                                    </div>
                                                );
                                            }}
                                        </ConnectButton.Custom>


                                    </div>
                                    <div className="neuron-claim-text">
                                        You can claim
                                        <span className="font-bold neuron-claim-nft-num">
                                            {neuronClaimNum}
                                    </span>
                                        NFTs.
                                    </div>
                                </>)}

                            </>
                            )}
                        {!account && !neuronAddress && (<>

                            <div >
                                <img className="neuron-icon" src="connect.png" alt=""/>
                            </div>
                            <div className="neuron-title">
                                Connect
                            </div>
                            <div className="flex connect-main">
                                <Btn onClick={handleClick} className="connect-neuron-button"  disabled={!joyid_account}>
                                    <img src="neuron.png" alt=""/>
                                    <div>Neuron</div>
                                </Btn>


                                <ConnectButton.Custom >
                                    {({
                                          account,
                                          chain,
                                          openConnectModal,
                                          authenticationStatus,
                                          mounted,
                                      }) => {
                                        // Note: If your app doesn't use authentication, you
                                        // can remove all 'authenticationStatus' checks
                                        const ready = mounted && authenticationStatus !== 'loading';
                                        const connected =
                                            ready &&
                                            account &&
                                            chain &&
                                            (!authenticationStatus ||
                                                authenticationStatus === 'authenticated');

                                        return (
                                            <div
                                                {...(!ready && {
                                                    'aria-hidden': true,
                                                    'style': {
                                                        opacity: 0,
                                                        pointerEvents: 'none',
                                                        userSelect: 'none',
                                                    },
                                                })}
                                            >
                                                {(() => {
                                                    if (!connected) {
                                                        return (
                                                            <Btn className="connect-neuron-button" onClick={openConnectModal} disabled={!joyid_account}>
                                                                <img src="eth.png" alt=""/>
                                                                <div>Ethereum</div>
                                                            </Btn>
                                                        );
                                                    }
                                                })()}
                                            </div>
                                        );
                                    }}
                                </ConnectButton.Custom>
                            </div>
                        </>)}
                    </div>
                    <div>
                        <Button onClick={getSign} disabled={!joyid_account || (!account && !neuronAddress) || neuronClaimNum <=0 } className={joyid_account && (account || neuronAddress) && neuronClaimNum > 0  ? "Claim-button claim-active-button" : "Claim-button"} variant="contained">
                            Claim
                        </Button>
                    </div>
                </div>
            </div>
            <Tips>
                NFT that are not claimed will be burned.
            </Tips>
        </div>

    </>
}
