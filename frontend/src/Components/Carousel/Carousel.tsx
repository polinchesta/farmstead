import React from 'react';
import styles from './Carousel.module.sass'
import Slider from 'react-slick';
import gr1 from '../../assets/grSlide.jpg';
import gr2 from '../../assets/grSlide1.jpg';
import gr3 from '../../assets/grSlide2.jpg';
import gr4 from '../../assets/grSlide3.jpg';
import gr5 from '../../assets/grSlide4.jpg';
import gr6 from '../../assets/grSlide6.jpg';



export const MyImageSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 2
  };

  return (
    <div className={styles.slide}>
      <Slider {...settings}>
        <div>
          <img src={gr3} alt="WebSite Logo" />
        </div>
        <div>
          <img src={gr2} alt="WebSite Logo" />
        </div>
        <div>
          <img src={gr1} alt="WebSite Logo" />
        </div>
        <div>
          <img src={gr6} alt="WebSite Logo" />
        </div>
        <div>
          <img src={gr4} alt="WebSite Logo" />
        </div>
        <div>
          <img src={gr5} alt="WebSite Logo" />
        </div>
      </Slider>
    </div>
  );
}