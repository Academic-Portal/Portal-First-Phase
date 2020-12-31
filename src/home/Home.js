import React from "react";

import './Home.css';
import NavBarHome from './NavBarHome/NavBarHome'
import CarouselHome from './CarouselHome/CarouselHome'
function Home() {
    return (
        <div>
            <NavBarHome />
            <CarouselHome />
        </div>
    )
}

export default Home;