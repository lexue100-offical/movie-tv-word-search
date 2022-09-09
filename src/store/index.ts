import create from "zustand";
import { devtools } from "zustand/middleware";
import type { Clip } from "../types/nuxt-data";

type Store = {
	searchTerm: string;
	setSearchTerm: (input: string) => void;
	selectedClips: Clip[];
	addClip: (clip: Clip) => void;
	removeClip: (uuid: string) => void;
};

export const useStore = create<Store>()(
	devtools((set, get) => ({
		searchTerm: "",
		setSearchTerm: (input: string) =>
			set(() => ({
				searchTerm: input,
			})),
		selectedClips: [],
		addClip: (clip: Clip) =>
			set(({ selectedClips }) => ({
				selectedClips: [...selectedClips, clip],
			})),
		removeClip: (uuid: string) =>
			set(({ selectedClips }) => ({
				selectedClips: selectedClips.filter(clip => clip.uuid !== uuid),
			})),
	}))
);
