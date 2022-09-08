import { useStore } from "@store";
import { trpc } from "../utils/trpc";

export const useResources = () => {
	const searchTerm = useStore(s => s.searchTerm)
	return trpc.useQuery(["resources.resources", { text: searchTerm }], {
		enabled: false,
	});
};
