import create from "zustand";

type Store =  {
	searchTerm: string
	setSearchTerm: (input: string) => void
}


export const useStore = create<Store>((set, get) => ({
	searchTerm: "",
	setSearchTerm: (input: string) =>
		set(() => ({
			searchTerm: input,
		})),
}));
