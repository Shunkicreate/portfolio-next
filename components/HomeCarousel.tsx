import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type Props = {
  imgs?: string[];
};

const HomeCarousel = (props: Props) => {
  if (props.imgs) {
    return (
      <Swiper
        slidesPerView={ 1 }
        modules={ [Navigation, Pagination, Scrollbar, A11y] }
        navigation
      >
        { props.imgs.map((src: string, i: number) => {
          return (
            <SwiperSlide key={ `${i}` }
            >
              <Image
                src={ src }
                width={ 640 }
                height={ 400 }
                alt="carousel image"
              />
            </SwiperSlide>
          )
        }) }
      </Swiper>
    )
  }
  return (
    <div>No Images</div>
  )
}

export default HomeCarousel