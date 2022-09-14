import type { StateCreator } from "zustand";
import type { Clip } from "../types/nuxt-data";
import type { ClassInfo } from "../server/service/get-video-class";
import type { VideoSlice } from "./VideoFilterSlice";

export type Store = {
	searchTerm: string;
	setSearchTerm: (input: string) => void;
	pageNum: number;
	setPageNum: (
		updater: ((previousPageNum: number) => number) | number
	) => void;
	videoClass: ClassInfo | undefined;
	setVideoClass: (info: ClassInfo) => void;
	selectedClips: Clip[];
	addClip: (clip: Clip) => void;
	removeClip: (uuid: string) => void;
} & VideoSlice;

export type SliceCreator<T> = StateCreator<
	Store,
	[["zustand/devtools", unknown], ["zustand/persist", unknown]],
	[],
	T
>;
