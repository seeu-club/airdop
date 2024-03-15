import OkxImg from "../../assets/okx.png";
import styled from "styled-components";
import {useSelector} from "react-redux";
import UnisatImg from "../../assets/unisat.png";
import {shortAddress} from "../../utils/global";
import JoyidImg from "../../assets/joyid.png";
import DisconnectImg from "../../assets/disconnect.png";
import store from "../../store";
import {getClaimNum, saveAccount, saveJoyid, saveShowSign, saveType} from "../../store/reducer";
import React, {useEffect} from "react";

const AfterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo{
        width: 48px;
        height: 48px;
        border-radius: 48px;
    }
`
const AddressBox = styled.div`
    border-radius: 8px;
    border: 1px solid #E0E2EC;
    width: 212px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    position: relative;
    span{
        flex-grow: 1;
        display: inline-block;
        text-align: center;
    }
    .disconnect{
        position: absolute;
        right: 10px;
        cursor: pointer;
    }
`

const TitBox = styled.div`
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-top: 5px;
`

export default function AfterAddress(){
    const account = useSelector(store => store.account);
    const claimNum = useSelector(store => store.seeu_claim_num);
    const type = useSelector(store => store.type);

    const returnImg = () =>{
        if(type === "Unisat"){
            return UnisatImg;
        }else{
            return OkxImg;
        }
    }

    const Disconnect = () =>{
        store.dispatch(saveAccount(null));
        store.dispatch(saveType(null));
        store.dispatch(saveJoyid(null));
        store.dispatch(saveShowSign(null));
    }

    useEffect(() => {
        store.dispatch(getClaimNum({
            type: 'bitcoin',
            address: account,
        }));
    }, [account]);

    return <AfterBox>
        <div>
            <img src={returnImg()} alt="" className="logo"/>
        </div>
        <TitBox>{type}</TitBox>
        <AddressBox>
            <span>{shortAddress(account)}</span>
            <img src={DisconnectImg} alt="" className="disconnect" onClick={()=>Disconnect()}/>

        </AddressBox>
        <div className="neuron-claim-text">
            You can claim
            <span className="font-bold neuron-claim-nft-num">
                {claimNum}
                                        </span>
            DOBs.
        </div>
    </AfterBox>
}
