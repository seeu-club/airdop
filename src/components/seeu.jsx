import Unisat_okx from "./unisat_okx/unisat_okx";
import Joyid from "./joyid/joyid";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SelectedImg from "../assets/selected.png";
import {useSelector} from "react-redux";
import SignModal from "./unisat_okx/signModal";
import store from "../store";
import {saveJoyid, saveShowSign} from "../store/reducer";
import ClaimPopup from "./Neuron_child/ClaimPopup";

const Box = styled.div`
    margin-top: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

`
const Tips = styled.div`
    color: #727778;
    font-size: 12px;
    margin-top: 10px;
`

const UlBox = styled.div`
    flex-grow: 1;
`
const ButtonBox = styled.button`
    width: 100%;
    height: 48px;

    border-radius: 16px;
    background:linear-gradient(180deg, #07CEFA 0%, #0794FA 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #FFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    &:disabled{
        background: #ccc;
    }
`

const LftBox = styled.div`
    flex-shrink: 0;
    width: 53px;
    display: flex;
    flex-direction: column;
    .li{
        margin-left: 16px;
        border-left:2px dashed #E0E2EC;
        padding-left: 37px;
        min-height: 16px;
        position: relative;
    }
    .selected{
        width: 24px;
        height: 24px;
        border-radius: 26px;
        position: absolute;
        background: #fff;
        z-index: 9;
        left: -13px;
        border:1px solid #E0E2EC;
        img{
            width: 24px;
            height: 24px;
            margin-top: -1px;
            display: none;
        }
    }
    .first{
        height: 290px;
        .selected{
            top:80px;
        }
    }
    .second{
        height: 140px;
        .selected{
            top:0;
        }
    }
    .last{
        height: 40px;
        .selected{
            top:-5px;
        }
    }
    .active{
        border-color: #07CEFA;
        .selected{
            border-color: #07CEFA;
            img{
                display: block;
            }
        }
    }
`

export default function Seeu(){
    const account = useSelector(store => store.account);
    const joyid_sign_msg = useSelector(store => store.joyid_sign_msg)
    const type = useSelector(store => store.type);
    const joyid_account = useSelector(store => store.joyid_account);
    const signature = useSelector(store => store.signature);
    const showSign = useSelector(store => store.showSign);
    const [showClaimPopup, setShowClaimPopup] = useState(false);
    const handleCloseClaim = () => {
        // store.dispatch(savePopup(true));
        setShowClaimPopup(false);
    };

    useEffect(() => {
        console.log("====",!account,showSign === false)
        if(!account || showSign === false)return;
        console.error("=======")
        store.dispatch(saveShowSign(true));


    }, [account,signature]);

    function Claim() {
        // var myHeaders = new Headers();
        // myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com)");
        // myHeaders.append("Content-Type", "application/json");
        //
        // var raw = JSON.stringify({
        //     "message": JSON.parse(joyid_sign_msg),
        //     "pubkey": account,
        //     "signature": signature
        // });
        //
        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
        //
        // fetch("https://seeu-nft-rest-beta.matrixlabs.org/nfts/claim/bitcoin", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(123,result))
        //     .catch(error => console.log('error123', error));

        setShowClaimPopup(true);


    }

    return <>
        {
            showSign && <SignModal />
        }
        <ClaimPopup showPopup={showClaimPopup} close={handleCloseClaim} />
        <Box>
        <LftBox>
            <div className={!!joyid_account ? "li first active" : "li first"}>
                <div className="selected">
                    <img src={SelectedImg} alt=""/>
                </div>
            </div>
            <div className={!!account && (type === "Unisat" || type === "OKX") ? "li second active" : "li second"}>
                <div className="selected">
                    <img src={SelectedImg} alt=""/>
                </div>
            </div>
            <div className="li last">
                <div className="selected">
                    <img src={SelectedImg} alt=""/>
                </div>
            </div>
        </LftBox>
        <UlBox>
            <Joyid/>
            <Unisat_okx/>
            <ButtonBox onClick={Claim} disabled={!account || !joyid_account}>Claim</ButtonBox>

        </UlBox>

    </Box>
        <Tips>
            Some simple introductions and descriptions of the text station space Balabala
        </Tips>
    </>
}
