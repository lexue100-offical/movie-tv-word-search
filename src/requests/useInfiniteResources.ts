// @ts-nocheck
import { useStore } from "@store";
import { getNuxtData } from "@utils/getNuxtData";
import { trpc } from "@utils/trpc";
import { useCallback } from "react";

/**
 * TODO: There is a type issue with the selector function, waiting for trpc@10 and react-query@4 to resolve
 * use none inifinite query for now
 * @see https://github.com/TanStack/query/issues/3065
 * @returns
 */
export const useInfiniteResources = () => {
	const searchTerm = useStore(s => s.searchTerm);
	return trpc.useInfiniteQuery(["resources.resources", { searchTerm }], {
		enabled: false,
		select: useCallback(data => {
			const { pages, pageParams } = data;
			return {
				pageParams,
				pages: pages.map(page => getNuxtData(page.rawString)),
			};
		}, []),
		getNextPageParam: (_lastPage, _allPages) => {
			// console.log("lastPage", lastPage, "allPages", allPages);
			// return lastPage.nextCursor;
			return 1;
		},
		getPreviousPageParam: (_lastPage, _allPages) => undefined,
	});
};
