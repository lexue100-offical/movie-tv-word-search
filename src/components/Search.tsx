import { useResources } from "../requests";
import { useStore } from "@store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Search = () => {
	const searchTerm = useStore(s => s.searchTerm);
	const setSearchTerm = useStore(s => s.setSearchTerm);
	const { refetch, isFetching } = useResources();
	const search = () => refetch();

	return (
		<div className="flex space-x-3">
			<input
				type="text"
				className="px-2 py-1 empty:ring-2 empty:ring-green-400 rounded focus:ring focus:ring-green-500 focus:outline-none"
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<button
				disabled={isFetching}
				onClick={search}
				className="flex items-center btn btn-sm disabled:btn-disabled"
			>
				查询单词
				{isFetching && (
					<AiOutlineLoading3Quarters className="ml-1 animate-spin" />
				)}
			</button>
		</div>
	);
};
