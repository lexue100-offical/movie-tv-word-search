import { Menu } from "@headlessui/react";
import { useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineFilter } from "react-icons/ai";

export const Filters = () => {
	const [showMenuItems, toggleShowMenuItems] = useReducer(s => !s, false);

	return (
		<Menu as="div" className="relative bg-slate-100 z-10">
			<Menu.Button
				className="btn btn-info text-cyan-800 disabled:btn-disabled"
				onClick={toggleShowMenuItems}
			>
				增加过滤条件
				<AiOutlineFilter className="ml-1 h-4 w-4" />
			</Menu.Button>
			<AnimatePresence>
				{showMenuItems && (
					<Menu.Items
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						as={motion.ul}
						className="absolute menu menu-compact lg:menu-normal bg-base-100 w-56 p-2 rounded-box"
						static
					>
						<Menu.Item as="li">
							<span>{"仅显示Meme(梗图)"}</span>
						</Menu.Item>
						<Menu.Item as="li">
							<span>{"仅显示Show(电视剧)"}</span>
						</Menu.Item>
						<Menu.Item as="li">
							<span>{"仅显示Movie(电影)"}</span>
						</Menu.Item>
						<Menu.Item as="li">
							<span>{"仅显示Music(音乐)"}</span>
						</Menu.Item>
					</Menu.Items>
				)}
			</AnimatePresence>
		</Menu>
	);
};
