
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Slider2Img from "../../assets/images/img1.jpg";
import Slider1Img from "../../assets/images/img2.jpg";
import Slider3Img from "../../assets/images/img3.jpg";
import Slider4Img from "../../assets/images/img4.jpg";
import { Autoplay, Pagination,Navigation } from 'swiper/modules';

const HeroSection = () => {

  // Initialize Swiper when the component is mounted
  useEffect(() => {
    // Just to ensure swiper gets initialized
    console.log("Swiper component mounted");
  }, []);

  return (
    <section className="section-1">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 7000, // Automatically change every 3 seconds
          disableOnInteraction: false, // Keep autoplay even after user interacts with the slider
        }}
        pagination={{
          clickable: true, // Make dots clickable
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        modules={[Autoplay, Pagination, Navigation]} // Use Autoplay and Pagination modules
        breakpoints={{
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide>
          <div className="content" style={{ backgroundImage: `url(${Slider2Img})` }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="content" style={{ backgroundImage: `url(${Slider1Img})` }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="content" style={{ backgroundImage: `url(${Slider3Img})` }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="content" style={{ backgroundImage: `url(${Slider4Img})` }}></div>
        </SwiperSlide>
      
      </Swiper>
      {/* <div className="swiper-button-prev">Prev</div>
      <div className="swiper-button-next">Next</div> */}
    </section>
  );
};

export default HeroSection;
