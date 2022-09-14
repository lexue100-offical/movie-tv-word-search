import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TbFilter } from "react-icons/tb";
import { FilterItem, type FilterItemProps } from "./FilterItem";

const FILTER_ITEMS: FilterItemProps[] = [
	{
		selectorName: "isShow",
		title: "不显示Show(电视剧)",
	},
	{
		selectorName: "isMovie",
		title: "不显示Movie(电影)",
	},
	{
		selectorName: "isMusic",
		title: "不显示Music(音乐)",
	},
	{
		selectorName: "isMeme",
		title: "不显示Meme(梗图)",
	},
];

export const Filters = () => {
	return (
		<Menu as="div" className="relative bg-slate-100 z-10">
			{({ open }) => (
				<>
					<Menu.Button className="btn btn-info text-info-content disabled:btn-disabled">
						增加过滤条件
						<TbFilter className="ml-1 h-4 w-4" />
					</Menu.Button>
					<Transition
						show={open}
						as={Fragment}
						enter="transition duration-100 ease-out"
						enterFrom="scale-95 opacity-0"
						enterTo="scale-100 opacity-100"
						leave="transition duration-750 ease-out"
						leaveFrom="scale-100 opacity-100"
						leaveTo="scale-95 opacity-0"
					>
						<Menu.Items
							as="ul"
							className="absolute menu menu-compact lg:menu-normal bg-base-100 p-2 rounded-box shadow w-max"
						>
							{FILTER_ITEMS.map(item => (
								<FilterItem
									key={item.selectorName}
									{...item}
									className="flex ui-active:bg-sky-400"
								/>
							))}
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};
