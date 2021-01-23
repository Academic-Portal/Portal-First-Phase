import React from "react";

import './Home.css';
import Review from './AboutUsHome/Review'
import NavBarHome from './NavBarHome/NavBarHome'
import CarouselHome from './CarouselHome/CarouselHome'
function Home() {
    return (
        <div>
            <NavBarHome />
            <CarouselHome />
            <Review/>      
        </div>
    )
}

export default Home;