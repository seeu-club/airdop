import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";
import { initConfig } from "@joyid/ckb";

import {PersistGate} from "redux-persist/integration/react";
import store,{persistor} from "./store";
import { Provider } from "react-redux";

import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

initConfig({
    name: "Unicorn",
    logo: "https://unicorn.seeuclub.xyz/box.jpg",
    joyidAppURL: "https://app.joy.id/",
});
const config = getDefaultConfig({
    appName: 'Seeu-club',
    projectId: 'ffdeec67aed372c66a84325bd60287e8',
    chains: [mainnet, polygon, optimism, arbitrum, base, zora],
    ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();


function App() {
  return (
      <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                  <PersistGate loading={null} persistor={persistor} >
                      <Provider store={store}>
                          <div>

                              <div className="bg-no-repeat bg-center h-[60rem]" style={{
                                  backgroundImage: 'url(/bg1.png)',backgroundSize:'100% 100%'}}>
                                  <Navbar />
                                  <Hero />
                              </div>
                              {/*<Schedule />*/}
                              <Footer />
                          </div>
                      </Provider>
                  </PersistGate>
              </RainbowKitProvider>
          </QueryClientProvider>
      </WagmiProvider>

  );
}

export default App;
