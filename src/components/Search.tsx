import { type FormEventHandler, useState } from "react";
import { useStore } from "@store";
import { useResources } from "../requests";
import { Combobox } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { Loader } from "./Loader";

export const Search = () => {
	const searchTerm = useStore(s => s.searchTerm);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [selectedHistory, setSelectedHistory] = useState(searchHistory[0]);
	const setSearchTerm = useStore(s => s.setSearchTerm);
	const { refetch, isFetching } = useResources();
	const onSubmit: FormEventHandler = e => {
		console.log(1)
		e.preventDefault();
		setSearchHistory(s =>
			s.includes(searchTerm) ? [...s] : [...s, searchTerm]
		);
		refetch();
	};

	return (
		<form className="flex items-center space-x-2" onSubmit={onSubmit}>
			<div className="relative">
				<Combobox value={selectedHistory} onChange={setSelectedHistory} name="history">
					<Combobox.Input
						type="text"
						disabled={isFetching}
						className="px-2 py-1 input input-primary disabled:input-disabled focus:outline-none"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<Combobox.Button
						disabled={isFetching}
						className="absolute inset-y-0 right-0 flex items-center pr-2"
					>
						<HiChevronDown
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</Combobox.Button>
					<Combobox.Options>
						{searchHistory.map(s => (
							<Combobox.Option key={s} value={s} className="ui-active:bg-blue-100 ui-not-active:bg-slate-100">
								{/* {({ active }) => <span>{s}</span>} */}
								<span className="">
									{s}
								</span>
							</Combobox.Option>
						))}
					</Combobox.Options>
				</Combobox>
			</div>
			<button
				type="submit"
				disabled={isFetching}
				className="flex items-center btn btn-primary disabled:btn-disabled"
			>
				查询单词
				{isFetching && <Loader className="ml-1" />}
			</button>
		</form>
	);
};
