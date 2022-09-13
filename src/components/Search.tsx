import { type FormEventHandler, useState, Fragment } from "react";
import { useStore } from "@store";
import { useResources } from "../requests";
import { Combobox, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { Loader } from "./Loader";
import { trpc } from "@utils/trpc";

export const Search = () => {
	const searchTerm = useStore(s => s.searchTerm);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const setSearchTerm = useStore(s => s.setSearchTerm);
	const inputEmpty = !!searchTerm;
	const { refetch, isFetching } = useResources();
	const { queryClient } = trpc.useContext();
	const onSubmit: FormEventHandler = e => {
		e.preventDefault();
		const cache = queryClient.getQueryCache();
		console.log(cache);
		setSearchHistory(s =>
			s.includes(searchTerm) ? [...s] : [...s, searchTerm]
		);
		refetch();
	};
	const filteredHistory = searchHistory.filter(h => h.includes(searchTerm));

	return (
		<form
			action="history"
			className="flex items-center space-x-2"
			onSubmit={onSubmit}
		>
			<div className="relative">
				<Combobox defaultValue={searchHistory[0]} name="history">
					{({ open }) => (
						<>
							<Combobox.Input
								type="text"
								autoFocus
								className="px-2 py-1 input input-primary text-lg focus:outline-none focus:shadow-glow"
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
							<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
								<HiChevronDown
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</Combobox.Button>
							<Transition
								as={Fragment}
								show={open && filteredHistory.length > 0}
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<Combobox.Options
									className="absolute rounded-sm p-1 bg-blue-50 w-full z-10 space-y-0.5 shadow"
									static
								>
									{filteredHistory.map(s => (
										<Combobox.Option
											key={s}
											value={s}
											className="ui-active:bg-blue-100 ui-not-active:bg-slate-100 px-1 py-0.5 rounded"
											onClick={() => setSearchTerm(s)}
										>
											{/* {({ active }) => <span>{s}</span>} */}
											<span className="">{s}</span>
										</Combobox.Option>
									))}
								</Combobox.Options>
							</Transition>
						</>
					)}
				</Combobox>
			</div>
			<button
				type="submit"
				disabled={isFetching || !inputEmpty}
				className="flex items-center btn btn-primary disabled:btn-disabled"
			>
				查询单词
				{isFetching && <Loader className="ml-1" />}
			</button>
		</form>
	);
};
