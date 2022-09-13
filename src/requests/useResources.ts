import { useStore } from "@store";
import { getNuxtData } from "@utils/getNuxtData";
import { trpc } from "@utils/trpc";

export const useResources = () => {
	const searchTerm = useStore(s => s.searchTerm);
	const pageNum = useStore(s => s.pageNum);
	return trpc.useQuery(
		["resources.resources", { searchTerm, pageParam: pageNum }],
		{
			enabled: false,
			select: data => getNuxtData(data),
		}
	);
};
