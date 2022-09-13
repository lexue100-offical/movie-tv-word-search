import { ChangeEventHandler, useCallback, useEffect } from "react";
import { useResources } from "@requests";
import { useStore } from "@store";
import cn from "classnames";

// 获取
function getPages(totalCount: number, currentPageNum: number) {
	// 默认每页20个
	const videosPerPage = 20;
	const pageNum = Math.min(Math.floor(totalCount / videosPerPage), 9);
	// 定个最小值
	const actualPageNum = Math.max(currentPageNum || 1);

	return new Array(pageNum).fill(0).map((_, index) => actualPageNum + index);
}

export const Footer = () => {
	const pageNum = useStore(s => s.pageNum);
	const setPageNum = useStore(s => s.setPageNum);
	const { data, refetch } = useResources();
	const fetchPreviousPage = () => setPageNum(s => s - 1);
	const fetchNextPage = () => setPageNum(s => (s === 0 ? s + 2 : s + 1));
	useEffect(() => {
		if (pageNum) {
			refetch();
		}
	}, [pageNum, refetch]);

	return (
		<footer className="btn-group text-lg">
			<input
				disabled={!data || pageNum === 0}
				type="radio"
				name="options"
				checked={false}
				data-title="上一页"
				className="btn"
				onClick={fetchPreviousPage}
			/>
			{data?.count &&
				Math.floor(data.count / pageNum) > 0 &&
				getPages(data.count, pageNum).map((p, index) => (
					<input
						key={index}
						type="radio"
						name="options"
						value={p + 1}
						data-title={p + 1}
						className={cn(
							"btn",
							p === (pageNum === 0 ? 1 : pageNum) && "btn-primary"
						)}
						onClick={() => setPageNum(p)}
					/>
				))}
			<input
				disabled={!data}
				type="radio"
				name="options"
				data-title="下一页"
				className="btn"
				onClick={fetchNextPage}
				checked={false}
			/>
		</footer>
	);
};
