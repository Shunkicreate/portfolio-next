type Props = {
	title: string;
};
const TopTitle = (props: Props) => {
	return <h1 className='py-16 text-center text-6xl font-medium'>{ props.title }</h1>;
};

export default TopTitle;