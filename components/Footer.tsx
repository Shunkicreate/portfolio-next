import { SNSType } from '../types/globals.type';
import SNSIcon from './SNSIcon'

type Props = {
	SNSData: SNSType[]
}

const Footer = (props: Props) => {
	const SNSData = props.SNSData
	return (
		<footer className='text-center m-4'>
			<div className='border-t-2 border-gray-100 border-solid'>
				<div className='grid grid-cols-6 m-12'>
					{SNSData.map((item, i) => {
						return <SNSIcon key={i} src={item.src} link={item.link} SNS={item.SNS} />;
					})}
				</div>
			</div>
			<div>&copy; 2023- Shunki Tada All rights reserved.</div>
		</footer>
	);
};

export default Footer;
