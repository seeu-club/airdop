import OkxImg from "../../assets/okx.png";
import styled from "styled-components";
import {useSelector} from "react-redux";
import UnisatImg from "../../assets/unisat.png";
import {shortAddress} from "../../utils/global";
import JoyidImg from "../../assets/joyid.png";
import DisconnectImg from "../../assets/disconnect.png";
import store from "../../store";
import {saveAccount, saveJoyid, saveShowSign, saveType} from "../../store/reducer";
import React from "react";

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
    .copy-icon {
        position: absolute;
        right: 30px;
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

export default function JoyidAddress(){
    const joyid_account = useSelector(store => store.joyid_account);
    const Disconnect = () =>{
        store.dispatch(saveAccount(null));
        store.dispatch(saveType(null));
        store.dispatch(saveJoyid(null));
        store.dispatch(saveShowSign(null));
    }
    const handleCopy = () => {
        navigator.clipboard
            .writeText(joyid_account);
    }

    return <AfterBox>
        <div>
            <img src={JoyidImg} alt="" className="logo"/>
        </div>
        <TitBox>JoyID</TitBox>
        <AddressBox>
            <span>{shortAddress(joyid_account)}</span>
            <div onClick={handleCopy} className=" copy-icon">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.33519 2.66667C8.60046 2.66667 8.85487 2.77202 9.04245 2.95956C9.23003 3.1471 9.33541 3.40145 9.33541 3.66667V13C9.33541 13.2652 9.23003 13.5196 9.04245 13.7071C8.85487 13.8946 8.60046 14 8.33519 14H1.00022C0.868871 14 0.738806 13.9741 0.617454 13.9239C0.496101 13.8736 0.385837 13.8 0.292958 13.7071C0.200079 13.6142 0.126403 13.504 0.0761373 13.3827C0.0258714 13.2614 0 13.1313 0 13V3.66667C0 3.40145 0.10538 3.1471 0.292958 2.95956C0.480536 2.77202 0.734947 2.66667 1.00022 2.66667H8.33519ZM8.00178 4H1.33363V12.6667H8.00178V4ZM10.9998 1.91578e-07C11.2485 -0.000153668 11.4884 0.0923732 11.6726 0.259522C11.8568 0.426671 11.9721 0.656445 11.996 0.904L12 1V9.99533C11.9998 10.1653 11.9347 10.3287 11.8181 10.4522C11.7014 10.5758 11.5419 10.6502 11.3723 10.6601C11.2026 10.6701 11.0355 10.6149 10.9052 10.5058C10.7749 10.3968 10.6911 10.2421 10.671 10.0733L10.6664 9.99533V1.33333H4.00089C3.83756 1.33331 3.67993 1.27336 3.55788 1.16486C3.43583 1.05635 3.35785 0.906834 3.33874 0.744667L3.33407 0.666667C3.3341 0.503378 3.39406 0.345775 3.50259 0.223752C3.61112 0.101729 3.76067 0.0237717 3.92287 0.00466688L4.00089 1.91578e-07H10.9998Z" fill="#07CEFA"/>
                </svg>

            </div>
            <img src={DisconnectImg} alt="" className="disconnect" onClick={()=>Disconnect()}/>
        </AddressBox>
    </AfterBox>
}
