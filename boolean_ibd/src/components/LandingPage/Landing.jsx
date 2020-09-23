import React from 'react';
// import {Link} from "react-router-dom";
// import Canvas from "./Canvas";
import FooterLanding from './FooterLanding';
import Hero from './Hero';
import About from './About';
import Team from './Team';
import Features from './Features';
import Pricing from './Pricing';

// const HeroBox = (props) => {
//   return (
//     <div id="hero">
//       {/* <Canvas /> */}
//       <div className="hero__content">
//             <h1 className="hero__title">IBD Project</h1>
//             <h3 className="hero__lead">Get personalized genetic insight to transform your IBD research</h3>
//             <Link to="/signup">
//               <button className="hero__btn">START TRIAL</button>
//             </Link>
//       </div>
//     </div>
//   )
// };

const LandingPage = () => {
    return (
      <React.Fragment>
        <Hero />
        <About />
        <Features />
        <Pricing />
        <Team />
        <FooterLanding />
      </React.Fragment>
  );
}
   

export default LandingPage;