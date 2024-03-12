import React, { useState } from 'react'
import Seeu from "./seeu";
import Neuron from "./Neuron";

const Footer = () => {
    const [showSeeuTab, setActiveTab] = useState(true)

    // const handleClick = () => {
    //     console.log("hello ninjias");
    // }

  return (
    <div className="flex flex-col items-center pt-24 bg-no-repeat bg-center h-[60rem] bg-[#C6F0FF]">

        <div className="max-w-6xl flex ">
            <div className="columns-[33.75rem] bottom-card-left py-6 px-12 rounded-l-3xl">
                <div className="bottom-tab-container flex gap-8" >
                    <div className={showSeeuTab ? "bottom-tab bottom-tab-hover" : "bottom-tab"} onClick={() => setActiveTab(true)}>
                        SeeU
                    </div>
                    <div className={showSeeuTab ? "bottom-tab" : "bottom-tab bottom-tab-hover"} onClick={() => setActiveTab(false)}>
                        CKB
                    </div>
                </div>

                <div id="tab-content-container">
                    {showSeeuTab ?
                    <div id="tab-content-seeu"  className="flex  flex-col">
                        <Seeu />


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
