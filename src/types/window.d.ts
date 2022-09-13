import type { NuxtData } from "./nuxt-data";

declare global {
	interface Window {
		__NUXT__: NuxtData;
	}
}
