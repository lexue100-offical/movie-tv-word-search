import { useResources } from "../requests";
import { useStore } from "@store";
import { Loader } from "./Loader";

export const Search = () => {
	const searchTerm = useStore(s => s.searchTerm);
	const setSearchTerm = useStore(s => s.setSearchTerm);
	const { refetch, isFetching } = useResources();
	const search = () => refetch();

	return (
		<>
			<input
				type="text"
				className="px-2 py-1 input input-primary focus:outline-none"
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<button
				disabled={isFetching}
				onClick={search}
				className="flex items-center btn btn-primary btn-sm disabled:btn-disabled"
			>
				查询单词
				{isFetching && <Loader className="ml-1" />}
			</button>
		</>
	);
};
