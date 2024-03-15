import React, {useEffect} from 'react'
import Countdown from "react-countdown";
import store from "../store";
import {getClaimNum, saveClaimAllNum, saveNeuronClaimNum, saveSeeuClaimNum} from "../store/reducer";
import {useSelector} from "react-redux";




// Renderer callback with condition
const renderer = ({ formatted
                      , completed }) => {
    const {days,hours, minutes, seconds} =  formatted;

    return (
      <div className="flex flex-row font-['Anton'] ">
          <p className="font-bold text-lg ">
              <div className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl text-center">{days}</div>
          </p>

          <div className="pt-3 pr-3 pl-1 font-bold text-4xl text-[#727778]">:</div>
        <p className="font-bold text-lg ">
          <div style={{
              width: hours > 99 ? '5rem' : '4rem'
          }} className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl text-center">{hours}</div>
        </p>

        <div className="pt-3 pr-3 pl-1 font-bold text-4xl text-[#727778]">:</div>
        
        <p className="font-bold text-lg ">
          <div className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl text-center">{minutes}</div>
        </p>

        {/*<div className="pt-3 pr-3 pl-1 font-bold text-4xl text-[#727778]">:</div>*/}

        {/*<p className="font-bold text-lg ">*/}
        {/*  <div className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl text-center">{seconds}</div>*/}
        {/*</p>*/}
      </div>
    );
  // }
};


const Hero = () => {
    const claim_all_num = useSelector(store => store.claim_all_num);
    const max_claim = 4200;
    const [childWidth, setChildWidth] = React.useState(0);

    const GetClaims = () => {
        const myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com)");
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("https://seeu-nft-rest.matrixlabs.org/nfts/claimed/total", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res = JSON.parse(result);
                if (res && res.data) {
                    store.dispatch(saveClaimAllNum(res.data.claimed));
                }
            })
            .catch(error => {
                console.log('error11', error);
            })
            .finally();
    }
    useEffect(() => {
        GetClaims();
    }, []);
    useEffect(() => {
        if (claim_all_num <= 0) {
            setChildWidth(0);
            return;
        }
        setChildWidth((claim_all_num / max_claim  * 100).toFixed(2) + "%");
    }, [claim_all_num]);

  return (
    <div className="w-full flex justify-center items-center mt-5 p-20">
        <div className="w-[80rem] h-[40rem] flex">
          <div className="w-[18rem] md:w-[40rem] lg:w-[40rem]">
            <img src="top.jpg" alt="logo" width={628} height={628}></img>
          </div>
          
          <div className="h-[30rem] w-[28rem] mt-20 ml-10 text-[#131314]">
            <p className="font-bold text-6xl mb-3 tracking-wider font-['NationalPark'] ">Claim Unicorn DOBs</p>
            <div className="">
              <div className="font-light text-lg">Total amount: <span className="font-bold">21000</span></div>
              {/*<p className="font-light text-lg ">Price: <span className='font-bold'>0.19527</span> $CKB</p>*/}
              <p className="font-light text-lg ">Free mint
                  (340 $CKB paid will be encapsulated in Unicorn, redeemable anytime)</p>
              {/*<p className="font-light text-lg ">Max mint per address: <span className='font-bold'>1</span></p>*/}
            </div>
            
            <p className="font-bold text-lg mt-5 mb-2">MINT END</p>

            {/* <div className="flex flex-row font-['Anton'] ">
              <p className="font-bold text-lg ">
                <div className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl">43</div>
              </p>

              <div className="pt-3 pr-3 pl-1 font-bold text-4xl text-[#727778]">:</div>
              
              <p className="font-bold text-lg ">
                <div className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl">06</div>
              </p>

              <div className="pt-3 pr-3 pl-1 font-bold text-4xl text-[#727778]">:</div>

              <p className="font-bold text-lg ">
                <div className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl">52</div>
              </p>
            </div> */}
            {
                <Countdown zeroPadDays={2} zeroPadTime={2} date={Date.parse('Fri Mar 22 2024 10:00:00 GMT')} renderer={renderer} />

                // <Countdown
                //     date={Date.parse('Fri Mar 22 2024 10:00:00 GMT')}
                //     daysInHours={true}
                //     zeroPadTime={3}
                //     renderer={props => {
                //         console.log(props);
                //         return <div>{props.total}</div>;}}
                // />
            }


            <div className="relative">
              <div className="bg-white text-gray-900 border-gray-100 focus:outline-none font-medium rounded-full  h-[0.75rem] dark:bg-gray-800 dark:text-white dark:border-gray-600 mt-3 bg-white/[.64] 
             ">
                <div style={{width: childWidth}} className=" text-gray-900 border-gray-100 focus:outline-none font-medium rounded-full w-[7rem] h-[0.75rem] dark:bg-gray-800 dark:text-white dark:border-gray-600 mt-3
              bg-gradient-to-r from-[#46DDFF] to-[#FE609D] opacity-100 " >
                </div>
              </div> 
              
              <button style={{left: childWidth}} type="button" className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 Navbar-icon-btn text-white bg-white-600 focus:ring-4 focus:outline-none rounded-lg text-sm text-center inline-flex items-center  ">
                    <img src="/logo-small.png" alt="buttonpng" border="0" width={28} height={28}  />
              </button>
            </div>


            <p className="font-bold text-lg mt-3 text-[#727778] font-['NationalPark']">The total supply of Unicorn DOBs is 21,000: 20% airdrop, 80% will be obtained through staking mining.</p>
         
            {/*<button className="bg-gradient-to-b from-[#07CEFA] to-[#0794FA] hover:from-[#FE609D] hover:to-yellow-500  text-white font-bold w-[10rem] h-[3.5rem] py-3 px-4 rounded-2xl font-bold text-xl mt-6">*/}
            {/*  Mint*/}
            {/*</button>*/}
          </div>
        </div>
    </div>

  )
}

export default Hero