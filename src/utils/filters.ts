import type { Clip } from "../types/nuxt-data";
import type { VideoFilter } from "@store";

const FilterMap = {
	isMeme: (c: Clip) => !c.isMeme,
	isMusic: (c: Clip) => !c.isMusic,
	isMovie: (c: Clip) => !c.isMovie,
	isShow: (c: Clip) => !c.isShow,
};

export const filterVideos = (
	clips: Clip[] | undefined,
	filters: VideoFilter[]
) => {
	if (!clips) return;
	const filterFunctions = filters.map(f => FilterMap[f]);
	console.log(filterFunctions);
	let filtered = clips;
	for (const filterFunction of filterFunctions) {
		filtered = filtered.filter(filterFunction);
	}
	return filtered;
};
