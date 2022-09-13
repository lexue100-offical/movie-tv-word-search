import { useStore } from "@store";
import { getNuxtData } from "@utils/getNuxtData";
import { trpc } from "@utils/trpc";

export const useResources = () => {
	const searchTerm = useStore(s => s.searchTerm);
	return trpc.useQuery(["resources.resources", { searchTerm }], {
		enabled: false,
		select: data => getNuxtData(data),
	});
};
