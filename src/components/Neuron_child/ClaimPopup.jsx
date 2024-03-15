import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import {useSelector} from "react-redux";
import {shortAddress} from "../../utils/global";
import { connect, signTransaction } from '@joyid/ckb';
import LoadingButton from '@mui/lab/LoadingButton';

import {  RPC} from "@ckb-lumos/rpc"
import {useAccount} from "wagmi";
import store from "../../store";
import {getClaimNum} from "../../store/reducer";

const CKB_RPC_URL = "https://mainnet.ckb.dev/rpc"

const rpc = new RPC(CKB_RPC_URL)


export default function ClaimPopup(props){
    const [toAddress, setToAddress] = React.useState('ckb1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq26z89hep8l4vsg5ttj7hcepnxxhy6yzns7ftt7q'); //ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqqxv6drphrp47xalweq9pvr6ll3mvkj225quegpcw
    const [loading, setLoading] = React.useState(false);
    const times = 340;
    const {showPopup,claimType,openPop,close} = props;
    const joyid_account = useSelector(store => store.joyid_account);
    const anchorEl = document.getElementsByClassName('middle-main')[0];
    const joyid_sign_msg = useSelector(store => store.joyid_sign_msg)
    const neuronAddress = useSelector(store => store.neuron_address);
    const { address: ethAccount } = useAccount();
    const sSign = useSelector(store => store.signature);
    const nSign = useSelector(store => store.neuron_signature);
    const eSign = useSelector(store => store.eth_signature);
    const sAccount = useSelector(store => store.account);
    const sPublicKey = useSelector(store => store.public_key);
    const sClaim = useSelector(store => store.seeu_claim_num);
    const nClaim = useSelector(store => store.ckb_claim_num);
    const signature = claimType === 'seeu' ? sSign : neuronAddress ? nSign : eSign;
    const account = claimType === 'seeu' ? sPublicKey : neuronAddress ? neuronAddress : ethAccount;
    const chain = claimType === 'seeu' ? 'bitcoin' : neuronAddress ? 'ckb' : 'ethereum';
    const ClaimNum = claimType === 'seeu' ? sClaim : nClaim;

    const amount = ClaimNum * times;

    const handleClose = () => {
        if (loading) {
            return;
        }
        close();
    };

    const handleCopy = () => {
        navigator.clipboard
            .writeText(joyid_account);
    }

    const handleClick = async () => {
        setLoading(true);
        const signedTx = await signTransaction({
            to: toAddress,
            from: joyid_account,
            amount: BigInt(Number(amount) * 10 ** 8).toString(),
        }).catch(e => {
            console.log(e)
        });
        // const txHash = await sendTransaction(signedTx);
        console.log('signedTx', signedTx);
        //to yao  rpc发起交易
        const hash = await rpc.sendTransaction(signedTx, "passthrough")
        console.log('hash',hash)
        //to yao  rpc验证交易

        const timeout = setInterval(
            ()=>{
                getFlag(hash).then((res)=>{
                    console.log('getFlag',res);
                    if (res) {
                        clearInterval(timeout);
                        Claim(hash).then(re => {
                        })
                    }
                })
            }
            ,2000);
    }

    const getFlag = async (hash)=>{
            return await rpc.getTransaction(hash).then((res)=> {
                console.log('result',res.txStatus.status,hash);
                if (res.txStatus.status === "committed") {
                    return true;
                } else {
                    return false;
                }

            })

    }

    const Claim = async(hash) => {
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com)");
        myHeaders.append("Content-Type", "application/json");
        const params = claimType === 'seeu' ? {
            "message": joyid_sign_msg,
            "pubkey": account,
            "signature": signature,
            "txid": hash
        } : {
            "message": joyid_sign_msg,
            "expectedAddress": account,
            "signature": signature,
            "txid": hash
        };
        var raw = JSON.stringify(params);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api-airdrop.seeuclub.xyz/nfts/claim/"+ chain, requestOptions)
            .then(response => response.text())
            .then(result => {
                const res = JSON.parse(result);
                console.log(res.code);
                if (res.code === 'ok' || res.code === 'OK') {
                    openPop();
                    handleClose();
                }
                setLoading(false);
            })
            .catch(error => console.log('claim error 123', error));
    }

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
                    // classes="claim-position"
                    // anchorPosition={{left: 500, top: 500}}
                    // anchorReference={'anchorPosition'}
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
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 2.4C8.63652 2.4 9.24697 2.65286 9.69706 3.10294C10.1471 3.55303 10.4 4.16348 10.4 4.8C10.4 5.43652 10.1471 6.04697 9.69706 6.49706C9.24697 6.94714 8.63652 7.2 8 7.2C7.36348 7.2 6.75303 6.94714 6.30294 6.49706C5.85286 6.04697 5.6 5.43652 5.6 4.8C5.6 4.16348 5.85286 3.55303 6.30294 3.10294C6.75303 2.65286 7.36348 2.4 8 2.4ZM12.496 11.328C11.975 12.0296 11.297 12.5996 10.5164 12.9922C9.73565 13.3849 8.87389 13.5894 8 13.5894C7.12611 13.5894 6.26434 13.3849 5.48365 12.9922C4.70295 12.5996 4.02499 12.0296 3.504 11.328C3.42508 11.2114 3.37835 11.076 3.36852 10.9355C3.35868 10.7951 3.3861 10.6545 3.448 10.528L3.616 10.176C3.80996 9.76487 4.11669 9.41727 4.5005 9.17367C4.88431 8.93007 5.32941 8.80049 5.784 8.8H10.216C10.6644 8.8006 11.1038 8.92683 11.4841 9.16438C11.8645 9.40193 12.1707 9.74129 12.368 10.144L12.552 10.52C12.6154 10.6475 12.6437 10.7896 12.6338 10.9316C12.624 11.0736 12.5764 11.2105 12.496 11.328Z" fill="#909FB1" fillOpacity="0.92"/>
                                </svg>
                            </span>
                                <span className="popup-title">
                                                            {shortAddress(joyid_account)}
                            </span>
                                <div onClick={handleCopy} className=" ml-2 cursor-pointer">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_222_67)">
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
                            <div onClick={handleClose} className="cursor-pointer">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13M13 1L1 13" stroke="#727778" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className="claim-popup-desc">
                            You can claim <span className="claim-popup-active">{ClaimNum}</span> DOBs.  Pay <span className="claim-popup-active">{amount}</span> $CKB which will be encapsulated in Unicorn, redeemable anytime.
                        </div>
                        <div className="flex justify-center ">
                            {/*<Button >*/}
                            {/*    */}
                            {/*</Button>*/}


                            <LoadingButton
                                loading={loading}
                                className={loading ? "claim-popup-button-loading" : "claim-popup-button"}
                                aria-describedby={id}
                                onClick={handleClick}
                                variant="outlined"
                            >
                                {loading ? 'loading' : 'Pay and Claim'}
                            </LoadingButton>
                            {/*<LoadingButton loading loadingIndicator="Loading…" variant="outlined">*/}
                            {/*    Fetch data*/}
                            {/*</LoadingButton>*/}


                        </div>
                        </Typography>
                </Popover>
    </>
}
