import styled from "styled-components";
import CloseImg from "../../assets/close.png";
import SignIcon from "../../assets/signIcon.png";
import CopyImg from "../../assets/copy.png";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import store from "../../store";
import {saveJoyid, saveShowSign, saveSignature} from "../../store/reducer";


const Mask = styled.div`
    background: rgba(0,0,0,0.5);
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 99;
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

const CloseBox = styled.div`
    position: absolute;
    right: 20px;
    top:20px;
    cursor: pointer;
`

const TitleInfo = styled.div`
    display: flex;
    gap:8px;
    width: 600px;
    margin-bottom: 16px;
`

const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
`

const TitleBox = styled.div`
    color: #131313;
    font-family: 'NationalPark';
    font-size: 16px;
    font-style: normal;
    line-height: normal;
    margin-bottom: 8px;
`

const FlexLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    gap:10px;
    .copyCode{
        color: #131313;
        text-align: center;
        font-family: 'NationalPark';
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    img{
        margin-top: 10px;
    }
`

const Tips = styled.div`
    color: #727778;
`

const InputBox = styled.div`
    border-radius: 8px;
    border: 1px solid #E0E2EC;
    height: 40px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    overflow: hidden;
    input{
        height: 40px;
        flex-grow: 1;
        padding: 0 16px;
        &:focus{
            outline: none;
        }
    }
`

const BtnGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const BtnBox = styled.div`
    border-radius: 16px;
    background:linear-gradient(180deg, #07CEFA 0%, #0794FA 100%);
    width: 128px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #FFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
`

export default function SignModal(){
    const account = useSelector(store => store.account);
    const type = useSelector(store => store.type);
    const signature = useSelector(store => store.signature)
    const joyid_sign_msg = useSelector(store => store.joyid_sign_msg)
    const [msg,setMsg] = useState();
    const [input,setInput] = useState("")

    const {unisat,okxwallet} = window;
    useEffect(() => {
        //ToDO:需要調用接口獲取message
        setTimeout(()=>{
            setMsg(joyid_sign_msg)
        },500)
    }, []);

    useEffect(() => {
        if(!msg)return;
        signMessageInput()


    }, [msg]);

    const signMessageInput = () =>{
            if(!account || !type)return;
            if(type === "OKX"){
                OkxSign()
            }else if(type === "Unisat"){
                UnisatSign()
            }
    }
    const UnisatSign = async() =>{
        try{
            const sign = await unisat.signMessage(msg);
            console.log(sign)
            setInput(sign)
            store.dispatch(saveSignature(sign));

        }catch (e) {
            console.log("==UnisatSign===",e)
        }

    }

    const OkxSign = async () =>{

        try{
            const sign = await okxwallet.bitcoin.signMessage(msg, 'ecdsa');
            console.log(sign)
            setInput(sign)
            store.dispatch(saveSignature(sign));

        }catch (e) {
            console.log("==UnisatSign===",e)
        }

    }

    const bindMsg = () =>{
        console.log("=====bindMsg")
        store.dispatch(saveShowSign(false));
        //ToDO:需要調用接口提交claim
    }

    const handleCloseSign = () =>{
        store.dispatch(saveShowSign(false));
    }



    return <Mask>
        <ModalBg>
            <CloseBox onClick={()=>handleCloseSign()}>
                <img src={CloseImg} alt=""/>
            </CloseBox>
            <TitleInfo>
                <img src="signIcon.png" alt=""/>
                <span>Signature Info</span>
            </TitleInfo>

            <FlexBox>
                <TitleBox>Message</TitleBox>
                <FlexLine>

                    <div className="copyCode">{msg}</div>
                    <img src={CopyImg} alt=""/>
                </FlexLine>
                <Tips>The message will be signed with magic bytes “Nervos Message”</Tips>
            </FlexBox>
            <FlexBox>
                <TitleBox>Signature</TitleBox>
                <InputBox>
                    <input type="text" placeholder="Enter signature" value={input} readOnly={true}  />
                </InputBox>
            </FlexBox>
            <BtnGroup>
                <BtnBox onClick={()=>bindMsg()}>Bind</BtnBox>
            </BtnGroup>
        </ModalBg>
    </Mask>
}
