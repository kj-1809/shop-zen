export default function ProductSearch({
	searchParams,
}: {
	searchParams: { q: string | undefined };
}) {
	return (
		<div>
			<h1>Product Search Page</h1>
			<h2>{searchParams.q}</h2>
		</div>
	);
}
