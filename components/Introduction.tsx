import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';

const Introduntion = () => {
	const router = useRouter();
	const [ClickState, setClickState] = useState(false);
	const handleClick = async (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, href: string) => {
		setClickState(true);
		e.preventDefault();
		await router.push(href);
	};
	return (
		<div className='introduction'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-10'>
						<h2>This is portfolio of Shunki Tada</h2>
					</div>
					<div className='col-md-6 col-12'>
						<div className='row justify-content-center row-content text-start gy-3'>
							<div className='col-12'>
								<h2 className='intro-title'>My first work</h2>
							</div>
							<div>
								This is my first work in programming. I love Mario so much that I was obsessed with it
								when I was a first year in college. The web site only works on a PC. The video is my
								tweet. The video is my tweet.
							</div>
							<div className='col-md-12 text-start'>
								<div className='row justify-content-evenly text-start'>
									<div className='col-md-2 col-auto text'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://mario-by-processing.netlify.app/'
										>
											<button type='button' className='btn btn-outline-secondary'>
												website
											</button>
										</a>
									</div>
									<div className='col-md-2 col-auto text'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://twitter.com/syunki____/status/1269528018076102657?s=20'
										>
											<button type='button' className='btn btn-outline-secondary'>
												Video
											</button>
										</a>
									</div>
								</div>
							</div>
							<div className='col-12'>
								<h2 className='intro-title'>My Works</h2>
							</div>
							<div className='col-md-12'>
								<ul>
									<li>
										<a
											href='https://beautiful-girl-ronaldico.netlify.app/'
											target='_blank'
											rel='noopener noreferrer'
										>
											美女図鑑
										</a>
									</li>
									<li>
										<a
											href='https://dabemon-go.glideapp.io/'
											target='_blank'
											rel='noopener noreferrer'
										>
											ダベモン図鑑
										</a>
									</li>
									<li>
										<a href='https://banmeshikun.com/' target='_blank' rel='noopener noreferrer'>
											晩飯
										</a>
									</li>
									<li>
										<a
											href='https://water-canvas.netlify.app/'
											target='_blank'
											rel='noopener noreferrer'
										>
											WATER CANVAS
										</a>
									</li>
								</ul>
							</div>
							<div className='col-12'>
								<h2 className='intro-title'>Internships</h2>
							</div>
							<div className='col-md-12'>
								<ul>
									<li>
										<a href='' target='_blank' rel='noopener noreferrer'>
											Potlatch
										</a>{' '}
										| Jan-Feb 2021
									</li>
									<li>
										<a href='https://hutzper.com/' target='_blank' rel='noopener noreferrer'>
											Hutzper
										</a>{' '}
										| Aug- 2021
									</li>
									<li>
										<a href='https://simplise.jp/' target='_blank' rel='noopener noreferrer'>
											Simplise
										</a>{' '}
										| Aug- 2021
									</li>
								</ul>
							</div>
							<div className='col-12'>
								<h2 className='intro-title'>Who is he?</h2>
							</div>
							<div className='col-12 who-text'>
								Shunki Tada is a programmer.
								<br />
								He can write basic HTML and CSS and he can create a website using Vue.js.Moreover, he is
								familior with Python and C language.
							</div>
							<div className='col-12'>
								<a
									href={'history'}
									onClick={(e) => {
										handleClick(e, 'history')
											.then(() => {
												setClickState(false);
											})
											.catch((e) => {
												// eslint-disable-next-line no-console
												console.log(e);
											});
									}}
									target='_top'
									className='nav-link active'
									aria-current='page'
								>
									time-table
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Introduntion;
