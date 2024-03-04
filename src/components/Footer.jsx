import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Unisat_okx from "./unisat_okx/unisat_okx";

const Footer = () => {
    const [showSeeuTab, setActiveTab] = useState(true);

    // const handleClick = () => {
    //     console.log("hello ninjias");
    // }
    const [anchorEl, setAnchorEl] = useState(false);

    const handleClick = () => {
        setAnchorEl(true);
    };

    const handleClose = () => {
        setAnchorEl(false);
    };

    const handleCopy = () => {
        navigator.clipboard
            .writeText('e3qrwB8buu');
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

  return (
    <div className="flex flex-col items-center pt-24 border-2 border-blue-500 bg-no-repeat bg-center h-[60rem] bg-[#C6F0FF]">

        <div className="max-w-6xl flex ">
            <div className="columns-[33.75rem] bottom-card-left py-6 px-12 rounded-tl-3xl">
                <div className="bottom-tab-container flex gap-8" >
                    <div className={showSeeuTab ? "bottom-tab bottom-tab-hover" : "bottom-tab"} onClick={() => setActiveTab(true)}>
                        Seeu
                    </div>
                    <div className={showSeeuTab ? "bottom-tab" : "bottom-tab bottom-tab-hover"} onClick={() => setActiveTab(false)}>
                        CKB
                    </div>
                </div>

                <div id="tab-content-container">
                    {showSeeuTab ? 
                    <div id="tab-content-seeu"  className="flex  flex-col  justify-center items-center content-center m-7 mt-10 ">
                        <Unisat_okx />
                        {/*<div className='mt-2'>*/}
                        {/*    <img className="bottom-card-img" src="logo3.png" alt=""/>*/}
                        {/*</div>*/}
                        {/*<div className="mt-6 font-bold text-2xl font-['NationalPark'] tracking-wider">*/}
                        {/*    Connect your Seeu Wallet*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <button className="bg-gradient-to-b from-[#07CEFA] to-[#0794FA] hover:from-[#FE609D] hover:to-yellow-500  text-white font-bold w-[25rem] h-[3rem] py-3 px-4 rounded-2xl font-bold text-base mt-10">*/}
                        {/*        Connect*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        {/*<div className="mt-6 text-sm font-['NationalPark'] text-[#727778]">*/}
                        {/*    Some simple introductions and descriptions of the text station space Balabala*/}
                        {/*</div>*/}
                    </div>
                     :
                     <div id="tab-content-ckb"  className="flex  flex-col  justify-center items-center content-center m-7 mt-10 ">
                        {/*<div className='mt-2'>*/}
                        {/*    <img className="bottom-card-img" src="logo3.png" alt=""/>*/}
                        {/*</div>*/}
                        {/*<div className="mt-6 font-bold text-2xl font-['NationalPark'] tracking-wider">*/}
                        {/*    Connect your CKB Wallet*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <button onClick={handleClick} className="bg-gradient-to-b from-[#07CEFA] to-[#0794FA] hover:from-[#FE609D] hover:to-yellow-500  text-white font-bold w-[25rem] h-[3rem] py-3 px-4 rounded-2xl font-bold text-base mt-10">*/}
                        {/*        Connect*/}
                        {/*    </button>*/}
                        {/*    <Popover*/}
                        {/*        id={id}*/}
                        {/*        open={open}*/}
                        {/*        anchorEl={anchorEl}*/}
                        {/*        onClose={handleClose}*/}
                        {/*        anchorOrigin={{*/}
                        {/*            vertical: 'center',*/}
                        {/*            horizontal: 'center',*/}
                        {/*        }}*/}
                        {/*        transformOrigin={{*/}
                        {/*            vertical: 'center',*/}
                        {/*            horizontal: 'center',*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <Typography sx={{ p: 2 }}>*/}
                        {/*            <div className="flex min-w-150">*/}
                        {/*                <span>*/}
                        {/*                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                        {/*                        <path d="M12 0.5C5.39394 0.5 0 5.87374 0 12.5C0 19.1263 5.37374 24.5 12 24.5C18.6263 24.5 24 19.1263 24 12.5C24 5.87374 18.6061 0.5 12 0.5Z" fill="#FE609D"/>*/}
                        {/*                        <path d="M18.3818 8.8373C17.5314 8.89385 15.607 9.00588 15.5403 8.9552C15.6243 9.08041 17.212 9.93307 17.8255 10.2757C17.64 10.6786 17.5164 11.0813 17.331 11.4265L14.3639 11.8294L16.7129 12.6349C13.4985 17.9862 8.24423 16.8354 8.24423 16.8354C8.24423 16.8354 5.93813 18.9111 5.64795 19.1369C5.35779 19.3629 5.39799 19.5615 5.15348 19.4822C4.90901 19.4029 5.02988 19.1945 5.02988 19.1369C5.70981 17.6409 8.8006 11.7143 16.3421 7.16861C10.655 9.24005 7.74969 12.9802 6.26613 15.7997C5.83344 14.7064 4.53536 10.3333 10.9023 7.51387L12.3241 8.54958L12.5095 6.88095C14.2403 6.30552 16.342 5.84521 19 5.5C18.8764 6.76585 18.6291 7.85908 18.3818 8.8373Z" fill="white"/>*/}
                        {/*                    </svg>*/}
                        {/*                </span>*/}
                        {/*                <span className="popup-title">*/}
                        {/*                Signature Info*/}
                        {/*                </span>*/}
                        {/*            </div>*/}
                        {/*            <div className="popup-msg">*/}
                        {/*                Message*/}
                        {/*            </div>*/}
                        {/*            <div className="popup-key flex justify-center items-center">*/}
                        {/*                <div>*/}
                        {/*                    e3qrwB8buu*/}
                        {/*                </div>*/}
                        {/*                <div onClick={handleCopy} className=" ml-4 cursor-pointer">*/}
                        {/*                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                        {/*                        <g clip-path="url(#clip0_222_67)">*/}
                        {/*                            <path d="M10.7244 3.04762C11.0339 3.04762 11.3307 3.16803 11.5495 3.38235C11.7684 3.59668 11.8913 3.88737 11.8913 4.19048V14.8571C11.8913 15.1602 11.7684 15.4509 11.5495 15.6653C11.3307 15.8796 11.0339 16 10.7244 16H2.16693C2.01368 16 1.86194 15.9704 1.72036 15.913C1.57878 15.8556 1.45014 15.7714 1.34178 15.6653C1.23343 15.5591 1.14747 15.4332 1.08883 15.2945C1.03018 15.1558 1 15.0072 1 14.8571V4.19048C1 3.88737 1.12294 3.59668 1.34178 3.38235C1.56063 3.16803 1.85744 3.04762 2.16693 3.04762H10.7244ZM10.3354 4.57143H2.5559V14.4762H10.3354V4.57143ZM13.8331 2.18946e-07C14.1233 -0.000175621 14.4032 0.105569 14.6181 0.296596C14.833 0.487624 14.9675 0.750223 14.9953 1.03314L15 1.14286V11.4232C14.9998 11.6174 14.9239 11.8042 14.7877 11.9454C14.6516 12.0866 14.4656 12.1716 14.2676 12.183C14.0697 12.1944 13.8748 12.1313 13.7227 12.0067C13.5707 11.882 13.473 11.7052 13.4495 11.5124L13.4441 11.4232V1.52381H5.6677C5.47716 1.52379 5.29325 1.45527 5.15086 1.33126C5.00846 1.20726 4.91749 1.03638 4.8952 0.851048L4.88975 0.761905C4.88978 0.575289 4.95973 0.395172 5.08635 0.255717C5.21297 0.116262 5.38745 0.0271676 5.57668 0.00533357L5.6677 2.18946e-07H13.8331Z" fill="#07CEFA"/>*/}
                        {/*                        </g>*/}
                        {/*                        <defs>*/}
                        {/*                            <clipPath id="clip0_222_67">*/}
                        {/*                                <rect width="16" height="16" fill="white"/>*/}
                        {/*                            </clipPath>*/}
                        {/*                        </defs>*/}
                        {/*                    </svg>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <div className="popup-desc">*/}
                        {/*                The message will be signed with magic bytes “Nervos Message”*/}
                        {/*            </div>*/}
                        {/*            <div className="popup-sign">*/}
                        {/*                Signature*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*            <div className="mt-6">*/}
                        {/*                <OutlinedInput*/}
                        {/*                    fullWidth*/}
                        {/*                    placeholder={'Signature'}*/}
                        {/*                    id="component-outlined"*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            </div>*/}
                        {/*            <div className="flex justify-center ">*/}
                        {/*                <Button className="popup-button" aria-describedby={id} variant="contained" onClick={handleClick}>*/}
                        {/*                    Bind*/}
                        {/*                </Button>*/}
                        {/*            </div>*/}





                        {/*            </Typography>*/}
                        {/*    </Popover>*/}

                        {/*</div>*/}
                        {/*<div className="mt-6 text-sm font-['NationalPark'] text-[#727778]">*/}
                        {/*    Some simple introductions and descriptions of the text station space Balabala*/}
                        {/*</div>*/}

                         <div className="flex card-main">
                            <div className="flex  flex-col  items-center">
                                <div className="card-border-top card-border-1">

                                </div>
                                <div>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect y="0.5" width="24" height="24" rx="12" fill="#07CEFA"/>
                                        <path d="M18.7068 9.26591L11.0405 17.1968C10.8594 17.384 10.6093 17.5 10.333 17.5C10.0568 17.5 9.80667 17.384 9.6255 17.1968L5.293 12.7138C5.11201 12.5275 5 12.2687 5 11.9829C5 11.4114 5.44791 10.9488 5.99953 10.9488C6.27577 10.9488 6.526 11.0647 6.7071 11.2519L10.333 15.0022L17.2929 7.80221C17.474 7.61589 17.7241 7.5 18.0003 7.5C18.5518 7.5 19 7.9634 19 8.534C19 8.81982 18.8879 9.07866 18.7068 9.26591Z" fill="white"/>
                                    </svg>

                                </div>
                                <div className="card-border-top card-border-2">

                                </div>
                                <div className="card-border-round">

                                </div>
                                <div className="card-border-bottom card-border-3">

                                </div>
                                <div className="card-border-round">

                                </div>
                            </div>

                             <div>
                                 <div className="card-card flex flex-col items-center w-96 rounded-2xl" >
                                     <div >
                                         <img className="neuron-icon" src="joid.png" alt=""/>
                                     </div>
                                     <div className="neuron-title">
                                         JoyId
                                     </div>
                                     <Button className="joyid-button" aria-describedby={id} variant="contained" onClick={handleClick}>
                                         Connect JoyID
                                     </Button>

                                 </div>
                                 <div className="card-card flex flex-col items-center w-96 rounded-2xl" >
                                     <div >
                                         <img className="neuron-icon" src="neuron.png" alt=""/>
                                     </div>
                                     <div className="neuron-title">
                                         Neuron
                                     </div>
                                     <div className="flex neuron-address neuron-input">
                                         <div className="neuron-input-left"></div>
                                         <span className="">0x327...2B8A</span>
                                         <div className="neuron-input-svg">
                                             <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                 <path d="M12.1047 6.21923C13.015 5.23282 13.2498 4.07802 12.7223 2.83649C12.203 1.61453 11.1995 1.06502 10.0863 1C9.22963 1.00416 8.58413 1.15698 8.08864 1.6022C7.27449 2.3335 6.50056 3.11132 5.74219 3.90147C5.38947 4.26919 5.647 4.88681 6.1571 4.91778C6.34747 4.93011 6.59052 4.81133 6.73745 4.67406C7.43054 4.02534 8.08542 3.33533 8.78173 2.68768C9.21408 2.28483 9.76037 2.18053 10.3293 2.33135C11.697 2.69492 12.1367 4.30633 11.1467 5.31956C10.4898 5.992 9.81628 6.64984 9.15214 7.31611C8.84286 7.627 8.81485 7.99888 9.07251 8.26942C9.32696 8.537 9.79764 8.52762 10.0915 8.23738C10.7681 7.57029 11.4603 6.91648 12.1047 6.21923ZM8.35448 9.47086C8.25099 8.95648 7.6571 8.82 7.26618 9.20221C6.61532 9.83953 5.98014 10.4944 5.3274 11.1307C4.60938 11.8299 3.47348 11.8268 2.78656 11.1359C2.06867 10.4138 2.10165 9.33868 2.88067 8.54223C3.51075 7.8966 4.15733 7.26651 4.79358 6.62825C5.1247 6.29565 5.15152 5.94025 4.87213 5.65833C4.60321 5.38779 4.21323 5.41152 3.89551 5.72656C3.22722 6.38869 2.55785 7.04974 1.89895 7.72111C1.30211 8.3284 1.00517 9.06493 0.999939 9.91715C1.00302 11.1288 1.68794 12.2226 2.80211 12.708C3.95463 13.2101 5.06049 13.0727 6.00401 12.2442C6.77472 11.5677 7.48135 10.8156 8.18892 10.0698C8.31721 9.93471 8.39175 9.65573 8.35448 9.47086ZM4.99989 3.00004C5.36816 3.00004 5.66658 2.70149 5.66658 2.33336V1.66668C5.66658 1.29842 5.36802 1 4.99989 1C4.63176 1 4.33335 1.29842 4.33335 1.66668V2.33336C4.33335 2.70149 4.63176 3.00004 4.99989 3.00004ZM8.99998 11C8.63172 11 8.3333 11.2984 8.3333 11.6666V12.3333C8.3333 12.7016 8.63172 13 8.99998 13C9.36825 13 9.66653 12.7016 9.66653 12.3333V11.6666C9.66653 11.2985 9.36825 11 8.99998 11ZM12.3333 8.33336H11.6666C11.2983 8.33336 11 8.63178 11 9.00004C11 9.36831 11.2984 9.66673 11.6666 9.66673H12.3333C12.7014 9.66673 12.9999 9.36831 12.9999 9.00004C12.9999 8.63178 12.7014 8.33336 12.3333 8.33336ZM1.66675 5.66664H2.33344C2.7017 5.66664 2.99998 5.36822 2.99998 4.99996C2.99998 4.63169 2.70157 4.33327 2.33344 4.33327H1.66675C1.29849 4.33327 1.00007 4.63169 1.00007 4.99996C1.00007 5.36822 1.29849 5.66664 1.66675 5.66664ZM11.569 10.3908C11.3086 10.1304 10.8865 10.1304 10.6261 10.3908C10.3658 10.6511 10.3658 11.0732 10.6261 11.3336L11.0975 11.805C11.3578 12.0653 11.78 12.0653 12.0403 11.805C12.3007 11.5446 12.3007 11.1225 12.0403 10.8621L11.569 10.3908ZM2.40355 3.44901C2.69419 3.73966 3.16528 3.73966 3.45606 3.44901C3.7467 3.15837 3.7467 2.68715 3.45606 2.39651L2.92974 1.87032C2.63909 1.57968 2.16801 1.57968 1.87723 1.87032C1.58659 2.16096 1.58659 2.63205 1.87723 2.92283L2.40355 3.44901Z" fill="#727778"/>
                                             </svg>
                                         </div>
                                     </div>
                                     <div className="neuron-claim-text">
                                         You can claim
                                         <span className="font-bold neuron-claim-nft-num">
                                            xx
                                        </span>
                                         NFTs.
                                     </div>
                                 </div>
                                 <div>
                                     <Button className="Claim-button" aria-describedby={id} variant="contained" onClick={handleClick}>
                                         Claim
                                     </Button>
                                 </div>
                             </div>
                         </div>

                    </div>
                    } 
                </div>


            </div>

            <div className="columns-[33.75rem]">
                <img src="/image3.png" alt="logo" width={640} height={600}></img>
            </div>

        </div>
    </div>

)
}

export default Footer