import { useResources } from "@requests";
import { useStore } from "@store";

export const Footer = () => {
	const pageNum = useStore(s => s.pageNum);
	const setPageNum = useStore(s => s.setPageNum);
	const { refetch } = useResources();
	const fetchPreviousPage = () => {
		setPageNum(s => s - 1);
		refetch({});
	};
	const fetchNextPage = () => {
		setPageNum(s => s + 1);
		refetch();
	};

	return pageNum > 0 ? (
		<footer className="btn-group space-x-4 text-lg">
			<input
				type="radio"
				name="options"
				data-title="上一页"
				className="btn"
				onClick={fetchPreviousPage}
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
				onClick={fetchNextPage}
			/>
		</footer>
	) : null;
};
