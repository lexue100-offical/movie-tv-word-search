import { useStore } from "@store";
import { trpc } from "../utils/trpc";

export const useResources = () => {
	const searchTerm = useStore(s => s.searchTerm);
	return trpc.useQuery(["resources.resources", { searchTerm }], {
		enabled: false,
	});
};
