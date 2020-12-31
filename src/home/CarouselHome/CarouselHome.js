import React from "react";

import Carousel from 'react-bootstrap/Carousel';
import './CarouselHome.css';
import  image1 from './Slides/image1.jpg';
import  image2 from './Slides/image2.jpg';

function CarouselHome(){
    return <Carousel>
        <Carousel.Item interval={1000}>
            <img
                className="d-block w-100"
                src={image1}
                alt="First slide"
            />
            <Carousel.Caption>
                <h3>Hello</h3>
                <p>The First Slide</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
            <img
                className="d-block w-100"
                src={image2}
                alt="Second slide"
            />
            <Carousel.Caption>
                <h3>Hello</h3>
                <p>The First Slide</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
}

export default CarouselHome;