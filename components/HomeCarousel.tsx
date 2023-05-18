import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

type Props = {
	imgs?: string[];
};

const HomeCarousel = (props: Props) => {
	if (props.imgs) {
		return (
			<Swiper slidesPerView={1} navigation>
				{props.imgs.map((src: string, i: number) => {
					return (
						<SwiperSlide key={`${i}`}>
							<img src={src} alt='carousel image' />
						</SwiperSlide>
					);
				})}
			</Swiper>
		);
	}
	return <div>No Images</div>;
};

export default HomeCarousel;
