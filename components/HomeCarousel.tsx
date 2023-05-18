import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

type Props = {
	imgs?: string[];
};

const HomeCarousel = (props: Props) => {
	if (props.imgs) {
		return (
			<Swiper
				spaceBetween={30}
				effect={'fade'}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Autoplay, EffectFade, Navigation, Pagination]}
			>
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
