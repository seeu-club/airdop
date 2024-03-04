import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import Modal from "./modal";
import SignModal from "./signModal";



const Box = styled.div`
    border: 2px solid #E0E2EC;
    padding: 16px 24px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 16px;
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
const Btn = styled.div`
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
`

export default function Unisat_okx (){

    const [show,setShow] = useState(false)






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
        <ImgBox>
            <img src="okx.png" alt="" className="lft"/>
            <img src="unisat.png" alt="" className="rht" />
        </ImgBox>
        <TitBox>Connect</TitBox>
        <Btn  onClick={() => handleShow()}>Connect Btc Wallet</Btn>

    </Box>
}
