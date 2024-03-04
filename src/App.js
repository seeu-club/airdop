import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";
import { initConfig } from "@joyid/ckb";

import {PersistGate} from "redux-persist/integration/react";
import store,{persistor} from "./store";
import { Provider } from "react-redux";

initConfig({
    name: "JoyID demo",
    logo: "http://localhost:3000",
    joyidAppURL: "https://testnet.joyid.dev",
});

function App() {
    return (
        <PersistGate loading={null} persistor={persistor} >
            <Provider store={store}>
                <div>

                    <div className=" bg-no-repeat bg-center h-[60rem]" style={{
                        backgroundImage: 'url(/bg1.png)'}}>
                        <Navbar />
                        <Hero />
                    </div>
                    <Schedule />
                    <Footer />
                </div>
            </Provider>
        </PersistGate>
    );
}

export default App;
