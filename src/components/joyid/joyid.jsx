import styled from "styled-components";
import JoyidImg from "../../assets/joyid.png";
import { connect } from '@joyid/ckb';
import store from "../../store";
import {saveAccount, saveJoyid, saveJoyidSignature, saveType} from "../../store/reducer";
import {useSelector} from "react-redux";
import JoyidAddress from "../unisat_okx/JoyidAddress";
import { addressToScript } from "@nervosnetwork/ckb-sdk-utils";

const Box = styled.div`
    border: 2px solid #E0E2EC;
    padding: 16px 24px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 16px;

    height: 191px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ImgBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 48px;
        height: 48px;
        border:2px solid #fff;
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
    background: #D2FF00;
    color: #131313;
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

export default function Joyid (){
    const joyid_account = useSelector(store => store.joyid_account);

    const onConnect = async() =>{
        try {
            const authData = await connect();
            store.dispatch(saveJoyid(authData.address));
            store.dispatch(saveJoyidSignature(addressToScript(authData.address)));

        } catch (error) {
            console.error(error);
        }
    }

    return <Box>

        {/*<SignModal />*/}
        {
            !joyid_account &&
        <>
            <ImgBox>
                <img src={JoyidImg} alt="" />
            </ImgBox>
            <TitBox>JoyID</TitBox>
            <Btn onClick={() => onConnect()}>Connect JoyID</Btn>
        </>
        }
        {
            !!joyid_account  &&  <JoyidAddress />
        }

    </Box>
}
