import React from 'react'
import { Swiper,SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';

import Slider2Img from "../../assets/images/banner-1.jpg"
import Slider1Img from "../../assets/images/banner-2.jpg"
const HeroSection = () => {
  return (
    <section className="section-1">
 <Swiper

  spaceBetween={0}
  slidesPerView={1}          
  breakpoints={{
      1024: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
     
    
    }}
  >               
    <SwiperSlide>
        <div className="content" style={{ backgroundImage: `url(${Slider2Img})` }}>                        
        </div>                   
    </SwiperSlide>
    <SwiperSlide>
        <div className="content" style={{ backgroundImage: `url(${Slider1Img})` }}>                        
        </div>
    </SwiperSlide>                
</Swiper>
 </section>
  )
}

export default HeroSection