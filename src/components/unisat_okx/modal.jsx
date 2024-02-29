import styled from "styled-components";
import UnisatImg from "../../assets/unisat.png";
import OkxImg from "../../assets/okx.png";
import CloseImg from "../../assets/close.png";
import UnisatBox from "./unisat";
import  OkxBox from "./Okx";

const Mask = styled.div`
    background: rgba(0,0,0,0.5);
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalBg = styled.div`
    background: #fff;
    padding: 24px;
    border-radius: 16px;
    position: relative;
`

const TitleBox = styled.div`
    color: #131313;
    font-size: 24px;
    font-style: normal;
    line-height: 28px;
    font-family: NationalPark;
    font-weight: bold;
    text-align: center;
`
const UlBox = styled.ul`
    margin-top: 24px;
    li{
        display: flex;
        height: 48px;
        width: 320px;
        padding: 0px 16px;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #E0E2EC;
        border-radius: 16px;
        cursor: pointer;
        margin-bottom: 12px;
        &:last-child{
            margin-bottom: 0;
        }
        &.op{
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
    img{
        width: 24px;
        height: 24px;
        border-radius: 24px;
    }
    .rht{
        flex-grow: 1;
        text-align: center;
        font-weight: bold;
    }

`

const CloseBox = styled.div`
    position: absolute;
    right: 20px;
    top:20px;
    cursor: pointer;
`

export default function Modal({handleClose}){
    return <Mask>
        <ModalBg>
            <CloseBox onClick={()=>handleClose()}>
                <img src={CloseImg} alt=""/>
            </CloseBox>
            <TitleBox>Choose Wallet</TitleBox>
            <UlBox>
                <OkxBox />
                <UnisatBox />

            </UlBox>
        </ModalBg>
    </Mask>
}
