import React from 'react'
import Countdown from "react-countdown";

// Random component
// const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  // if (completed) {
  //   // Render a complete state
  //   return <Completionist />;
  // } else {
    // Render a countdown
    return (
      // <span>
      //   {hours}:{minutes}:{seconds}
      // </span>

      <div className="flex flex-row font-['Anton'] ">
        <p className="font-bold text-lg ">
          <div className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl text-center">{hours}</div>
        </p>

        <div className="pt-3 pr-3 pl-1 font-bold text-4xl text-[#727778]">:</div>
        
        <p className="font-bold text-lg ">
          <div className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl text-center">{minutes}</div>
        </p>

        <div className="pt-3 pr-3 pl-1 font-bold text-4xl text-[#727778]">:</div>

        <p className="font-bold text-lg ">
          <div className="text-[#FE609D] bg-white border border-gray-100 focus:outline-none font-medium rounded-2xl px-3 py-3 me-2 mb-2 w-[4rem] h-[4rem] text-4xl text-center">{seconds}</div>
        </p>
      </div>
    );
  // }
};


const Hero = () => {
  return (
    <div className="w-full flex justify-center items-center mt-5 p-20">
        <div className="w-[80rem] h-[40rem] flex">
          <div className="w-[18rem] md:w-[40rem] lg:w-[40rem]">
            <img src="/image1.png" alt="logo" width={628} height={628}></img>
          </div>
          
          <div className="h-[30rem] w-[28rem] mt-20 ml-10 text-[#131314]">
            <p className="font-bold text-6xl mb-3 tracking-wider font-['NationalPark'] ">Mint Your NFT</p>
            <div className="">
              <div className="font-light text-lg">Total offering: <span className="font-bold">10000</span></div>
              <p className="font-light text-lg ">Price: <span className='font-bold'>0.19527</span> ETH</p>
              <p className="font-light text-lg ">Max mint per address: <span className='font-bold'>1</span></p>
            </div>
            
            <p className="font-bold text-lg mt-5 mb-2">MINT FINISH</p>

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
                <Countdown date={Date.now() + 3611000} renderer={renderer} />
            }


            <div className="relative">
              <div className="bg-white text-gray-900 border-gray-100 focus:outline-none font-medium rounded-full  h-[0.75rem] dark:bg-gray-800 dark:text-white dark:border-gray-600 mt-3 bg-white/[.64] 
             ">
                <div className=" text-gray-900 border-gray-100 focus:outline-none font-medium rounded-full w-[7rem] h-[0.75rem] dark:bg-gray-800 dark:text-white dark:border-gray-600 mt-3 
              bg-gradient-to-r from-[#46DDFF] to-[#FE609D] opacity-100 " >
                </div>
              </div> 
              
              <button type="button" className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 Navbar-icon-btn text-white bg-white-600 focus:ring-4 focus:outline-none rounded-lg text-sm text-center inline-flex items-center  ">
                    <img src="/logo-small.png" alt="buttonpng" border="0" width={28} height={28}  />
              </button>
            </div>


            <p className="font-bold text-lg mt-3 text-[#727778] font-['NationalPark']">The probability of winning in the first hour is as high as 9.527 times, Acceleration has ended</p>
         
            <button className="bg-gradient-to-b from-[#07CEFA] to-[#0794FA] hover:from-[#FE609D] hover:to-yellow-500  text-white font-bold w-[10rem] h-[3.5rem] py-3 px-4 rounded-2xl font-bold text-xl mt-6">
              Mint
            </button>
          </div>
        </div>
    </div>

  )
}

export default Hero