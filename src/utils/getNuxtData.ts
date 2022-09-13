import type { NuxtData } from "../types/nuxt-data";
import { useStore } from "@store";

const dataMap = new Map<string, NuxtData>();

/**
 * should only run in browser
 */
export function getNuxtData(rawString: string | undefined) {
	if (typeof window === "undefined" || !rawString) return;
	eval(rawString);
	const { searchTerm } = useStore.getState();
	const data = window.__NUXT__ as unknown as NuxtData;
	if (data && searchTerm) {
		dataMap.set(searchTerm, data);
	}
	return { clips: data?.data[0]?.clips, count: data?.data[0]?.hitCount };
}
