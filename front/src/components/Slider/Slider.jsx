import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from'./Slider.module.css';



function Slider() {
  const datas = [
    {
      id: 1, 
      image: '/photosSlide/photoslide.jpg',
      alt: 'Slider 1'
    },
    {
      id: 2, 
      image: '/photosSlide/photoSlide2.jpg',
      alt: 'Slider 2'
    },
    {
      id: 3, 
      image: '/photosSlide/photoslide3.jpg',
      alt: 'Slider 3'
    },
    {
      id: 4, 
      image: '/photosSlide/photoSlide5.jpg',
      alt: 'Slider 4'
    },
    {
      id: 5, 
      image: '/photosSlide/photoSlide6.jpg',
      alt: 'Slider 5'
    },
  ]
  return (
    
    <Carousel className={style.carouselRoot} 
    autoPlay={true} 
    infiniteLoop={true}
    interval={5000}
    transitionTime={700}>
    
      {datas.map((data) => (
        <div key={data.id} className={style.carouselSlide}>
          <img src={data.image} alt={data.alt} className={style.slideImage} />
        </div>
      ))}
    </Carousel>
    
  )
}

export default Slider