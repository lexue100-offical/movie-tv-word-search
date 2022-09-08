import { useResources } from "../requests";
import { useStore } from "@store";

export const Search = () => {
	const searchTerm = useStore(s => s.searchTerm);
	const setSearchTerm = useStore(s => s.setSearchTerm);
	const { refetch } = useResources();
	const search = () => refetch();

	return (
		<div className="">
			<input
				type="text"
				className="p-2 empty:ring-2 empty:ring-green-400 rounded"
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<button
				onClick={search}
				className="px-2 py-1 rounded bg-green-100 text-green-500 hover:bg-green-200"
			>
				查询
			</button>
		</div>
	);
};
