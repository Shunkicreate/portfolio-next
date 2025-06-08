// app/head.tsx
export default function Head() {
	const siteUrl = 'https://shunki-create.com'

	return (
		<>
			<meta charSet='utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1' />

			<title>Shunki Create</title>
			<meta name='description' content='Portfolio site of Shunki Tada' />
			<link rel='canonical' href={siteUrl} />

			<meta property='og:title' content='Shunki Create' />
			<meta property='og:description' content='Portfolio site of Shunki Tada' />
			<meta property='og:url' content={siteUrl} />
			<meta property='og:site_name' content='Shunki Create' />
			<meta property='og:type' content='website' />
			<meta property='og:image' content={`${siteUrl}/gallery/DSC04337_edited.webp`} />
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='630' />
			<meta property='og:image:alt' content='Preview image of Shunki Create' />

			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content='Shunki Create' />
			<meta name='twitter:description' content='Portfolio site of Shunki Tada' />
			<meta name='twitter:image' content={`${siteUrl}/gallery/DSC04337_edited.webp`} />
		</>
	)
}
