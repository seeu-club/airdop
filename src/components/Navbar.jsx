import React from 'react'

const Navbar = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-[24rem] md:w-[48rem] lg:w-[64rem] h-15 flex  items-center ">

                <button type="button" className="Navbar-icon-btn text-white bg-white-600 focus:ring-4 focus:outline-none rounded-lg p-2.5 text-center inline-flex items-center  ">
                    <img className="w-15" src="/logo.png" alt="buttonpng"  />
                </button>

                <div className="text-[#131314] font-bold	text-2xl	 p-2.5 text-center inline-flex items-center me-2">
                    SeeU
                </div>

                <div className="w-[24rem] md:w-[48rem] lg:w-[64rem] h-15 flex flex-row-reverse items-center">
                    <a href={'https://twitter.com/seeu_brc20'} className="Navbar-icon-btn-right ml-4 float-right bg-white text-white font-bold py-3 px-3 rounded-full">
                        <img src="/x.png" alt="buttonpng" border="0" width={24} height={24}  />
                    </a>

                    <a href={'https://t.me/unicorn_ckb'} className="Navbar-icon-btn-right float-right bg-white text-white font-bold py-3 px-3 rounded-full">
                        <img src="/tg.png" alt="buttonpng" border="0" width={24} height={24}  />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar
