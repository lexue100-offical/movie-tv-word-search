import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Clip } from "../types/nuxt-data";
import type { Store } from "./util-types";
import { createVideoFilterSlice } from "./VideoFilterSlice";

export const useStore = create<Store>()(
	devtools(
		persist(
			(set, ...args) => ({
				searchTerm: "",
				setSearchTerm: (input: string) =>
					set(() => ({
						searchTerm: input,
					})),
				pageNum: 0,
				setPageNum: updater =>
					set(({ pageNum }) => {
						if (typeof updater === "function") {
							return { pageNum: updater(pageNum) };
						}
						return { pageNum: updater };
					}),
				videoClass: undefined,
				setVideoClass: info => set(() => ({ videoClass: info })),
				selectedClips: [],
				addClip: (clip: Clip) =>
					set(({ selectedClips }) => ({
						selectedClips: [...selectedClips, clip],
					})),
				removeClip: (uuid: string) =>
					set(({ selectedClips }) => ({
						selectedClips: selectedClips.filter(
							clip => clip.uuid !== uuid
						),
					})),
				...createVideoFilterSlice(set, ...args),
			}),
			{
				name: "search-setting",
				partialize: ({ videoFilters }) => ({ videoFilters }),
			}
		)
	)
);

export * from "./util-types";
export type { VideoSlice, VideoFilter } from "./VideoFilterSlice";
