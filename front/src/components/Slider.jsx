import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";



function Slider() {
  
  return (
    
        <Carousel>
            <div><img src={'/photosSlide/photoslide1.jpg'} alt="Slider 1" /></div>
            <div><img src={'/photosSlide/photoslide2.jpg'} alt="Slider 2" /></div>
            <div><img src={'/photosSlide/photoslide3.jpg'} alt="Slider 3" /></div>
        </Carousel>
    
  )
}

export default Slider