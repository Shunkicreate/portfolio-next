import { promises as fs } from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Carousel from '../components/HomeCarousel';
import TopTitle from '../components/TopTitle';

type Props = {
	imgs?: string[];
};

export const getServerSideProps: GetServerSideProps = async () => {
	const imgDirectory = path.join(process.cwd(), 'public/carousel');
	const fileContents = await fs.readdir(imgDirectory, 'utf8');
	for (let i = 0; i < fileContents.length; ++i) {
		fileContents[i] = '/carousel/' + fileContents[i]
	}
	const props: Props = {
		imgs: fileContents,
	};
	return {
		props: props,
	};
}
const Home = (props: Props) => {

	return (
		<>
			<Header />
			<main className="w-full md:w-3/4 lg:w-2/4 mx-auto">
				<TopTitle title='Home' />
				<div className='mx-auto'>
					<Carousel imgs={ props.imgs } />
				</div>
				{/* <a href={ 'next-bus' } onClick={ (e) => { handleClick(e, 'next-bus') } }>next-bus</a>
				<a href={ 'time-table' } onClick={ (e) => { handleClick(e, 'time-table') } }>time-table</a> */}
			</main>
			<Footer />
		</>
	)
}

export default Home