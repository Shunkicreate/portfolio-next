import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import SNSIcon from './SNSIcon';

const Footer = () => {
	const router = useRouter();
	const handleClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, href: string) => {
		e.preventDefault()
		router.push(href)
	}
	const SNSData = [
		{
			src: "/icons/instagram.svg",
			link: "https://www.instagram.com/shunki__t",
			SNS: 'instagram'
		},
		{
			src: "/icons/twitter.svg",
			link: "https://twitter.com/shunki______",
			SNS: 'twitter'
		},
		{
			src: "/icons/mail.svg",
			link: "mailto:jmsrsyunrinsyunki@gmail.com",
			SNS: 'mail'
		},
		{
			src: "/icons/facebook.svg",
			link: "https://www.facebook.com/profile.php?id=100010753628988",
			SNS: 'facebook'
		},
		{
			src: "/icons/linkedin.svg",
			link: "https://www.linkedin.com/in/%E9%A7%BF%E5%B8%8C-%E5%A4%9A%E7%94%B0-1450891a7/",
			SNS: 'linkedin'
		},
		{
			src: "/icons/github.svg",
			link: "https://github.com/Shunkicreate/",
			SNS: 'github'
		}
	]

	return (
		<div className="footer border-t border-gray-50 border-solid border-2">
			<div className='grid grid-cols-6'>
				{
					SNSData.map((item, i) => {
						return (
							<SNSIcon i={ i } src={ item.src } link={ item.link } SNS={ item.SNS } />
						)
					})
				}
			</div>

		</div>

	)
}

export default Footer