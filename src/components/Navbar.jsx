import React from 'react'

const Navbar = () => {
    return (
        <div className="w-full flex justify-center items-center pt-5 ">
            <div className="w-[24rem] md:w-[48rem] lg:w-[64rem] h-15 flex  items-center ">
     
                <button type="button" className="Navbar-icon-btn text-white bg-white-600 focus:ring-4 focus:outline-none rounded-lg p-2.5 text-center inline-flex items-center  ">
                    <img className="w-15" src="/logo.png" alt="buttonpng"  />
                </button>
                
                <div className="text-[#131314] font-bold	text-2xl	 p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    SeeU
                </div>

                <div className="w-[24rem] md:w-[48rem] lg:w-[64rem] h-15 flex flex-row-reverse items-center">   
                    <button className="Navbar-icon-btn-right ml-4 float-right bg-white hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-full">
                        <img src="/x.png" alt="buttonpng" border="0" width={24} height={24}  />
                    </button>

                    <button className="Navbar-icon-btn-right float-right bg-white hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-full">
                        <img src="/tg.png" alt="buttonpng" border="0" width={24} height={24}  />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar