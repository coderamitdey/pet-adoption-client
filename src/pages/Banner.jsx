import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  const slides = [
    {
      img: "https://i.ibb.co/VpV8XLjf/pet1.avif",
      tagline: "Find Your Furry Friend Today!",
    },
    {
      img: "https://i.ibb.co.com/Wbx5f1d/pet7.jpg",
      tagline: "Adopt, Don’t Shop — Give a Pet a Home.",
    },
    {
      img: "https://i.ibb.co.com/ynVcL7KL/pet8.png",
      tagline: "Because Every Pet Deserves Love and Care.",
    },
  ];

  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      {slides.map((slide, idx) => (
        <div key={idx} className="lg:h-[600px] w-full overflow-hidden">
          <img
            src={slide.img}
            alt={`Slide ${idx}`}
            className="w-full h-full object-cover object-center"
          />
          <p className="legend bg-black bg-opacity-50 text-white text-sm sm:text-base md:text-lg">
            {slide.tagline}
          </p>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
