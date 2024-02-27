import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <div className="border-2 border-blue-500 bg-no-repeat bg-center h-[60rem]" style={{
       backgroundImage: 'url(/bg1.png)', 
       marginTop: 20}}>
        <Navbar />
        <Hero />
      </div>
      <Schedule />
      <Footer />
    </div>
  );
}

export default App;
