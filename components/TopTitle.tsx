type Props = {
  title: string
}
const TopTitle = (props: Props) => {
  return (
    <h1 className="my-32 text-center text-6xl font-medium">
      { props.title }
    </h1>
  )
}

export default TopTitle