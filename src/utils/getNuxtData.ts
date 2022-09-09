import type { NuxtData } from "../types/nuxt-data";
/**
 * should only run in browser
 */
export function getNuxtData(rawString: string | undefined) {
	if (typeof window === "undefined" || !rawString) return;
	eval(rawString);
	const data = window.__NUXT__ as unknown as NuxtData;
	return data?.data[0]?.clips;
}
