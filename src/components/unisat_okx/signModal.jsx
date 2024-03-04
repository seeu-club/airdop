import styled from "styled-components";
import CloseImg from "../../assets/close.png";
import SignIcon from "../../assets/signIcon.png";
import CopyImg from "../../assets/copy.png";

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
    return <Mask>
        <ModalBg>
            <CloseBox>
                <img src={CloseImg} alt=""/>
            </CloseBox>
            <TitleInfo>
                <img src={SignIcon} alt=""/>
                <span>Signature Info</span>
            </TitleInfo>

            <FlexBox>
                <TitleBox>Message</TitleBox>
                <FlexLine>
                    <div className="copyCode">e3qrwB8buu</div>
                    <img src={CopyImg} alt=""/>
                </FlexLine>
                <Tips>The message will be signed with magic bytes “Nervos Message”</Tips>
            </FlexBox>
            <FlexBox>
                <TitleBox>Signature</TitleBox>
                <InputBox>
                    <input type="text" placeholder="Enter signature" />
                </InputBox>
            </FlexBox>
            <BtnGroup>
                <BtnBox>Bind</BtnBox>
            </BtnGroup>
        </ModalBg>
    </Mask>
}
