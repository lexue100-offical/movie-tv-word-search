import { useResources } from "@requests";

const pageNum = 3;

export const Footer = () => {
	const { fetchPreviousPage, fetchNextPage } = useResources();

	return (
		<footer className="btn-group space-x-4 text-lg">
			<input
				type="radio"
				name="options"
				data-title="上一页"
				className="btn"
				onClick={() => fetchPreviousPage()}
			/>
			{new Array(pageNum).fill(0).map((_, index) => (
				<input
					key={index}
					type="radio"
					name="options"
					data-title={index + 1}
					className="btn"
				/>
			))}
			<input
				type="radio"
				name="options"
				data-title="下一页"
				className="btn"
				onClick={() => fetchNextPage()}
			/>
		</footer>
	);
};
