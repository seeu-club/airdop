import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
// import Unisat_okx from "./unisat_okx/unisat_okx";
import Seeu from "./seeu";
import {useSelector} from "react-redux";
import {connect} from "@joyid/ckb";
import store from "../store";
import {saveJoyid} from "../store/reducer";
import JoyidAddress from "./unisat_okx/JoyidAddress";
import styled from "styled-components";
import Neuron from "./Neuron";



const Footer = () => {
    const [showSeeuTab, setActiveTab] = useState(true);

    // const handleClick = () => {
    //     console.log("hello ninjias");
    // }


  return (
    <div className="flex flex-col items-center pt-24  bg-no-repeat bg-center h-[60rem] bg-[#C6F0FF]">

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
                        <div id="tab-content-seeu"  className="flex  flex-col">
                            <Seeu />
                        </div>
                     :
                        <Neuron />
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