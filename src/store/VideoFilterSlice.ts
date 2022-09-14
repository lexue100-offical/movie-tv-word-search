import { SliceCreator } from "./util-types";

export type VideoFilter = "isMeme" | "isMovie" | "isShow" | "isMusic";

export type VideoSlice = {
	videoFilters: VideoFilter[];
	addVideoFilter: (filter: VideoFilter) => void;
	removeVideoFilter: (filter: VideoFilter) => void;
};

export const createVideoFilterSlice: SliceCreator<VideoSlice> = set => ({
	videoFilters: [],
	addVideoFilter: (filter: VideoFilter) =>
		set(({ videoFilters }) => ({
			videoFilters: [...videoFilters, filter],
		})),
	removeVideoFilter: (filter: VideoFilter) =>
		set(({ videoFilters }) => ({
			videoFilters: videoFilters.filter(v => v !== filter),
		})),
});
