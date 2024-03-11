import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import Modal from "./modal";
import SignModal from "./signModal";
import {useSelector} from "react-redux";

import UnisatImg from "../../assets/unisat.png";
import OkxImg from "../../assets/okx.png";
import AfterAddress from "./afterAddress";


const Box = styled.div`
    border: 2px solid #E0E2EC;
    padding: 16px 24px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 16px;

    height: 191px;
    display: flex;
    margin: 16px 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
const ImgBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .lft{
        width: 48px;
        height: 48px;
        border:2px solid #fff;
    }
    .rht{
        position: relative;
        z-index: 2;
        margin-left: -12px;
        width: 48px;
        height: 48px;
    }
`

const TitBox = styled.div`
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-top: 5px;
`
const Btn = styled.button`
    background: #000;
    color: #FFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    border-radius: 8px;
    margin: 12px auto 0;
    display: flex;
    width: 212px;
    height: 40px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:disabled{
        opacity: 0.6;
        cursor: not-allowed;
    }
`

export default function Unisat_okx (){

    const account = useSelector(store => store.account);
    const type = useSelector(store => store.type);
    const joyid_account = useSelector(store => store.joyid_account);

    const [show,setShow] = useState(false);


    const handleShow = () =>{
        setShow(true)
    }
    const handleClose= () =>{
        setShow(false)
    }

    return <Box>
        {
            show &&  <Modal handleClose={handleClose} />
        }

        {/*<SignModal />*/}
        {
            !account &&
            <>
                <ImgBox>
                    <img src={OkxImg} alt="" className="lft"/>
                    <img src={UnisatImg} alt="" className="rht"/>
                </ImgBox>
                <TitBox>Connect</TitBox>
                <Btn onClick={() => handleShow()} disabled={!joyid_account}>Connect BTC Wallet</Btn>
            </>
        }
        {
            !!account &&  <AfterAddress />
        }

    </Box>
}
